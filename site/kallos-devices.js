/* The working HTML app stays on the physical display of the original glTF model. */
(() => {
 'use strict';
 const stage=document.querySelector('.kd-stage'),viewer=stage?.querySelector('model-viewer');
 let surface=document.querySelector('.kd-live-surface');
 if(!stage||!viewer||!surface)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),narrow=matchMedia('(max-width:720px)');
 const toolbar=document.querySelector('.kd-use-controls'),title=document.querySelector('#kd-use-title'),status=document.querySelector('.kd-scene-status');
 const roots=new Map([...document.querySelectorAll('[data-kallos-app]')].map(root=>[root.dataset.kallosApp,{root,surface:root.closest('.kd-live-surface')}]));
 const buttons=[...document.querySelectorAll('[data-kd-enter]')],frames=JSON.parse(document.querySelector('#kd-camera-frames').textContent);
 const projections=new Map([...roots].map(([which,item])=>[which,window.KallosScreenProjection.create(viewer,item.surface,{[which]:frames[which]})]));
 const projection={use:which=>projections.get(which).use(which),update:()=>role&&projections.get(role).update(),hide:()=>role&&projections.get(role).hide()};
 const rad=Math.PI/180,touches=new Set();
 let active=null,role=null,trigger=null,returnView=null,serial=0,phase='idle',pointer=null,textures=null,multiTouch=false;
 const nextFrame=()=>new Promise(requestAnimationFrame);
 const read=()=>{const o=viewer.getCameraOrbit(),t=viewer.getCameraTarget();return{theta:o.theta,phi:o.phi,radius:o.radius,target:[t.x,t.y,t.z],fov:parseFloat(viewer.fieldOfView)||32};};
 const apply=v=>{viewer.cameraTarget=v.target.map(n=>n+'m').join(' ');viewer.cameraOrbit=`${v.theta}rad ${v.phi}rad ${v.radius}m`;viewer.fieldOfView=v.fov+'deg';};
 const home=()=>narrow.matches?{theta:-12*rad,phi:83*rad,radius:6.5,target:frames.member.center,fov:32}:{theta:18*rad,phi:69*rad,radius:7.9,target:[-.25,1.35,0],fov:32};
 const expandedHeight=()=>Math.min(920,Math.max(640,innerHeight-36));
 function closeView(which){
  const f=frames[which],h=stage.clientHeight,w=stage.clientWidth,top=Math.max(86,toolbar.offsetHeight+32),bottom=20;
  const screenHeight=Math.min((h-top-bottom)*.94,(w-(narrow.matches?32:64))*(which==='staff'?.90:.92)*f.height/f.width);
  // model-viewer adjusts the effective lens for its scene aspect ratio.
  const rawFov=parseFloat(viewer.fieldOfView)||32,actualFov=viewer.getFieldOfView?.()||32;
  const tangent=Math.tan(16*rad)*Math.tan(actualFov*rad/2)/Math.tan(rawFov*rad/2);
  const radius=f.height*h/(2*tangent*screenHeight),offset=((top+h-bottom)/2-h/2)*2*radius*tangent/h;
  return{theta:Math.atan2(f.normal[0],f.normal[2]),phi:Math.acos(f.normal[1]),radius,target:f.center.map((n,i)=>n+f.up[i]*offset),fov:32};
 }
 const announce=text=>{status.textContent=text;};
 const restoreFocus=()=>{if(!trigger)return;trigger.focus({preventScroll:true});const r=trigger.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)trigger.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'nearest'});};
 function setPhase(value){
  phase=value;stage.dataset.phase=value;stage.setAttribute('aria-busy',String(!['idle','using'].includes(value)));
  buttons.forEach(b=>{b.disabled=value!=='idle';b.setAttribute('aria-expanded',String(value==='using'&&b.dataset.kdEnter===role));});
  toolbar.hidden=value==='idle';
  toolbar.querySelector('[data-kd-reset]').disabled=value!=='using';toolbar.querySelector('[data-kd-back]').disabled=['leaving','returning'].includes(value);
  viewer.inert=value!=='idle';viewer.tabIndex=value==='idle'?0:-1;viewer.cameraControls=value==='idle';
 }
 function fly(destination,duration=1100,onProgress){
  const id=++serial;
  const to=()=>typeof destination==='function'?destination():destination;
  if(!viewer.loaded)return Promise.resolve(true);
  if(reduced.matches){apply(to());viewer.jumpCameraToGoal();onProgress?.(1);return Promise.resolve(true);}
  const from=read();viewer.cameraControls=false;viewer.interpolationDecay=0;
  return new Promise(resolve=>{
   const start=performance.now();
   const tick=now=>{
    if(id!==serial){resolve(false);return;}
    const goal=to(),delta=((goal.theta-from.theta+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
    const p=Math.min(1,(now-start)/duration),e=p*p*p*(p*(p*6-15)+10),mix=(a,b)=>a+(b-a)*e;
    apply({theta:from.theta+delta*e,phi:mix(from.phi,goal.phi),radius:mix(from.radius,goal.radius),target:from.target.map((n,i)=>mix(n,goal.target[i])),fov:mix(from.fov,goal.fov)});onProgress?.(p);
    if(p<1)requestAnimationFrame(tick);else{viewer.interpolationDecay=reduced.matches?0:110;viewer.cameraControls=phase==='idle';resolve(true);}
   };requestAnimationFrame(tick);
  });
 }
 async function centerStage(){
  const top=stage.getBoundingClientRect().top+scrollY-Math.max(12,(innerHeight-expandedHeight())/2);
  scrollTo({top,behavior:reduced.matches?'instant':'smooth'});if(reduced.matches)return;
  await new Promise(resolve=>{const start=performance.now();let last=Infinity,lastHeight=0,stable=0;const check=now=>{const r=stage.getBoundingClientRect();stable=Math.abs(r.top-last)<.5&&Math.abs(r.height-lastHeight)<.5?stable+1:0;last=r.top;lastHeight=r.height;if((stable>3&&now-start>180)||now-start>850)resolve();else requestAnimationFrame(check);};requestAnimationFrame(check);});
 }
 function flatFallback(){
  const f=frames[role],h=stage.clientHeight,w=stage.clientWidth,top=Math.max(86,toolbar.offsetHeight+32),maxHeight=h-top-20,maxWidth=w-48;
  const width=Math.min(maxWidth,maxHeight*f.width/f.height),height=width*f.height/f.width;
  surface.classList.add('kd-flat-fallback');surface.style.width=width+'px';surface.style.height=height+'px';surface.style.borderRadius=(f.radius/f.width*100)+'% / '+(f.radius/f.height*100)+'%';
  surface.style.transform=`translate(${(w-width)/2}px,${top+(maxHeight-height)/2}px)`;surface.style.visibility='visible';surface.style.pointerEvents='';
 }
 async function enter(which,button){
  if(phase!=='idle')return;active=roots.get(which);if(!active)return;
  role=which;surface=active.surface;trigger=button;returnView=viewer.loaded?read():home();title.textContent=role==='staff'?'Staff workspace':'Member experience';
  setPhase('entering');stage.style.height=expandedHeight()+'px';surface.dataset.device=role;surface.hidden=false;surface.inert=true;surface.classList.remove('is-visible','kd-flat-fallback');
  active.root.inert=true;if(viewer.loaded)projection.use(role);
  announce('Moving into the '+(role==='staff'?'laptop':'phone')+' display…');await centerStage();if(phase!=='entering')return;
  if(viewer.loaded){
   if(!await fly(()=>closeView(role),1100,p=>{projection.update();if(p>.86)surface.classList.add('is-visible');}))return;
   await nextFrame();await nextFrame();projection.update();
  }else flatFallback();
  if(phase!=='entering')return;
  surface.classList.add('is-visible');surface.inert=false;active.root.inert=false;setPhase('using');
  const viewport=active.root.querySelector('.kd-render');viewport.tabIndex=0;viewport.setAttribute('role','group');viewport.setAttribute('aria-label','Scrollable '+(role==='staff'?'staff':'member')+' app content');viewport.focus({preventScroll:true});
  announce('Use the app inside the device. Return to 3D or press Escape when finished.');
 }
 async function exit(){
  if(['idle','leaving','returning'].includes(phase))return;
  serial++;setPhase('leaving');surface.inert=true;if(active)active.root.inert=true;
  const opacity=getComputedStyle(surface).opacity;surface.classList.remove('is-visible');
  if(!reduced.matches&&!surface.hidden)await surface.animate([{opacity},{opacity:0}],{duration:180,easing:'ease-in'}).finished.catch(()=>{});
  surface.hidden=true;projection.hide();if(active){active=null;}textures?.update();setPhase('returning');
  await fly(returnView||home(),1000);role=null;stage.style.removeProperty('height');setPhase('idle');announce('Drag to rotate. Click either screen to use its demo.');restoreFocus();
 }
 document.addEventListener('kallos:escape',()=>{if(phase==='using')exit();});
 buttons.forEach(button=>button.addEventListener('click',()=>enter(button.dataset.kdEnter,button)));
 setPhase('idle');
 toolbar.querySelector('[data-kd-back]').addEventListener('click',exit);
 toolbar.querySelector('[data-kd-reset]').addEventListener('click',()=>window.KallosDemo?.reset());
 addEventListener('keydown',e=>{if(e.key!=='Escape'||e.defaultPrevented||e.target.closest?.('select')||document.querySelector('dialog[open]'))return;if(phase==='entering'||(phase==='using'&&stage.contains(document.activeElement))){e.preventDefault();exit();}});
 viewer.addEventListener('load',async()=>{
  stage.dataset.ready='true';viewer.dataset.ready='true';viewer.interpolationDecay=reduced.matches?0:110;
  apply(active?closeView(role):home());viewer.jumpCameraToGoal();viewer.cameraControls=phase==='idle';
  if(active){surface.classList.remove('kd-flat-fallback');projection.use(role);}else announce('3D ready. Drag to rotate. Click a screen to use it.');
  try{textures=await window.KallosScreenTextures?.bind(viewer);}catch(error){console.warn('Screen preview unavailable',error);}
 });
 viewer.addEventListener('error',()=>{stage.dataset.error='true';announce('3D preview unavailable. Enter a demo to use its fixed-size display.');});
 viewer.addEventListener('camera-change',()=>{if(viewer.loaded){const o=viewer.getCameraOrbit();viewer.dataset.orbit=[o.theta,o.phi,o.radius].map(n=>n.toFixed(4)).join(' ');}});
 viewer.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){touches.add(e.pointerId);if(touches.size>1){multiTouch=true;pointer=null;return;}}pointer={x:e.clientX,y:e.clientY,time:performance.now()};});
 viewer.addEventListener('pointerup',e=>{
  if(e.pointerType==='touch'){touches.delete(e.pointerId);if(multiTouch){if(!touches.size)multiTouch=false;pointer=null;return;}}
  if(!pointer||phase!=='idle'||performance.now()-pointer.time>550||Math.hypot(e.clientX-pointer.x,e.clientY-pointer.y)>7)return;pointer=null;
  const name=viewer.materialFromPoint?.(e.clientX,e.clientY)?.name,which=name==='LaptopScreen'?'staff':name==='PhoneScreen'?'member':null;
  if(which)enter(which,document.querySelector(`[data-kd-enter="${which}"]`));
 });
 viewer.addEventListener('pointercancel',e=>{touches.delete(e.pointerId);if(!touches.size)multiTouch=false;pointer=null;});
 let resizePending=0;
 const resize=()=>{if(resizePending)return;resizePending=requestAnimationFrame(()=>{resizePending=0;if(phase==='using'){stage.style.height=expandedHeight()+'px';if(viewer.loaded){apply(closeView(role));viewer.jumpCameraToGoal();projection.update();}else flatFallback();}});};
 let toolbarPending=0;
 const placeToolbar=()=>{if(toolbarPending)return;toolbarPending=requestAnimationFrame(()=>{toolbarPending=0;if(phase==='idle'){toolbar.style.removeProperty('top');return;}const r=stage.getBoundingClientRect();toolbar.style.top=Math.max(16,Math.min(stage.clientHeight-toolbar.offsetHeight-12,12-r.top))+'px';});};
 new ResizeObserver(()=>{resize();placeToolbar();}).observe(stage);addEventListener('resize',resize);addEventListener('scroll',placeToolbar,{passive:true});
 reduced.addEventListener('change',()=>{viewer.interpolationDecay=reduced.matches?0:110;});
 narrow.addEventListener('change',()=>{if(viewer.loaded&&phase==='idle'){apply(home());viewer.jumpCameraToGoal();}});
})();
