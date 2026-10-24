/* Idle glTF displays use captures of the same source-built sample frontend. */
(() => {
 'use strict';
 const assets=new URL('assets/kallos-app/previews/',document.currentScript.src),bindings=new WeakMap();
 const load=role=>new Promise((resolve,reject)=>{const image=new Image();image.decoding='async';image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('App screen preview unavailable: '+role));image.src=new URL(role+'.webp',assets).href;});
 async function bind(viewer){
  if(bindings.has(viewer))return bindings.get(viewer);
  const pending=(async()=>{
   viewer.dataset.screensReady='false';
   if(!viewer.model||typeof viewer.createCanvasTexture!=='function')throw new Error('Load devices before their screen previews.');
   const specs=[{role:'staff',material:'LaptopScreen',width:1600,height:1000},{role:'member',material:'PhoneScreen',width:600,height:1280}];
   const images=await Promise.all(specs.map(s=>load(s.role))),screens=[];
   for(let i=0;i<specs.length;i++){
    const spec=specs[i],material=viewer.model.getMaterialByName(spec.material);
    if(!material)throw new Error('Missing physical screen: '+spec.material);
    const texture=await viewer.createCanvasTexture(),canvas=texture.source.element;
    canvas.width=spec.width;canvas.height=spec.height;
    const context=canvas.getContext('2d');context.drawImage(images[i],0,0,spec.width,spec.height);
    await material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
    texture.sampler.setScale({u:1,v:-1});texture.sampler.setOffset({u:0,v:1});texture.source.update();
    screens.push({texture});
   }
   const metadata={source:'Actual Kallos frontend captures',sampleDataOnly:true,staticIdlePreview:true,uvScale:{u:1,v:-1},uvOffset:{u:0,v:1},screens:specs};
   viewer.dataset.screensReady='true';viewer.dataset.screenTextureMetadata=JSON.stringify(metadata);
   let updates=1,disposed=false;viewer.dataset.screenTextureUpdates='1';
   return Object.freeze({update(){if(!disposed){screens.forEach(s=>s.texture.source.update());viewer.dataset.screenTextureUpdates=String(++updates);}return{updates,...metadata};},get metadata(){return{updates,...metadata};},dispose(){disposed=true;bindings.delete(viewer);viewer.dataset.screensReady='false';}});
  })();
  bindings.set(viewer,pending);try{return await pending;}catch(error){bindings.delete(viewer);throw error;}
 }
 window.KallosScreenTextures=Object.freeze({bind});
})();
