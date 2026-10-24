/* Captured application screens. No connections to either product service. */
(() => {
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.querySelectorAll('[data-evidence]').forEach(viewer=>{
  const tabs=[...viewer.querySelectorAll('[role=tab]')];
  const panels=[...viewer.querySelectorAll('[role=tabpanel]')];
  const select=tab=>{
   tabs.forEach(t=>{const on=t===tab;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;});
   panels.forEach(p=>{p.hidden=p.id!==tab.getAttribute('aria-controls');});
   const panel=panels.find(p=>!p.hidden);
   if(!reduced&&panel?.animate)panel.animate([{opacity:.35},{opacity:1}],{duration:220,easing:'ease-out'});
  };
  tabs.forEach((tab,i)=>{
   tab.addEventListener('click',()=>select(tab));
   tab.addEventListener('keydown',e=>{
    let n;
    if(e.key==='ArrowRight')n=(i+1)%tabs.length;
    if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;
    if(e.key==='Home')n=0;
    if(e.key==='End')n=tabs.length-1;
    if(n!==undefined){e.preventDefault();select(tabs[n]);tabs[n].focus();}
   });
  });
 });
 const dialog=document.createElement('dialog');dialog.className='evidence-lightbox';dialog.setAttribute('aria-label','Full-size application screen');
 const close=document.createElement('button');close.type='button';close.className='evidence-close';close.textContent='Close image ×';
 const image=document.createElement('img');dialog.append(close);document.body.append(dialog);
 let trigger=null;
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{trigger?.focus();image.remove();image.removeAttribute('src');});
 document.querySelectorAll('[data-enlarge]').forEach(button=>button.addEventListener('click',()=>{
  const source=button.closest('figure').querySelector('img');trigger=button;image.src=source.currentSrc||source.src;image.alt=source.alt;image.classList.toggle('is-tall',source.naturalHeight>source.naturalWidth);dialog.append(image);dialog.showModal();close.focus();
 }));
})();
