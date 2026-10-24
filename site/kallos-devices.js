/* Solid glTF models, public camera controls, and unscaled HTML applications. */
(() => {
 'use strict';
 const stage=document.querySelector('.kd-stage'),viewer=stage?.querySelector('model-viewer'),dialog=document.querySelector('.kd-dialog');
 if(!viewer||!dialog)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),narrow=matchMedia('(max-width:720px)');
 const content=dialog.querySelector('.kd-dialog-content'),title=dialog.querySelector('#kd-dialog-title'),status=document.querySelector('.kd-scene-status');
 const roots=new Map([...document.querySelectorAll('[data-kallos-app]')].map(root=>[root.dataset.kallosApp,{root,home:root.parentElement}]));
 const buttons=[...document.querySelectorAll('[data-kd-enter]')],frames=JSON.parse(document.querySelector('#kd-camera-frames').textContent);
 const rad=Math.PI/180;
 let active=null,trigger=null,returnView=null,serial=0,phase='idle',pointer=null,textures=null,orbitGoal=null,multiTouch=false;
 const touches=new Set();
 const read=()=>{const o=viewer.getCameraOrbit(),t=viewer.getCameraTarget();return{theta:o.theta,phi:o.phi,radius:o.radius,target:[t.x,t.y,t.z],fov:viewer.getFieldOfView()};};
 const apply=v=>{viewer.cameraTarget=v.target.map(n=>n+'m').join(' ');viewer.cameraOrbit=`${v.theta}rad ${v.phi}rad ${v.radius}m`;viewer.fieldOfView=v.fov+'deg';};
 const home=()=>narrow.matches?{theta:-12*rad,phi:83*rad,radius:6.5,target:frames.member.center,fov:32}:{theta:18*rad,phi:69*rad,radius:7.9,target:[-.25,1.35,0],fov:32};
 const closeView=role=>{const f=frames[role],aspect=stage.clientWidth/stage.clientHeight;return{theta:Math.atan2(f.normal[0],f.normal[2]),phi:Math.acos(f.normal[1]),radius:Math.max(f.height,f.width/Math.max(.3,aspect))/(2*Math.tan(16*rad))*1.12,target:f.center,fov:32};};
 const announce=text=>{status.textContent=text;};
 const restoreFocus=()=>{if(!trigger)return;trigger.focus({preventScroll:true});const r=trigger.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)trigger.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'nearest'});};
 const setPhase=value=>{phase=value;stage.dataset.phase=value;buttons.forEach(b=>{b.disabled=value!=='idle';});};
 function fly(to,duration=1100){
  const id=++serial;
  orbitGoal=null;
  if(!viewer.loaded)return Promise.resolve(true);
  if(reduced.matches){apply(to);viewer.jumpCameraToGoal();return Promise.resolve(true);}
  const from=read(),delta=((to.theta-from.theta+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
  viewer.cameraControls=false;viewer.interpolationDecay=0;
  return new Promise(resolve=>{
   const start=performance.now();
   const tick=now=>{
    if(id!==serial){resolve(false);return;}
    const p=Math.min(1,(now-start)/duration),e=p*p*p*(p*(p*6-15)+10),mix=(a,b)=>a+(b-a)*e;
    apply({theta:from.theta+delta*e,phi:mix(from.phi,to.phi),radius:mix(from.radius,to.radius),target:from.target.map((n,i)=>mix(n,to.target[i])),fov:mix(from.fov,to.fov)});
    if(p<1)requestAnimationFrame(tick);
    else{viewer.interpolationDecay=reduced.matches?0:110;viewer.cameraControls=true;resolve(true);}
   };requestAnimationFrame(tick);
  });
 }
 async function centerStage(){
  const r=stage.getBoundingClientRect();if(r.top>=0&&r.bottom<=innerHeight)return;
  stage.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});if(reduced.matches)return;
  await new Promise(resolve=>{const start=performance.now();let last=Infinity,stable=0;const check=now=>{const y=stage.getBoundingClientRect().top;stable=Math.abs(y-last)<.5?stable+1:0;last=y;if((stable>3&&now-start>120)||now-start>650)resolve();else requestAnimationFrame(check);};requestAnimationFrame(check);});
 }
 async function enter(role,button){
  if(phase!=='idle'||dialog.open)return;active=roots.get(role);if(!active)return;
  trigger=button;returnView=viewer.loaded?read():home();setPhase('entering');announce(role==='staff'?'Moving into the staff workspace…':'Moving into the member experience…');await centerStage();
  if(phase!=='entering')return;if(viewer.loaded&&!await fly(closeView(role)))return;if(phase!=='entering')return;
  viewer.focus({preventScroll:true});active.root.inert=false;content.append(active.root);dialog.dataset.device=role;title.textContent=role==='staff'?'Staff workspace':'Member experience';dialog.showModal();dialog.querySelector('.kd-close').focus();setPhase('using');announce('Close the demo to return to the 3D models.');
  if(!reduced.matches)content.animate([{opacity:0},{opacity:1}],{duration:240,easing:'ease-out'});
 }
 async function closeDemo(){
  if(!dialog.open||phase!=='using')return;setPhase('leaving');
  if(!reduced.matches)await content.animate([{opacity:1},{opacity:0}],{duration:180,easing:'ease-in'}).finished.catch(()=>{});
  dialog.close();
 }
 buttons.forEach(button=>button.addEventListener('click',()=>enter(button.dataset.kdEnter,button)));
 viewer.addEventListener('load',async()=>{
  stage.dataset.ready='true';viewer.dataset.ready='true';viewer.interpolationDecay=reduced.matches?0:110;apply(home());viewer.jumpCameraToGoal();announce('3D ready. Drag to rotate all the way around. Scroll or pinch to zoom.');
  try{textures=await window.KallosScreenTextures?.bind(viewer);}catch(error){console.warn('Screen preview unavailable',error);}
 });
 viewer.addEventListener('error',()=>{stage.dataset.error='true';announce('3D preview unavailable. The staff and mobile demos still work from the buttons above.');});
 viewer.addEventListener('camera-change',()=>{if(viewer.loaded){const o=viewer.getCameraOrbit();viewer.dataset.orbit=[o.theta,o.phi,o.radius].map(n=>n.toFixed(4)).join(' ');}});
 viewer.addEventListener('pointerdown',e=>{orbitGoal=null;if(e.pointerType==='touch'){touches.add(e.pointerId);if(touches.size>1){multiTouch=true;pointer=null;return;}}pointer={x:e.clientX,y:e.clientY,time:performance.now()};});
 viewer.addEventListener('keydown',()=>{orbitGoal=null;});
 viewer.addEventListener('wheel',()=>{orbitGoal=null;},{passive:true});
 viewer.addEventListener('pointerup',e=>{
  if(e.pointerType==='touch'){touches.delete(e.pointerId);if(multiTouch){if(!touches.size)multiTouch=false;pointer=null;return;}}
  if(!pointer||phase!=='idle'||performance.now()-pointer.time>550||Math.hypot(e.clientX-pointer.x,e.clientY-pointer.y)>7)return;pointer=null;
  const name=viewer.materialFromPoint?.(e.clientX,e.clientY)?.name,role=name==='LaptopScreen'?'staff':name==='PhoneScreen'?'member':null;
  if(role)enter(role,document.querySelector(`[data-kd-enter="${role}"]`));
 });
 viewer.addEventListener('pointercancel',e=>{touches.delete(e.pointerId);if(!touches.size)multiTouch=false;pointer=null;});
 document.querySelectorAll('[data-kd-rotate]').forEach(button=>button.addEventListener('click',()=>{
  if(!viewer.loaded||phase!=='idle')return;
  if(button.dataset.kdRotate==='reset'){fly(home(),900);announce('Returning to the starting view.');return;}
  serial++;viewer.cameraControls=true;
  const v=orbitGoal||read(),change=button.dataset.kdRotate;
  if(change==='up'||change==='down')v.phi=Math.max(20*rad,Math.min(130*rad,v.phi+(change==='up'?-14:14)*rad));else v.theta+=Number(change)*rad;
  orbitGoal=v;viewer.interpolationDecay=reduced.matches?0:110;apply(v);if(reduced.matches)viewer.jumpCameraToGoal();
 }));
 dialog.querySelector('.kd-close').addEventListener('click',closeDemo);
 dialog.addEventListener('cancel',e=>{e.preventDefault();closeDemo();});
 dialog.addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const controls=[...dialog.querySelectorAll('button:not(:disabled),select:not(:disabled),a[href],input:not(:disabled),[tabindex="0"]')].filter(el=>el.getClientRects().length&&!el.closest('[inert]')&&getComputedStyle(el).visibility!=='hidden'),first=controls[0],last=controls[controls.length-1];if(!first)return;
  if(e.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){e.preventDefault();first.focus();}
 });
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDemo();}});
 dialog.addEventListener('close',async()=>{
  content.getAnimations().forEach(a=>a.cancel());if(active){active.root.inert=true;active.home.append(active.root);active=null;}textures?.update();setPhase('returning');await fly(returnView||home(),1000);setPhase('idle');announce('Drag to rotate. Click either screen to use its demo.');restoreFocus();
 });
 addEventListener('keydown',e=>{if(e.key==='Escape'&&phase==='entering'){serial++;setPhase('idle');active=null;viewer.cameraControls=true;viewer.interpolationDecay=110;apply(returnView||home());announce('Camera move cancelled.');restoreFocus();}});
 dialog.querySelector('[data-kd-reset]').addEventListener('click',()=>window.KallosDemo?.reset());
 reduced.addEventListener('change',()=>{viewer.interpolationDecay=reduced.matches?0:110;});
 narrow.addEventListener('change',()=>{if(viewer.loaded&&phase==='idle'){apply(home());viewer.jumpCameraToGoal();}});
})();
