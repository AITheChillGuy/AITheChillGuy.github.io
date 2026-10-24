/* Portfolio-only device presentation. No live service connections. */
(() => {
 'use strict';
 const stage=document.querySelector('.kd-stage');
 const dialog=document.querySelector('.kd-dialog');
 if(!stage||!dialog)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const narrow=matchMedia('(max-width:720px)');
 const content=dialog.querySelector('.kd-dialog-content');
 const title=dialog.querySelector('#kd-dialog-title');
 const roots=new Map([...document.querySelectorAll('[data-kallos-app]')].map(root=>[root.dataset.kallosApp,{root,home:root.parentElement}]));
 let trigger=null,active=null,drag=null,yaw=0,pitch=0;
 const rotate=()=>{stage.style.setProperty('--kd-yaw',yaw+'deg');stage.style.setProperty('--kd-pitch',pitch+'deg');};
 document.querySelectorAll('[data-kd-rotate]').forEach(button=>button.addEventListener('click',()=>{
  yaw=button.dataset.kdRotate==='reset'?0:Math.max(-15,Math.min(15,yaw+Number(button.dataset.kdRotate)));
  pitch=0;rotate();
 }));
 stage.addEventListener('pointerdown',event=>{
  if(narrow.matches||reduced.matches||event.pointerType==='touch'||event.button!==0||event.target.closest('button'))return;
  drag={x:event.clientX,y:event.clientY,yaw,pitch};stage.setPointerCapture(event.pointerId);stage.classList.add('is-dragging');
 });
 stage.addEventListener('pointermove',event=>{
  if(!drag)return;
  yaw=Math.max(-15,Math.min(15,drag.yaw+(event.clientX-drag.x)/18));
  pitch=Math.max(-6,Math.min(6,drag.pitch-(event.clientY-drag.y)/35));rotate();
 });
 const endDrag=()=>{drag=null;stage.classList.remove('is-dragging');};
 stage.addEventListener('pointerup',endDrag);stage.addEventListener('pointercancel',endDrag);stage.addEventListener('lostpointercapture',endDrag);
 document.querySelectorAll('[data-kd-enter]').forEach(button=>button.addEventListener('click',()=>{
  if(dialog.open)return;
  active=roots.get(button.dataset.kdEnter);if(!active)return;
  trigger=button;
  const from=active.home.getBoundingClientRect();
  active.root.inert=false;content.append(active.root);
  dialog.dataset.device=button.dataset.kdEnter;
  title.textContent=button.dataset.kdEnter==='staff'?'Staff workspace':'Member experience';
  dialog.showModal();
  dialog.querySelector('.kd-close').focus();
  if(!reduced.matches&&!narrow.matches&&content.animate){
   const to=content.getBoundingClientRect();
   const scale=Math.max(.4,Math.min(.85,from.width/to.width));
   content.animate([
    {transform:`translate(${(from.x+from.width/2)-(to.x+to.width/2)}px,${Math.max(-220,Math.min(220,(from.y+from.height/2)-(to.y+to.height/2)))}px) scale(${scale})`,opacity:.4},
    {transform:'translate(0,0) scale(1)',opacity:1}
   ],{duration:440,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
 }));
 dialog.querySelector('.kd-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const controls=[...dialog.querySelectorAll('button:not(:disabled),select:not(:disabled),a[href],input:not(:disabled),[tabindex="0"]')].filter(el=>el.getClientRects().length&&!el.closest('[inert]')&&getComputedStyle(el).visibility!=='hidden');
  const first=controls[0],last=controls[controls.length-1];
  if(!first)return;
  if(event.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){event.preventDefault();first.focus();}
 });
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{
  content.getAnimations().forEach(animation=>animation.cancel());
  if(active){active.root.inert=true;active.home.append(active.root);active=null;}
  trigger?.focus();
 });
 dialog.querySelector('[data-kd-reset]').addEventListener('click',()=>{window.KallosDemo?.reset();});
})();
