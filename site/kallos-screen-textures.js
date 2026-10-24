/* High-resolution source captures are embedded in the glTF; avoid canvas resampling. */
(() => {
 'use strict';
 const bindings=new WeakMap();
 async function bind(viewer){
  if(bindings.has(viewer))return bindings.get(viewer);
  if(!viewer.model)throw new Error('Load the device model before inspecting its displays.');
  const screens=[{role:'staff',material:'LaptopScreen',width:3360,height:2100},{role:'member',material:'PhoneScreen',width:1170,height:2496}];
  for(const screen of screens)if(!viewer.model.getMaterialByName(screen.material))throw new Error('Missing physical display: '+screen.material);
  const metadata={source:'Actual Kallos frontend · 3× captures',sampleDataOnly:true,staticIdlePreview:true,embedded:true,format:'PNG',minFilter:9987,magFilter:9729,screens};
  viewer.dataset.screensReady='true';viewer.dataset.screenTextureMetadata=JSON.stringify(metadata);viewer.dataset.screenTextureUpdates='1';
  const controller=Object.freeze({update(){return metadata;},get metadata(){return metadata;},dispose(){bindings.delete(viewer);viewer.dataset.screensReady='false';}});
  bindings.set(viewer,controller);return controller;
 }
 window.KallosScreenTextures=Object.freeze({bind});
})();
