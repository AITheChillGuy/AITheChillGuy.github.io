/* Standalone portfolio sample. No production services, authentication or storage. */
(() => {
  'use strict';
  const scriptURL = document.currentScript.src;
  const assets = new URL('assets/products/', scriptURL).href;
  const roots = [...document.querySelectorAll('[data-kallos-app]')];
  const days = Array.from({length: 7}, (_, i) => new Date(Date.UTC(2026, 9, 26 + i, 12)));
  const classes = [
    {id:'skills', en:'Skills', ar:'مهارات', time:'17:00', end:'18:00', capacity:12, booked:7, checked:3, coach:1},
    {id:'sets_reps', en:'Sets and Reps', ar:'مجموعات وتكرارات', time:'18:15', end:'19:15', capacity:16, booked:16, checked:10, coach:2},
    {id:'mobility', en:'Mobility', ar:'إطالة', time:'19:30', end:'20:15', capacity:12, booked:5, checked:2, coach:1}
  ];
  const copy = {
    en: {
      sample:'Sample data', staff:'Staff workspace', member:'Member experience', dashboard:'Dashboard', schedule:'Schedule', bookings:'My bookings',
      title:'Your gym, today.', staffIntro:'The sessions, places, and attendance in one daily view.', memberTitle:'Class schedule', memberIntro:'Find your next session.',
      sessions:'Today’s sessions', booked:'Booked spots', checked:'Checked in', available:'Available places',
      openRoster:'Open roster', back:'Back to dashboard', roster:'Class attendance', rosterIntro:'Fictional members only. Try checking someone in.',
      demoMember:'Demo member', demoCoach:'Demo coach', you:'You · demo member', present:'Checked in', checkin:'Check in', undo:'Undo check-in',
      class:'Class type', allClasses:'All classes', space:'Availability', anySpace:'All sessions', hasSpace:'Has space', clear:'Clear filters', filters:'Filters', hideFilters:'Hide filters',
      date:'Choose a day', upcoming:'Upcoming', full:'Full', book:'Book a place', cancel:'Cancel booking', reserved:'You’re booked',
      left:'places left', noMatch:'No classes match these filters.', noBookings:'Your next session is waiting.', noBookingsBody:'Book a class from the schedule and it will appear here.', browse:'Browse the schedule',
      sampleNote:'Interactive sample · no real bookings', sharedHint:'Try booking on the phone. The staff view updates too.',
      initial:'Explore the sample schedule. All actions stay in this demo.', reset:'Demo reset. Choose a class to start again.',
      bookingDone:'Place booked. Both demo views have updated.', cancelled:'Booking cancelled. The place is available again.',
      attendanceDone:'Attendance updated in the demo.', filterDone:'Schedule filters updated.', dayDone:'Selected day updated.',
      lang:'Language', rosterCount:'booked', duration:'minutes', seats:'Booked places', time:'Time',
      demoDates:'Sample week · 26 Oct – 1 Nov 2026', status:'Demo status', selfChecked:'You’re checked in', total:'total',
    },
    ar: {
      sample:'بيانات تجريبية', staff:'مساحة الموظفين', member:'تجربة العضو', dashboard:'لوحة المتابعة', schedule:'الجدول', bookings:'حجوزاتي',
      title:'ناديك اليوم.', staffIntro:'الحصص والأماكن والحضور في نظرة يومية واحدة.', memberTitle:'جدول الحصص', memberIntro:'اختر حصتك القادمة.',
      sessions:'حصص اليوم', booked:'الأماكن المحجوزة', checked:'الحضور', available:'الأماكن المتاحة',
      openRoster:'فتح قائمة الحضور', back:'العودة للمتابعة', roster:'حضور الحصة', rosterIntro:'جميع الأعضاء افتراضيون. جرّب تسجيل الحضور.',
      demoMember:'عضو تجريبي', demoCoach:'مدرب تجريبي', you:'أنت · عضو تجريبي', present:'تم تسجيل الحضور', checkin:'تسجيل الحضور', undo:'إلغاء تسجيل الحضور',
      class:'نوع الحصة', allClasses:'كل الحصص', space:'الأماكن', anySpace:'كل الحصص', hasSpace:'يوجد أماكن', clear:'مسح التصفية', filters:'التصفية', hideFilters:'إخفاء التصفية',
      date:'اختر اليوم', upcoming:'قادمة', full:'مكتمل', book:'احجز مكاناً', cancel:'إلغاء الحجز', reserved:'تم حجز مكانك',
      left:'أماكن متاحة', noMatch:'لا توجد حصص مطابقة.', noBookings:'حصتك القادمة بانتظارك.', noBookingsBody:'احجز حصة من الجدول لتظهر هنا.', browse:'تصفح الجدول',
      sampleNote:'تجربة تفاعلية · بدون حجوزات حقيقية', sharedHint:'جرّب الحجز من الهاتف. يتحدث عرض الموظفين أيضاً.',
      initial:'استكشف الجدول التجريبي. جميع الإجراءات داخل هذه التجربة فقط.', reset:'أعيدت التجربة. اختر حصة للبدء من جديد.',
      bookingDone:'تم حجز المكان وتحديث العرضين التجريبيين.', cancelled:'ألغي الحجز وأصبح المكان متاحاً مجدداً.',
      attendanceDone:'تم تحديث الحضور التجريبي.', filterDone:'تم تحديث تصفية الجدول.', dayDone:'تم تحديث اليوم المختار.',
      lang:'اللغة', rosterCount:'محجوز', duration:'دقيقة', seats:'الأماكن المحجوزة', time:'الوقت',
      demoDates:'أسبوع تجريبي · ٢٦ أكتوبر – ١ نوفمبر ٢٠٢٦', status:'حالة التجربة', selfChecked:'تم تسجيل حضورك', total:'إجمالي',
    }
  };
  let state;
  const preferences = new Map();
  const txt = (p, key) => copy[p.lang][key];
  const num = (p, value) => new Intl.NumberFormat(p.lang === 'ar' ? 'ar-QA' : 'en-GB').format(value);
  const key = (day, id) => `${day}:${id}`;
  const isBooked = (day, id) => state.bookings.has(key(day,id));
  const enrolled = (day, c) => c.booked + Number(isBooked(day,c.id));
  const checked = (day,c) => {
    let n = 0;
    for(let i=1;i<=c.booked;i++) if(state.attendance.has(`${key(day,c.id)}:${i}`)) n++;
    if(isBooked(day,c.id) && state.attendance.has(`${key(day,c.id)}:you`)) n++;
    return n;
  };
  function resetState() {
    state = {bookings:new Set(), attendance:new Set(), message:'initial'};
    for(let day=0;day<7;day++) for(const c of classes) for(let i=1;i<=c.checked;i++) state.attendance.add(`${key(day,c.id)}:${i}`);
  }
  function dateLabel(p, long=false) {
    return new Intl.DateTimeFormat(p.lang==='ar'?'ar-QA':'en-GB',{weekday:long?'long':'short',day:'numeric',month:long?'long':'short',timeZone:'UTC'}).format(days[p.day]);
  }
  function timeLabel(p,time) {
    const [hour,minute] = time.split(':');
    return new Intl.DateTimeFormat(p.lang==='ar'?'ar-QA':'en-US',{hour:'numeric',minute:'2-digit',timeZone:'UTC'}).format(new Date(Date.UTC(2026,9,26,Number(hour),Number(minute))));
  }
  function daysHTML(p) {
    return `<div class="kd-week" role="group" aria-label="${txt(p,'date')}">${days.map((day,i)=>{
      const weekday = new Intl.DateTimeFormat(p.lang==='ar'?'ar-QA':'en-GB',{weekday:p.lang==='ar'?'narrow':'short',timeZone:'UTC'}).format(day);
      const label = new Intl.DateTimeFormat(p.lang==='ar'?'ar-QA':'en-GB',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}).format(day);
      return `<button type="button" data-kd-action="day" data-kd-day="${i}" data-kd-focus="day-${i}" aria-pressed="${p.day===i}" aria-label="${weekday} ${num(p,day.getUTCDate())}, ${label}"><span>${weekday}</span> <strong>${num(p,day.getUTCDate())}</strong></button>`;
    }).join('')}</div>`;
  }
  function filtersHTML(p) {
    return `<div class="kd-filters"><label><span>${txt(p,'class')}</span><select data-kd-filter="class" data-kd-focus="filter-class"><option value="all">${txt(p,'allClasses')}</option>${classes.map(c=>`<option value="${c.id}"${p.class===c.id?' selected':''}>${c[p.lang]}</option>`).join('')}</select></label><label><span>${txt(p,'space')}</span><select data-kd-filter="space" data-kd-focus="filter-space"><option value="all">${txt(p,'anySpace')}</option><option value="available"${p.space==='available'?' selected':''}>${txt(p,'hasSpace')}</option></select></label>${p.class!=='all'||p.space!=='all'?`<button class="kd-quiet" type="button" data-kd-action="clear" data-kd-focus="clear">${txt(p,'clear')}</button>`:''}</div>`;
  }
  function filterControlHTML(p) {
    return `<div class="kd-filter-control"><button class="kd-filter-toggle" type="button" data-kd-action="filters" data-kd-focus="filters" aria-expanded="${p.filterOpen}" aria-controls="kd-filters-${p.role}">${txt(p,p.filterOpen?'hideFilters':'filters')} <span aria-hidden="true">${p.filterOpen?'−':'＋'}</span></button><div id="kd-filters-${p.role}"${p.filterOpen?'':' hidden'}>${filtersHTML(p)}</div></div>`;
  }
  function statsHTML(p) {
    const booked = classes.reduce((n,c)=>n+enrolled(p.day,c),0);
    const attended = classes.reduce((n,c)=>n+checked(p.day,c),0);
    const available = classes.reduce((n,c)=>n+c.capacity-enrolled(p.day,c),0);
    return `<dl class="kd-pulse"><div><dt>${txt(p,'sessions')}</dt><dd>${num(p,classes.length)}</dd></div><div><dt>${txt(p,'booked')}</dt><dd>${num(p,booked)}</dd></div><div><dt>${txt(p,'checked')}</dt><dd>${num(p,attended)}</dd></div><div><dt>${txt(p,'available')}</dt><dd>${num(p,available)}</dd></div></dl>`;
  }
  function classHTML(p,c) {
    const booked = isBooked(p.day,c.id), count = enrolled(p.day,c), full = count>=c.capacity;
    const selfChecked = booked && state.attendance.has(`${key(p.day,c.id)}:you`);
    const minutes = c.id==='mobility'?45:60;
    const action = p.role==='staff'
      ? `<button class="kd-action kd-action-secondary" type="button" data-kd-action="roster" data-kd-class="${c.id}" data-kd-focus="roster-${c.id}">${txt(p,'openRoster')} <span aria-hidden="true">${p.lang==='ar'?'←':'→'}</span></button>`
      : `<button class="kd-action${booked?' kd-action-secondary':''}" type="button" data-kd-action="${booked?'cancel':'book'}" data-kd-class="${c.id}" data-kd-focus="book-${c.id}"${full&&!booked?' disabled':''}>${txt(p,booked?'cancel':full?'full':'book')}</button>`;
    return `<article class="kd-class${booked?' kd-is-booked':''}"><div class="kd-class-art" aria-hidden="true"><img src="${assets}demo/${c.id}.png" alt="" loading="lazy"></div><div class="kd-class-main"><p class="kd-class-state">${txt(p,selfChecked?'selfChecked':booked?'reserved':full?'full':'upcoming')}</p><h3>${c[p.lang]}</h3><p class="kd-class-time" dir="ltr">${timeLabel(p,c.time)} <span aria-hidden="true">—</span> ${timeLabel(p,c.end)}</p><p class="kd-class-coach">${txt(p,'demoCoach')} ${num(p,c.coach)}<span aria-hidden="true"> · </span>${num(p,minutes)} ${txt(p,'duration')}</p></div><div class="kd-class-bottom"><div class="kd-capacity"><span>${txt(p,'seats')}</span><strong>${num(p,count)} <span>/ ${num(p,c.capacity)}</span></strong><progress max="${c.capacity}" value="${count}" aria-label="${c[p.lang]}: ${txt(p,'seats')}"></progress></div>${action}</div></article>`;
  }
  function classesHTML(p) {
    const shown = classes.filter(c=>(p.class==='all'||p.class===c.id)&&(p.space!=='available'||enrolled(p.day,c)<c.capacity)&&(p.view!=='bookings'||isBooked(p.day,c.id)));
    if(!shown.length) return `<div class="kd-empty"><span class="kd-empty-mark" aria-hidden="true">${p.view==='bookings'?'↗':'—'}</span><h3>${txt(p,p.view==='bookings'?'noBookings':'noMatch')}</h3>${p.view==='bookings'?`<p>${txt(p,'noBookingsBody')}</p><button class="kd-action" type="button" data-kd-action="view" data-kd-view="schedule" data-kd-focus="browse">${txt(p,'browse')}</button>`:`<button class="kd-quiet" type="button" data-kd-action="clear" data-kd-focus="clear">${txt(p,'clear')}</button>`}</div>`;
    return `<div class="kd-class-list">${shown.map(c=>classHTML(p,c)).join('')}</div>`;
  }
  function rosterHTML(p) {
    const c = classes.find(c=>c.id===p.roster);
    const members = Array.from({length:c.booked},(_,i)=>String(i+1));
    if(isBooked(p.day,c.id)) members.unshift('you');
    return `<button class="kd-back" type="button" data-kd-action="back" data-kd-focus="back">${p.lang==='ar'?'→':'←'} ${txt(p,'back')}</button><div class="kd-roster-heading"><p class="kd-overline">${txt(p,'roster')}</p><h1 tabindex="-1" data-kd-focus="heading">${c[p.lang]}</h1><p class="kd-lead">${dateLabel(p,true)} <span aria-hidden="true">·</span> <bdi>${timeLabel(p,c.time)}</bdi></p><p>${txt(p,'rosterIntro')}</p><p class="kd-roster-tally"><strong>${num(p,checked(p.day,c))}</strong> / ${num(p,enrolled(p.day,c))} ${txt(p,'checked')}</p></div><ul class="kd-roster">${members.map(member=>{
      const on=state.attendance.has(`${key(p.day,c.id)}:${member}`);
      const name=member==='you'?txt(p,'you'):`${txt(p,'demoMember')} ${num(p,Number(member)).padStart(p.lang==='ar'?1:2,'0')}`;
      return `<li><span class="kd-member-avatar" aria-hidden="true">${member==='you'?'◎':num(p,Number(member))}</span><div><strong>${name}</strong><span>${txt(p,'sample')}</span></div><button class="kd-check${on?' kd-check-on':''}" type="button" data-kd-action="check" data-kd-member="${member}" data-kd-class="${c.id}" data-kd-focus="check-${member}" aria-pressed="${on}" aria-label="${txt(p,on?'undo':'checkin')}: ${name}"><span aria-hidden="true">${on?'✓':'＋'}</span> ${txt(p,on?'present':'checkin')}</button></li>`;
    }).join('')}</ul>`;
  }
  function appHTML(p) {
    const staff=p.role==='staff';
    const views=staff?['dashboard','schedule']:['schedule','bookings'];
    const current=p.view==='roster'?'dashboard':p.view;
    const bookingCount=[...state.bookings].filter(k=>k.startsWith(`${p.day}:`)).length;
    const nav=`<nav class="kd-navigation" aria-label="${txt(p,staff?'staff':'member')}">${views.map(view=>`<button type="button" data-kd-action="view" data-kd-view="${view}" data-kd-focus="view-${view}"${current===view?' aria-current="page"':''}>${txt(p,view)}${view==='bookings'&&bookingCount?` <span class="kd-nav-count">${num(p,bookingCount)}</span>`:''}</button>`).join('')}</nav>`;
    const languages=`<div class="kd-language" role="group" aria-label="${txt(p,'lang')}"><button type="button" data-kd-action="lang" data-kd-lang="en" data-kd-focus="lang-en" lang="en" aria-pressed="${p.lang==='en'}">EN</button><button type="button" data-kd-action="lang" data-kd-lang="ar" data-kd-focus="lang-ar" lang="ar" aria-pressed="${p.lang==='ar'}">العربية</button></div>`;
    const header=`<header class="kd-topbar"><img class="kd-logo" src="${assets}kallos-light.svg" alt="Kallos Fitness" width="150" height="46"><div class="kd-topbar-tools"><span class="kd-sample">${txt(p,'sample')}</span>${languages}</div></header>`;
    const title=p.view==='dashboard'?'title':p.view==='bookings'?'bookings':staff?'schedule':'memberTitle';
    const normal=`<div class="kd-page-heading"><p class="kd-overline">${txt(p,'demoDates')}</p><h1 tabindex="-1" data-kd-focus="heading">${txt(p,title)}</h1>${p.view!=='bookings'?`<p class="kd-lead">${txt(p,staff?'staffIntro':'memberIntro')}</p>`:''}</div>${p.view==='dashboard'?'':daysHTML(p)}${staff&&p.view==='dashboard'?statsHTML(p):''}<div class="kd-agenda-heading"><h2>${p.view==='bookings'?txt(p,'bookings'):dateLabel(p,true)}</h2>${staff?`<span>${num(p,classes.length)} ${txt(p,'sessions').toLocaleLowerCase(p.lang)}</span>`:''}</div>${p.view==='schedule'?filterControlHTML(p):''}${classesHTML(p)}`;
    return `${header}${nav}<div class="kd-main">${p.view==='roster'?rosterHTML(p):normal}</div><footer class="kd-app-footer">${txt(p,'sampleNote')}</footer>`;
  }
  function renderAll(messageKey,focusOverride) {
    if(messageKey) state.message=messageKey;
    for(const root of roots) {
      const p=preferences.get(root);
      const active=root.contains(document.activeElement)?document.activeElement:null;
      const previousFocus=active?.dataset.kdFocus;
      const surface=root.querySelector('.kd-render');
      const top=surface.scrollTop;
      root.dataset.message=state.message;
      root.lang=p.lang;
      root.dir=p.lang==='ar'?'rtl':'ltr';
      surface.innerHTML=appHTML(p);
      surface.scrollTop=top;
      const status=root.querySelector('.kd-status');
      status.setAttribute('aria-label',txt(p,'status'));
      status.textContent=txt(p,state.message);
      if(active) {
        const target=root.querySelector(`[data-kd-focus="${focusOverride||previousFocus}"]`)||root.querySelector('[data-kd-focus="heading"]');
        target?.focus({preventScroll:true});
      }
    }
    document.dispatchEvent(new CustomEvent('kallos:demo-change'));
  }
  for(const root of roots) {
    preferences.set(root,{role:root.dataset.kallosApp,lang:'en',view:root.dataset.kallosApp==='staff'?'dashboard':'schedule',day:0,class:'all',space:'all',roster:'skills',filterOpen:false});
    root.innerHTML='<div class="kd-render"></div><p class="kd-status" role="status" aria-live="polite" aria-atomic="true"></p>';
    root.addEventListener('click',event=>{
      const button=event.target.closest('[data-kd-action]');
      if(!button||!root.contains(button)||button.disabled) return;
      const p=preferences.get(root), action=button.dataset.kdAction;
      let message,focus;
      if(action==='lang') {p.lang=button.dataset.kdLang;}
      if(action==='view') {p.view=button.dataset.kdView; p.class='all';p.space='all';p.filterOpen=false;}
      if(action==='filters') {p.filterOpen=!p.filterOpen;}
      if(action==='day') {for(const pref of preferences.values())pref.day=Number(button.dataset.kdDay);message='dayDone';}
      if(action==='clear') {p.class='all';p.space='all';message='filterDone';focus='filter-class';}
      if(action==='roster') {p.roster=button.dataset.kdClass;p.view='roster';focus='back';}
      if(action==='back') {p.view='dashboard';focus=`roster-${p.roster}`;}
      if(action==='book') {
        const c=classes.find(c=>c.id===button.dataset.kdClass);
        if(!c||enrolled(p.day,c)>=c.capacity||isBooked(p.day,c.id)) return;
        state.bookings.add(key(p.day,c.id));message='bookingDone';
      }
      if(action==='cancel') {state.bookings.delete(key(p.day,button.dataset.kdClass));state.attendance.delete(`${key(p.day,button.dataset.kdClass)}:you`);message='cancelled';}
      if(action==='check') {
        const id=`${key(p.day,button.dataset.kdClass)}:${button.dataset.kdMember}`;
        state.attendance.has(id)?state.attendance.delete(id):state.attendance.add(id);
        message='attendanceDone';
      }
      renderAll(message,focus);
      if(action==='view'||action==='roster'||action==='back') root.querySelector('.kd-render').scrollTop=0;
    });
    root.addEventListener('change',event=>{
      const field=event.target.closest('[data-kd-filter]');
      if(!field) return;
      preferences.get(root)[field.dataset.kdFilter]=field.value;
      renderAll('filterDone');
    });
  }
  resetState();
  renderAll();
  window.KallosDemo=Object.freeze({snapshot(role){
    const root=roots.find(r=>r.dataset.kallosApp===role);
    if(!root)return null;
    const p=preferences.get(root);
    return {lang:p.lang,date:dateLabel(p,true),counts:{sessions:classes.length,booked:classes.reduce((n,c)=>n+enrolled(p.day,c),0),checked:classes.reduce((n,c)=>n+checked(p.day,c),0),available:classes.reduce((n,c)=>n+c.capacity-enrolled(p.day,c),0)},classes:classes.map(c=>({id:c.id,title:c[p.lang],time:timeLabel(p,c.time),end:timeLabel(p,c.end),capacity:c.capacity,enrolled:enrolled(p.day,c),checked:checked(p.day,c),booked:isBooked(p.day,c.id)}))};
  },reset(){
    resetState();
    for(const root of roots) {
      const p=preferences.get(root);Object.assign(p,{view:p.role==='staff'?'dashboard':'schedule',day:0,class:'all',space:'all',roster:'skills',filterOpen:false});
    }
    renderAll('reset');
    for(const root of roots) root.querySelector('.kd-render').scrollTop=0;
  }});
})();
