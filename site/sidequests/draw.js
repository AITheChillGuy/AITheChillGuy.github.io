export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const random=(a,b)=>a+Math.random()*(b-a);
export function rr(c,x,y,w,h,r=8,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
export function line(c,pts,color,width=1){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
export function circle(c,x,y,r,fill,stroke){c.beginPath();c.arc(x,y,r,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
export function text(c,str,x,y,size=16,color='#fff',align='left',font='Manrope,sans-serif'){c.font=`500 ${size}px ${font}`;c.fillStyle=color;c.textAlign=align;c.textBaseline='middle';c.fillText(str,x,y);}
export function glow(c,x,y,r,color){let g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');circle(c,x,y,r,g);}
export function person(c,x,y,r,color,angle=0){c.save();c.translate(x,y);c.rotate(angle);c.fillStyle=color;rr(c,-r*.7,-r*.2,r*1.4,r*1.6,r*.35,color);circle(c,0,-r*.48,r*.48,color);c.restore();}
export function diamond(c,x,y,r,color,angle=0){c.save();c.translate(x,y);c.rotate(angle+Math.PI/4);rr(c,-r/2,-r/2,r,r,1,color);c.restore();}
export function glyph(c,id,x,y,r,color='#fff'){c.save();c.translate(x,y);c.strokeStyle=color;c.lineWidth=2;c.beginPath();if(id===0){c.moveTo(0,-r);c.lineTo(r,r*.7);c.lineTo(-r,r*.7);c.closePath();}else if(id===1){c.rect(-r*.7,-r*.7,r*1.4,r*1.4);c.moveTo(-r,-r);c.lineTo(r,r);}else if(id===2){c.arc(0,0,r,0,Math.PI*2);c.moveTo(0,-r);c.lineTo(0,r);}else{for(let i=0;i<6;i++){let a=i*Math.PI/3;i?c.lineTo(Math.cos(a)*r,Math.sin(a)*r):c.moveTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();}c.stroke();c.restore();}
export function cover(c,img,w,h,alpha=1){if(!img?.complete||!img.naturalWidth)return false;const s=Math.max(w/img.naturalWidth,h/img.naturalHeight);c.save();c.globalAlpha=alpha;c.drawImage(img,(w-img.naturalWidth*s)/2,(h-img.naturalHeight*s)/2,img.naturalWidth*s,img.naturalHeight*s);c.restore();return true;}
export function particleSystem(){const items=[];return {burst(x,y,color,n=18,speed=100){for(let i=0;i<n;i++){let a=random(0,Math.PI*2),v=random(speed*.2,speed);items.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:random(.3,.8),max:.8,color,r:random(1,4)});}},update(dt){for(let i=items.length-1;i>=0;i--){let p=items[i];p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=65*dt;if(p.life<=0)items.splice(i,1);}},draw(c){for(const p of items){c.globalAlpha=clamp(p.life/p.max,0,1);circle(c,p.x,p.y,p.r,p.color);}c.globalAlpha=1;},get size(){return items.length;}};}
export function segmentRect(a,b,r){let t0=0,t1=1,dx=b.x-a.x,dy=b.y-a.y;for(const [p,q] of [[-dx,a.x-r.x],[dx,r.x+r.w-a.x],[-dy,a.y-r.y],[dy,r.y+r.h-a.y]]){if(p===0){if(q<0)return false;continue;}const t=q/p;if(p<0)t0=Math.max(t0,t);else t1=Math.min(t1,t);if(t0>t1)return false;}return true;}
export function seeded(seed=42){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
