/* Shared menu: keyboard focus, Escape, scroll locking, and a usable no-JS fallback. */
(function(){'use strict';
 var toggle=document.querySelector('.nav-toggle'),menu=document.getElementById('navmenu');
 if(!toggle||!menu)return;
 var close=menu.querySelector('.close'),priorFocus=null,blocked=[];
 function focusable(){return Array.prototype.filter.call(menu.querySelectorAll('a[href],button:not([disabled])'),function(el){return el.getClientRects().length>0})}
 function closeMenu(restore){if(menu.hidden)return;menu.hidden=true;menu.inert=true;menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('nav-menu-open');blocked.forEach(function(e){e.el.inert=e.inert});blocked=[];if(restore&&priorFocus)priorFocus.focus();}
 function openMenu(){priorFocus=document.activeElement;menu.hidden=false;menu.inert=false;menu.classList.add('open');toggle.setAttribute('aria-expanded','true');document.body.classList.add('nav-menu-open');Array.prototype.forEach.call(document.body.children,function(el){if(el!==menu&&el.tagName!=='SCRIPT'&&el.tagName!=='LINK'){blocked.push({el:el,inert:el.inert});el.inert=true}});close.focus();}
 toggle.addEventListener('click',function(){if(menu.hidden)openMenu();else closeMenu(true)});close.addEventListener('click',function(){closeMenu(true)});
 menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){closeMenu(false);var hash=new URL(a.href,location.href).hash;var destination=hash&&document.getElementById(hash.slice(1));if(destination){if(!destination.hasAttribute('tabindex'))destination.setAttribute('tabindex','-1');destination.focus({preventScroll:true})}})});
 menu.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();closeMenu(true);return}if(e.key!=='Tab')return;var items=focusable(),first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
 menu.addEventListener('click',function(e){if(e.target===menu)closeMenu(true)});
 var wide=matchMedia('(min-width:901px)');wide.addEventListener('change',function(e){if(e.matches)closeMenu(false)});
})();
