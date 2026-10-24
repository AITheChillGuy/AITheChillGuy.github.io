/* Prepared interactions explain the products without calling either live service. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = el => { if (!reduced && el?.animate) el.animate([{ opacity: .3, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'ease-out' }); };
  const wireTabs = (selector, action) => {
    const tabs = [...document.querySelectorAll(selector)];
    const select = tab => {
      tabs.forEach(t => { const on=t===tab; t.setAttribute('aria-selected', String(on)); t.tabIndex=on?0:-1; });
      action(tab);
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', e => {
        let next;
        if (e.key==='ArrowRight') next=(i+1)%tabs.length;
        if (e.key==='ArrowLeft') next=(i-1+tabs.length)%tabs.length;
        if (e.key==='Home') next=0;
        if (e.key==='End') next=tabs.length-1;
        if (next!==undefined) { e.preventDefault(); select(tabs[next]); tabs[next].focus(); }
      });
    });
  };
  const personal = document.getElementById('fm-personal');
  if (personal) personal.addEventListener('click', () => {
    const on=personal.getAttribute('aria-pressed')!=='true';
    personal.setAttribute('aria-pressed',String(on));
    document.getElementById('fm-album').classList.toggle('is-personal',on);
    personal.textContent=on?'Show the full collection ↗':'Show a guest’s view ↗';
    document.getElementById('fm-gallery-status').textContent=on?'A guest’s selected moments':'Browse the collection';
  });
  if (document.getElementById('fm-pipeline-panel')) {
    let medium='photos', step=0;
    const content={
      photos:[['Build an event gallery.','The organizer uploads a photo archive. A background indexing pipeline processes it once and stores a separate face-search index for that event.'],['Turn faces into searchable vectors.','InsightFace detects faces and generates embeddings with the ArcFace model. ONNX Runtime supports GPU acceleration with a CPU fallback.'],['Search within the right event.','Reference photos are embedded and compared against the event’s FAISS index. Event isolation keeps unrelated galleries out of the candidate set.'],['Give the guest a personal gallery.','Matched photos are returned through the guest experience. Organizers retain separate controls for managing their event and media.']],
      video:[['Start with a sparse pass.','The video pipeline samples frames to find likely appearances without treating every frame as a full recognition task.'],['Detect, embed, and cache.','Face detections and embeddings are cached for reuse. The same source video can support subsequent guest searches.'],['Locate the useful moments.','Matches are grouped into segments. A denser pass identifies useful peaks, and overlapping clip windows are deduplicated.'],['Cut and deliver highlights.','FFmpeg extracts the clips. The interface presents the resulting moments alongside the person’s matched event photos.']]
    };
    const paint = () => {
      document.querySelectorAll('[data-fm-step]').forEach(b => b.setAttribute('aria-pressed',String(Number(b.dataset.fmStep)===step)));
      document.getElementById('fm-step-title').textContent=content[medium][step][0];
      document.getElementById('fm-step-copy').textContent=content[medium][step][1];
      animate(document.querySelector('.fm-engine-detail'));
    };
    wireTabs('[data-pipeline]', tab => { medium=tab.dataset.pipeline; document.getElementById('fm-pipeline-panel').setAttribute('aria-labelledby',tab.id); paint(); });
    document.querySelectorAll('[data-fm-step]').forEach(b => b.addEventListener('click',()=>{step=Number(b.dataset.fmStep);paint();}));
  }
  const panel=document.getElementById('kg-role-panel');
  if (panel) {
    let role='member', lang='en', booked=false;
    const copy={
      en:{member:['Your next session.','Book a class and keep track of your training.','Membership active','Members browse the schedule, book eligible classes, and review their bookings and membership.'],coach:['Your classes, in focus.','See assigned sessions and follow attendance.','Coach workspace','Coaches see their assigned sessions and the attendance information needed to run them.'],reception:['Keep the front desk moving.','Member records, check-ins, and daily attendance.','Reception workspace','Reception staff manage member records, attendance, and the operational work around each session.'],admin:['A view across the gym.','Manage people, classes, memberships, and reports.','Admin workspace','Administrators oversee staff, scheduling, plans, reports, communications, and audit logs.']},
      ar:{member:['حصتك القادمة.','احجز حصتك وتابع تدريبك.','العضوية نشطة','يتصفح الأعضاء الجدول ويحجزون الحصص المتاحة ويتابعون حجوزاتهم وعضوياتهم.'],coach:['حصصك، في مكان واحد.','تابع الحصص المسندة إليك وسجلات الحضور.','مساحة المدرب','يتابع المدربون حصصهم وسجلات الحضور اللازمة لإدارتها.'],reception:['كل ما يحتاجه الاستقبال.','سجلات الأعضاء وتسجيل الدخول والحضور اليومي.','مساحة الاستقبال','يدير فريق الاستقبال سجلات الأعضاء والحضور والمهام اليومية.'],admin:['صورة متكاملة للنادي.','إدارة الفريق والحصص والعضويات والتقارير.','مساحة الإدارة','تشرف الإدارة على الفريق والجداول والعضويات والتقارير وسجلات النشاط.']}
    };
    const paint=()=>{
      const c=copy[lang][role], ar=lang==='ar';
      panel.lang=lang; panel.dir=ar?'rtl':'ltr'; panel.setAttribute('aria-labelledby','kg-'+role);
      const heading=document.createElement('div');heading.className='kg-demo-title';
      const info=document.createElement('div'), h=document.createElement('h3'), sub=document.createElement('p'), badge=document.createElement('span');
      h.textContent=c[0];sub.textContent=c[1];badge.className='kg-status';badge.textContent=c[2];info.append(h,sub);heading.append(info,badge);
      const session=document.createElement('div');session.className='kg-session';
      const time=document.createElement('time');time.textContent='18:00';time.dateTime='18:00';
      const detail=document.createElement('div'), title=document.createElement('h4'), meta=document.createElement('p');
      title.textContent=ar?'أساسيات الكاليستنكس':'Calisthenics foundations';meta.textContent=ar?'التقنية والقوة / ٦٠ دقيقة':'Technique and strength / 60 minutes';detail.append(title,meta);session.append(time,detail);
      if(role==='member'){
        const button=document.createElement('button');button.type='button';button.className='kg-book';button.id='kg-booking';button.textContent=ar?(booked?'إلغاء الحجز التجريبي':'جرّب حجز مكان'):(booked?'Cancel demo booking':'Try booking a spot');button.setAttribute('aria-pressed',String(booked));button.addEventListener('click',()=>{booked=!booked;paint();document.getElementById('kg-booking').focus();});session.append(button);
      } else {const state=document.createElement('span');state.className='kg-status';state.textContent=ar?'حصة توضيحية':'Example session';session.append(state);}
      const story=document.createElement('p');story.className='kg-demo-story';story.setAttribute('role','status');story.textContent=ar?(booked?'تم تأكيد الحجز التجريبي على هذه الصفحة فقط.':'تتحقق المنصة الفعلية من صلاحية العضوية وسعة الحصة قبل تأكيد الحجز.'):(booked?'Demo booking confirmed on this page only.':'The real platform checks membership eligibility and class capacity before confirming a booking.');
      panel.replaceChildren(heading,session,story);
      const note=document.getElementById('kg-role-note');note.textContent=c[3];note.lang=lang;note.dir=ar?'rtl':'ltr';
      animate(panel);
    };
    wireTabs('[data-role]', tab=>{role=tab.dataset.role;paint();});
    document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;document.querySelectorAll('[data-lang]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));paint();}));
    paint();
  }
})();
