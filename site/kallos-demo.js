/* Isolated Kallos frontend, with bounded loading and recoverable sample frames. */
(() => {
 'use strict';
 const scriptURL=new URL(document.currentScript.src),base=new URL('assets/kallos-app/index.html',scriptURL),version=scriptURL.searchParams.get('v')||'current';
 const frames=new Map(),entries=new Map(),snapshots=new Map();
 let state=null;
 const empty=()=>({lang:'en',date:'Monday 26 October 2026',counts:{sessions:3,booked:27,checked:2,available:15},classes:[]});
 const notify=()=>document.dispatchEvent(new CustomEvent('kallos:demo-change'));
 const send=(frame,payload)=>frame?.contentWindow?.postMessage(payload,location.origin);
 const broadcast=(payload,except)=>{for(const frame of frames.values())if(frame!==except)send(frame,payload);};
 function show(entry,value){
  entry.state=value;entry.root.dataset.frameState=value;entry.frame.inert=value!=='ready';
  entry.frame.style.visibility=value==='ready'?'':'hidden';entry.overlay.hidden=value==='ready';
  entry.message.textContent=value==='failed'?'Couldn’t load the demo.':'Loading…';entry.retry.hidden=value!=='failed';
 }
 function arm(entry){
  clearTimeout(entry.timer);const frame=entry.frame;
  entry.timer=setTimeout(()=>{if(entry.frame===frame&&entry.state!=='ready')show(entry,'failed');},10000);
 }
 function ready(entry){
  clearTimeout(entry.timer);entry.frame.dataset.ready='true';show(entry,'ready');
  if(entry.restoreFocus){entry.restoreFocus=false;entry.viewport.focus({preventScroll:true});}
 }
 function mount(entry){
  clearTimeout(entry.timer);
  const frame=document.createElement('iframe'),url=new URL(base);
  url.searchParams.set('role',entry.role);url.searchParams.set('v',version);
  if(entry.attempt)url.searchParams.set('demo_retry',String(entry.attempt));
  frame.src=url.href;frame.title=`Kallos ${entry.role==='staff'?'staff workspace':'member website'} — interactive sample data`;
  frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-downloads');frame.referrerPolicy='no-referrer';frame.loading='eager';frame.className='kd-frontend';
  frame.addEventListener('error',()=>{if(entry.frame===frame){clearTimeout(entry.timer);show(entry,'failed');}});
  const previous=entry.frame;entry.frame=frame;frames.set(entry.role,frame);
  if(previous)previous.replaceWith(frame);else entry.viewport.prepend(frame);
  show(entry,'loading');arm(entry);
 }
 function retry(entry){entry.attempt++;entry.restoreFocus=document.activeElement===entry.retry;mount(entry);}
 for(const root of document.querySelectorAll('[data-kallos-app]')){
  const viewport=document.createElement('div');viewport.className='kd-render';
  const overlay=document.createElement('div');overlay.className='kd-frame-loader';
  const message=document.createElement('p');message.setAttribute('role','status');message.setAttribute('aria-live','polite');
  const button=document.createElement('button');button.type='button';button.className='kd-frame-retry';button.textContent='Retry';button.hidden=true;
  overlay.append(message,button);viewport.append(overlay);root.replaceChildren(viewport);
  const entry={role:root.dataset.kallosApp,root,viewport,overlay,message,retry:button,frame:null,state:'loading',attempt:0,timer:null,restoreFocus:false};
  entries.set(entry.role,entry);button.addEventListener('click',()=>retry(entry));mount(entry);
 }
 addEventListener('message',event=>{
  if(event.origin!==location.origin||!event.data||typeof event.data!=='object')return;
  const pair=[...frames].find(([,frame])=>frame.contentWindow===event.source);if(!pair)return;
  const [role,frame]=pair,entry=entries.get(role),message=event.data;
  if(message.type==='kallos:ready'){
   // The committed snapshot, not the module-ready signal, reveals the app.
   if(state)send(frame,{type:'kallos:state',state});
  }else if(message.type==='kallos:change'&&message.state&&message.snapshot){
   ready(entry);state=message.state;snapshots.set(role,message.snapshot);broadcast({type:'kallos:state',state},frame);notify();
  }else if(message.type==='kallos:snapshot'&&message.snapshot){
   ready(entry);snapshots.set(role,message.snapshot);notify();
  }else if(message.type==='kallos:escape')document.dispatchEvent(new CustomEvent('kallos:escape'));
 });
 window.KallosDemo=Object.freeze({
  activate(role){const entry=entries.get(role);if(!entry)return;if(entry.state==='failed')retry(entry);else if(entry.state==='loading')arm(entry);},
  reset(){state=null;snapshots.clear();for(const entry of entries.values())if(entry.state==='failed')retry(entry);broadcast({type:'kallos:reset'});},
  snapshot(role){return structuredClone(snapshots.get(role)||empty());}
 });
})();
