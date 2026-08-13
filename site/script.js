/* Ahmed Ibrahim — Portfolio
   Minimal interaction layer. Degrades cleanly without JS. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---- Hero avatar: touch press toggles pose ----------------
     CSS :active is unreliable on iOS for non-button divs (the
     state can get stuck). Explicit touchstart/touchend with a
     class keeps the swap tied to the actual press lifecycle. */
  const heroAvatar = $('.hero .avatar');
  if (heroAvatar && touch) {
    const press = (e) => {
      if (e.cancelable) e.preventDefault();
      heroAvatar.classList.add('is-pressed');
    };
    const release = () => heroAvatar.classList.remove('is-pressed');
    heroAvatar.addEventListener('touchstart', press, { passive: false });
    heroAvatar.addEventListener('touchend', release);
    heroAvatar.addEventListener('touchcancel', release);
    /* Belt-and-suspenders: if the touch leaves the element. */
    heroAvatar.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      if (!t) return;
      const r = heroAvatar.getBoundingClientRect();
      const inside = t.clientX >= r.left && t.clientX <= r.right
                   && t.clientY >= r.top && t.clientY <= r.bottom;
      if (!inside) release();
    }, { passive: true });
  }

  /* ---- Mobile nav -------------------------------------------- */
  const toggle = $('.nav-toggle'), overlay = $('#navmenu');
  function closeMenu() {
    if (!overlay) return;
    overlay.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      overlay.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    });
    const close = $('.close', overlay);
    if (close) close.addEventListener('click', closeMenu);
    $$('a', overlay).forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ---- Active nav link on scroll -----------------------------
     Picks the section currently crossing a "trigger line" set
     just below the sticky nav. Works for tall sections (the
     About panel exceeds 100vh on most viewports, which broke the
     previous threshold-based IntersectionObserver). Also clears
     the active state when the user is back at the hero. */
  const navLinks = $$('.nav-link');
  const sectionIds = ['about', 'research', 'projects', 'contact'];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (navLinks.length && sections.length) {
    const setActive = (id) => {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    };
    const clearActive = () => {
      navLinks.forEach(l => l.classList.remove('active'));
    };

    const computeActive = () => {
      const nav = document.querySelector('.nav');
      const navHeight = nav ? nav.offsetHeight : 64;
      const triggerLine = navHeight + 80;

      let activeId = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerLine && rect.bottom > triggerLine) {
          activeId = section.id;
          break;
        }
      }

      if (activeId) setActive(activeId);
      else clearActive();
    };

    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { computeActive(); ticking = false; });
    }, { passive: true });
    addEventListener('resize', computeActive, { passive: true });
    computeActive();
  }

  /* ---- About: cycling word in section heading ---------------- */
  const cycleEl = $('.section-head .cycle');
  if (cycleEl && !reduce) {
    const words = [
      'AI systems',
      'language models',
      'retrieval pipelines',
      'agent workflows',
      'multimodal models'
    ];
    let i = 0;
    setInterval(() => {
      cycleEl.classList.add('swap');
      setTimeout(() => {
        i = (i + 1) % words.length;
        cycleEl.innerHTML = words[i];
        cycleEl.classList.remove('swap');
      }, 280);
    }, 2800);
  }

  /* ---- About: publication count + stat counter animation -----
     Publication count auto-updates two ways:
       (1) DOM count of .pub-list .pub items — always the floor.
       (2) Live fetch from OpenAlex via ORCID, filtered to WCM-Q
           affiliation (excludes the chemistry-namesake Ahmed
           Ibrahim). If the live count exceeds the DOM count
           (meaning OpenAlex indexed a new paper before it was
           added to the static list), the live number wins.
     If the fetch fails or is slower than the scroll-in trigger,
     we just use the DOM count and move on. */
  const ORCID = '0009-0002-9217-4173';
  const WCMQ_INSTITUTION = 'I4210152471';
  const OPENALEX_URL =
    `https://api.openalex.org/works` +
    `?filter=author.orcid:${ORCID},authorships.institutions.id:${WCMQ_INSTITUTION}` +
    `&per-page=1`;

  const domPubCount = $$('.pub-list .pub').length;
  const featuredProjectCount =
    $$('.proj-git .git-commit').length || $$('.proj-grid .proj-card').length;
  let resolvedPubCount = domPubCount;

  $$('.stat-num').forEach(el => {
    if (el.dataset.source === 'featured') el.dataset.count = String(featuredProjectCount);
  });

  const applyPubCount = (n) => {
    resolvedPubCount = n;
    $$('.js-pub-count').forEach(el => { el.textContent = n; });
    $$('.stat-num').forEach(el => {
      if (el.dataset.source === 'pubs') el.dataset.count = String(n);
    });
  };
  applyPubCount(domPubCount);

  if (typeof fetch === 'function') {
    fetch(OPENALEX_URL, { headers: { 'Accept': 'application/json' } })
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        const liveCount = json && json.meta && Number.isInteger(json.meta.count)
          ? json.meta.count : 0;
        if (liveCount > resolvedPubCount) applyPubCount(liveCount);
      })
      .catch(() => { /* offline / blocked / CORS — DOM count stands */ });
  }

  const statNums = $$('.stat-num');
  if (statNums.length) {
    const tween = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      if (reduce) { el.textContent = target + suffix; return; }
      const duration = 1100;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(target * eased);
        el.textContent = val + (t === 1 ? suffix : '');
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const statIo = new IntersectionObserver((ents) => {
      ents.forEach(en => {
        if (en.isIntersecting) {
          tween(en.target);
          statIo.unobserve(en.target);
        }
      });
    }, { threshold: 0.6 });
    statNums.forEach(n => statIo.observe(n));
  }

  /* ---- Projects: interactive git terminal ------------------
     The footer is a fake shell that responds to a handful of
     git-flavoured commands. Recognised commands print canned
     output (and sometimes run a CSS animation on <body>);
     `open <path>` is the one way to actually navigate into a
     project page. ↑/↓ cycle through command history. */
  const gitForm = $('#git-input-row');
  const gitInput = $('#git-input');
  const gitHistory = $('#git-history');
  if (gitForm && gitInput && gitHistory) {
    const cmdHistory = [];
    let cmdCursor = -1;

    const print = (out, opts = {}) => {
      const el = document.createElement('div');
      el.className = 'git-history-out' + (opts.error ? ' is-error' : '');
      if (opts.html) el.innerHTML = out; else el.textContent = out;
      gitHistory.lastChild.appendChild(el);
      gitHistory.scrollTop = gitHistory.scrollHeight;
    };

    const echo = (cmd) => {
      const entry = document.createElement('div');
      entry.className = 'git-history-entry';
      const line = document.createElement('div');
      line.className = 'git-history-cmd';
      line.innerHTML = '<span class="git-prompt">$</span><span></span>';
      line.lastChild.textContent = cmd;
      entry.appendChild(line);
      gitHistory.appendChild(entry);
      gitHistory.scrollTop = gitHistory.scrollHeight;
    };

    const projects = {
      'work/hgts.html':                 'HGTS — VR + Haptics',
      'work/d3.html':                   'D3 — Small LM for DDI',
      'work/mera.html':                 'MERA — Clinical RAG',
      'work/menara.html':               'MENARA — Arabic medical LLM',
      'work/triagent.html':             'TriAgent — Crisis CDS',
      'work/stroke-segmentation.html':  'Stroke Lesion Segmentation on MRI',
      'work/multimodal-radiology.html': 'Multimodal Models for Radiology',
    };

    const run = (raw) => {
      const cmd = raw.trim();
      if (!cmd) return;
      echo(cmd);
      cmdHistory.push(cmd);
      cmdCursor = cmdHistory.length;

      const lower = cmd.toLowerCase();
      const parts = cmd.split(/\s+/);
      const head = parts[0].toLowerCase();
      const rest = parts.slice(1).join(' ');

      /* --- navigation -------------------------------------- */
      if (head === 'open' || head === 'cat' && /^work\//.test(parts[1] || '')) {
        const path = parts[1] || '';
        if (path in projects) {
          print('opening ' + path + ' …');
          setTimeout(() => { window.location.href = path; }, 350);
          return;
        }
        if (path === 'CV-Resume.pdf' || path === 'cv' || path === 'CV') {
          print('opening CV-Resume.pdf …');
          setTimeout(() => { window.location.href = 'CV-Resume.pdf'; }, 350);
          return;
        }
        print('open: cannot open `' + (path || '<path>') + '`: not in this repo', { error: true });
        return;
      }

      /* --- help -------------------------------------------- */
      if (lower === 'help' || lower === '?' || lower === 'man') {
        print(
          'known commands\n' +
          '  git status            show working tree state\n' +
          '  git log               recent project commits\n' +
          '  git branch            list branches\n' +
          '  git blame             whodunit\n' +
          '  git push --force      try to rewrite history\n' +
          '  git rm -rf .          (don\'t)\n' +
          '  ls                    list project files\n' +
          '  cat README.md         the short version\n' +
          '  open <path>           open a project dossier\n' +
          '  whoami                current user\n' +
          '  vim                   exit Vim\n' +
          '  sudo rm -rf /         classic\n' +
          '  clear                 wipe terminal output\n'
        );
        return;
      }

      /* --- git status -------------------------------------- */
      if (lower === 'git status' || lower === 'status') {
        print(
          'On branch main\n' +
          'Your branch is up to date with \'origin/main\'.\n' +
          '\n' +
          'nothing to commit, working tree clean.\n' +
          '(agentic branch merged — TriAgent shipped in AI 7(6):230)'
        );
        return;
      }

      /* --- git log ----------------------------------------- */
      if (lower === 'git log' || lower === 'git log --oneline' || lower === 'log') {
        print(
          'e18f230  (HEAD -> main, tag: paper/triagent)  paper(triagent): TriAgent\n' +
          'b7c8d12  (tag: paper/menara)                  paper(menara): MENARA\n' +
          '4d2a89e  (tag: paper/mera)                    paper(mera): MERA\n' +
          '9f3b15a  (tag: paper/d3)                      paper(d3): D3\n' +
          '1c8e4f7  (tag: capstone/hgts)                 release(hgts): HGTS'
        );
        return;
      }

      /* --- git branch -------------------------------------- */
      if (lower === 'git branch' || lower === 'branch') {
        print(
          '* main\n' +
          '  agentic            (merged -> paper/triagent)\n' +
          '  grad-school        (untracked, applying soon)'
        );
        return;
      }

      /* --- git blame --------------------------------------- */
      if (lower === 'git blame' || lower === 'blame') {
        print(
          '^e18f230 (Ahmed Ibrahim  2026-06  ) all of it\n' +
          '^b7c8d12 (Ahmed Ibrahim  2026-04  ) all of it\n' +
          '^4d2a89e (Ahmed Ibrahim  2025-07  ) all of it\n' +
          '^9f3b15a (Ahmed Ibrahim  2025-04  ) all of it\n' +
          '^1c8e4f7 (Ahmed Ibrahim  2023-06  ) the haptic glove, mostly'
        );
        return;
      }

      /* --- git push --force -------------------------------- */
      if (/^git push (--force|-f)$/.test(lower) || lower === 'push --force' || lower === 'push -f') {
        document.body.classList.add('is-pushing');
        setTimeout(() => document.body.classList.remove('is-pushing'), 1100);
        print(
          'To origin/main\n' +
          ' ! [rejected]        main -> main (non-fast-forward)\n' +
          'error: failed to push some refs.\n' +
          'hint: the universe doesn\'t allow rewrites of history.'
        );
        return;
      }

      /* --- git rm -rf . (destructive — actually navigates) -- */
      if (/^(git\s+)?rm\s+-rf\s+\.?$/.test(lower) || lower === 'rm -rf .' || lower === 'rm -rf') {
        /* Stream rm: messages quickly, before the fade starts,
           so the punchline is fully readable. */
        print('rm: removing the whole damn thing …');
        setTimeout(() => print('rm: removed `./work/hgts.html`'),     120);
        setTimeout(() => print('rm: removed `./work/d3.html`'),       220);
        setTimeout(() => print('rm: removed `./work/mera.html`'),     320);
        setTimeout(() => print('rm: removed `./work/menara.html`'),   420);
        setTimeout(() => print('rm: removed `./work/triagent.html`'), 520);
        setTimeout(() => print('rm: removed `./index.html`'),         620);
        setTimeout(() => print('rm: removed `./styles.css`'),         720);
        setTimeout(() => print('rm: removed `./.git/`'),              820);
        setTimeout(() => print('done. nothing left.', { error: true }), 940);
        setTimeout(() => document.body.classList.add('is-deleting'), 1200);
        setTimeout(() => { window.location.href = '404.html'; },     2400);
        return;
      }

      /* --- sudo rm -rf / ----------------------------------- */
      if (/^sudo\s+rm\s+-rf\s+\/?$/.test(lower)) {
        document.body.classList.add('is-glitching');
        setTimeout(() => document.body.classList.remove('is-glitching'), 1200);
        print('Sorry, ahmed is not in the sudoers file.\nThis incident will be reported.', { error: true });
        return;
      }

      /* --- ls ---------------------------------------------- */
      if (lower === 'ls' || lower === 'dir' || lower === 'ls -la') {
        print(
          'work/triagent.html             work/menara.html\n' +
          'work/mera.html                 work/d3.html\n' +
          'work/stroke-segmentation.html  work/hgts.html\n' +
          'work/multimodal-radiology.html CV-Resume.pdf\n' +
          'README.md                      .git/'
        );
        return;
      }

      /* --- cat README.md ----------------------------------- */
      if (lower === 'cat readme.md' || lower === 'cat readme' || lower === 'readme') {
        print(
          '# Ahmed Ibrahim\n' +
          '\n' +
          'AI research specialist · Weill Cornell Medicine — Qatar.\n' +
          'I work end-to-end on LLMs, RAG, multimodal models, and AI agents,\n' +
          'with healthcare data as the use case rather than the subject.\n' +
          '\n' +
          '## current\n' +
          '  - TriAgent — crisis clinical decision support (AI 7(6):230)\n' +
          '  - applying to graduate school\n'
        );
        return;
      }

      /* --- whoami ------------------------------------------ */
      if (lower === 'whoami' || lower === 'id') {
        print('guest@ahmed-portfolio  (curious visitor)');
        return;
      }

      /* --- pwd --------------------------------------------- */
      if (lower === 'pwd') {
        print('/home/ahmed/portfolio');
        return;
      }

      /* --- cd ---------------------------------------------- */
      if (head === 'cd') {
        print('already at root. there\'s nowhere else to go.');
        return;
      }

      /* --- vim --------------------------------------------- */
      if (lower === 'vim' || lower === 'vi' || lower === 'nvim') {
        print(':q!\nyou can check out any time you like, but you can never leave.', { error: true });
        return;
      }

      /* --- exit / quit ------------------------------------- */
      if (lower === 'exit' || lower === 'quit' || lower === ':q' || lower === ':wq') {
        print('there is no exit. only more research.');
        return;
      }

      /* --- clear ------------------------------------------- */
      if (lower === 'clear' || lower === 'cls') {
        gitHistory.innerHTML = '';
        return;
      }

      /* --- echo -------------------------------------------- */
      if (head === 'echo') {
        print(rest);
        return;
      }

      /* --- date -------------------------------------------- */
      if (lower === 'date') {
        print(new Date().toString());
        return;
      }

      /* --- coffee ------------------------------------------ */
      if (lower === 'coffee' || lower === 'make coffee') {
        print('error: 418  I\'m a teapot.\n(also we\'re monochrome, no coffee colour to render)', { error: true });
        return;
      }

      /* --- unknown ----------------------------------------- */
      print('command not found: ' + cmd + '\ntry `help` for a list of commands.', { error: true });
    };

    gitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = gitInput.value;
      run(v);
      gitInput.value = '';
    });

    gitInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (!cmdHistory.length) return;
        e.preventDefault();
        cmdCursor = Math.max(0, cmdCursor - 1);
        gitInput.value = cmdHistory[cmdCursor] || '';
      } else if (e.key === 'ArrowDown') {
        if (!cmdHistory.length) return;
        e.preventDefault();
        cmdCursor = Math.min(cmdHistory.length, cmdCursor + 1);
        gitInput.value = cmdHistory[cmdCursor] || '';
      } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        gitHistory.innerHTML = '';
      }
    });

    /* Clicking anywhere in the footer focuses the input. */
    const gitFoot = $('.git-foot');
    if (gitFoot) {
      gitFoot.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') gitInput.focus();
      });
    }
  }

  /* ---- Publications: show-all toggle ------------------------
     The first 6 entries are visible by default; the rest are
     hidden behind a button to keep the section scannable. */
  const pubMore = $('.pub-more');
  const pubList = $('#pub-list');
  if (pubMore && pubList) {
    const totalPubs = $$('.pub', pubList).length;
    const labelEl = pubMore.querySelector('.pub-more-label');
    const setState = (expanded) => {
      pubList.classList.toggle('is-expanded', expanded);
      pubMore.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      if (labelEl) {
        labelEl.innerHTML = expanded
          ? 'Show fewer publications'
          : `Show all <span class="js-pub-count">${totalPubs}</span> publications`;
      }
    };
    setState(false);
    pubMore.addEventListener('click', () => {
      const expanded = pubList.classList.contains('is-expanded');
      setState(!expanded);
    });
  }

  /* ---- Trajectory timeline: tap-to-expand on touch ----------
     On desktop, t-entry rows open on hover (CSS). On touch
     devices the hover never fires, so without this they would
     stay collapsed. Tap any row to toggle its detail. */
  if (touch) {
    const tEntries = $$('.t-entry');
    /* Pre-open the current role so the section isn't fully blank. */
    const current = tEntries.find(e => e.classList.contains('t-current'));
    if (current) current.classList.add('is-open');
    tEntries.forEach(entry => {
      entry.addEventListener('click', () => {
        entry.classList.toggle('is-open');
      });
    });
  }

  /* ---- Areas of Focus: kiosk interaction --------------------
     Tab strip switches which .kiosk-card is staged. Click any
     tab, or use ←/→ / Home / End when the tablist has focus. */
  const kiosk = $('.focus-kiosk');
  if (kiosk) {
    const tabs = $$('.kiosk-tab', kiosk);
    const cards = $$('.kiosk-card', kiosk);
    const activate = (idx, { focusTab = false } = {}) => {
      tabs.forEach((t, i) => {
        const active = i === idx;
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.setAttribute('tabindex', active ? '0' : '-1');
        if (active && focusTab) t.focus();
      });
      cards.forEach((c, i) => c.classList.toggle('is-active', i === idx));
    };
    activate(0);
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => activate(i));
    });
    /* Roving-tabindex keyboard navigation on the tablist. */
    kiosk.querySelector('.kiosk-strip').addEventListener('keydown', (e) => {
      const current = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      if (current < 0) return;
      let next = current;
      if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault();
      activate(next, { focusTab: true });
    });
  }

  /* ---- Magnetic CTAs (desktop only) -------------------------- */
  if (!touch && !reduce) {
    $$('.btn.magnetic').forEach(btn => {
      addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const d = Math.hypot(dx, dy);
        if (d < 96) {
          const f = (1 - d / 96) * 8;
          btn.style.transform = `translate(${dx / d * f}px, ${dy / d * f}px)`;
        } else btn.style.transform = '';
      });
      btn.addEventListener('mouseleave', () => btn.style.transform = '');
    });
  }

  /* ---- Contact form (client-side only) ----------------------- */
  const form = $('.send-form');
  if (form) {
    const status = $('.form-status', form);
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      $$('.field', form).forEach(f => {
        const inp = $('input, textarea', f);
        const bad = !inp.value.trim() ||
                    (inp.type === 'email' && !/.+@.+\..+/.test(inp.value));
        f.classList.toggle('invalid', bad);
        if (bad) {
          ok = false;
          inp.setAttribute('aria-invalid', 'true');
        } else {
          inp.removeAttribute('aria-invalid');
        }
      });
      if (ok && status) {
        const name = $('#f-name', form).value.trim();
        const email = $('#f-email', form).value.trim();
        const msg = $('#f-msg', form).value.trim();
        const subject = encodeURIComponent(`Portfolio — message from ${name}`);
        const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
        status.textContent = 'Opening your mail client…';
        window.location.href = `mailto:akzmibrahim@gmail.com?subject=${subject}&body=${body}`;
        setTimeout(() => {
          status.textContent = 'If your mail client did not open, email akzmibrahim@gmail.com directly.';
        }, 600);
      } else if (status) {
        status.textContent = 'Please fill in the highlighted fields.';
      }
    });
  }
})();
