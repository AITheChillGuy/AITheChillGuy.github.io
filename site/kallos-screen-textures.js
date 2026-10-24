/* Local sample-state previews for the WebGL device screens. The usable app stays HTML. */
(() => {
  'use strict';
  const scriptURL = document.currentScript && document.currentScript.src;
  const assets = new URL('assets/products/', scriptURL || document.baseURI);
  const bindings = new WeakMap();
  const colors = {
    background: '#0d0e11', surface: '#17191e', ink: '#f7f8f8',
    muted: '#b4bac1', accent: '#69b2c8', accentInk: '#10232c', soft: '#21333c'
  };
  const labels = {
    en: {
      sample: 'SAMPLE DATA', title: 'Your gym, today.', staff: 'Staff workspace',
      sessions: 'Sessions', booked: 'Booked places', checked: 'Checked in', available: 'Available',
      today: 'The day at a glance', upcoming: 'Upcoming', reserved: 'Demo member booked',
      attendance: 'Open attendance', empty: 'Choose a day to explore the classes.',
      nextOne: 'Your next', nextTwo: 'session.', choose: 'Choose your next class',
      yourPlace: 'Your place is booked', book: 'Book a place', cancel: 'Cancel demo booking',
      full: 'Class full', note: 'Interactive sample · no real bookings', week: 'Sample week'
    },
    ar: {
      sample: 'بيانات تجريبية', title: 'ناديك اليوم.', staff: 'مساحة الموظفين',
      sessions: 'الحصص', booked: 'الأماكن المحجوزة', checked: 'الحضور', available: 'المتاح',
      today: 'نظرة على اليوم', upcoming: 'قادمة', reserved: 'حجز العضو التجريبي',
      attendance: 'فتح قائمة الحضور', empty: 'اختر يوماً لاستكشاف الحصص.',
      nextOne: 'حصتك', nextTwo: 'القادمة.', choose: 'اختر حصتك القادمة',
      yourPlace: 'تم حجز مكانك', book: 'احجز مكاناً', cancel: 'إلغاء الحجز التجريبي',
      full: 'الحصة مكتملة', note: 'تجربة تفاعلية · بدون حجوزات حقيقية', week: 'أسبوع تجريبي'
    }
  };

  function loadImage(relativePath) {
    return new Promise(resolve => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = async () => {
        try { if (image.decode) await image.decode(); } catch (_) { /* onload succeeded. */ }
        resolve(image);
      };
      image.onerror = () => resolve(null);
      image.src = new URL(relativePath, assets).href;
    });
  }

  const mediaReady = Promise.all([
    loadImage('kallos-light.svg'), loadImage('demo/skills.png')
  ]).then(([logo, art]) => ({logo, art}));

  async function fontsReady() {
    if (!document.fonts) return;
    await Promise.allSettled([
      document.fonts.ready,
      document.fonts.load('400 32px "Kallos Avenir"'),
      document.fonts.load('700 64px "Kallos Avenir"'),
      document.fonts.load('400 32px KallosDemoArabic'),
      document.fonts.load('700 64px KallosDemoArabic')
    ]);
  }

  function font(lang) {
    return lang === 'ar' ? 'KallosDemoArabic, Tahoma, Arial, sans-serif' :
      '"Kallos Avenir", Avenir, Arial, sans-serif';
  }

  function text(ctx, value, x, y, options = {}) {
    const lang = options.lang || 'en';
    const weight = options.weight || 400;
    let size = Math.max(24, options.size || 28);
    let valueText = String(value == null ? '' : value);
    const width = options.width || Infinity;
    ctx.save();
    ctx.direction = lang === 'ar' ? 'rtl' : 'ltr';
    ctx.textAlign = options.align || (lang === 'ar' ? 'right' : 'left');
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = options.color || colors.ink;
    ctx.font = weight + ' ' + size + 'px ' + font(lang);
    while (size > 24 && ctx.measureText(valueText).width > width) {
      size -= 1;
      ctx.font = weight + ' ' + size + 'px ' + font(lang);
    }
    if (ctx.measureText(valueText).width > width) {
      while (valueText.length && ctx.measureText(valueText + '…').width > width) {
        valueText = valueText.slice(0, -1);
      }
      valueText += '…';
    }
    ctx.fillText(valueText, x, y);
    ctx.restore();
  }

  function box(ctx, x, y, width, height, radius, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    const r = Math.min(radius, width / 2, height / 2);
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function contain(ctx, image, x, y, width, height) {
    if (!image || !image.naturalWidth || !image.naturalHeight) return;
    const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
    ctx.drawImage(image, x + (width - w) / 2, y + (height - h) / 2, w, h);
  }

  function number(value, lang) {
    const parsed = Number(value);
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-QA' : 'en-GB')
      .format(Number.isFinite(parsed) ? parsed : 0);
  }

  function dateLabel(value, lang) {
    if (!value) return labels[lang].week;
    if (typeof value === 'string') return value;
    const date = value instanceof Date ? value : new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-QA' : 'en-GB', {
        weekday: 'long', day: 'numeric', month: 'short', timeZone: 'UTC'
      }).format(date);
    }
    return String(value);
  }

  function brand(ctx, media, lang, phone) {
    const width = phone ? 210 : 250, height = phone ? 64 : 76;
    const x = phone ? (lang === 'ar' ? 350 : 40) : (lang === 'ar' ? 1278 : 72);
    if (media.logo) contain(ctx, media.logo, x, 42, width, height);
    else text(ctx, 'KALLOS', x, 95, {size: phone ? 42 : 52, weight: 700, align: 'left'});
    const badgeX = phone ? (lang === 'ar' ? 40 : 390) : (lang === 'ar' ? 72 : 1248);
    const badgeWidth = phone ? 170 : 280;
    box(ctx, badgeX, phone ? 55 : 55, badgeWidth, phone ? 42 : 52, 10, colors.soft);
    text(ctx, labels[lang].sample, badgeX + badgeWidth / 2, phone ? 83 : 90, {
      lang, size: phone ? 24 : 26, weight: 700, align: 'center',
      width: badgeWidth - 18, color: '#c7e3ed'
    });
  }

  function progress(ctx, x, y, width, capacity, enrolled) {
    box(ctx, x, y, width, 10, 5, '#333a42');
    const fraction = Number(capacity) > 0 ? Math.max(0, Math.min(1, enrolled / capacity)) : 0;
    if (fraction) box(ctx, x, y, width * fraction, 10, 5, colors.accent);
  }

  function paintLaptop(ctx, snapshot, media) {
    const lang = snapshot.lang === 'ar' ? 'ar' : 'en', ar = lang === 'ar';
    const t = labels[lang], counts = snapshot.counts || {};
    const entry = Array.isArray(snapshot.classes) ? snapshot.classes[0] : null;
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, 1600, 1000);
    brand(ctx, media, lang, false);
    const start = ar ? 1528 : 72;
    text(ctx, dateLabel(snapshot.date, lang), start, 191, {
      lang, size: 30, color: colors.muted, width: 1300
    });
    text(ctx, t.title, start, 280, {lang, size: 76, weight: 700, width: 1400});
    text(ctx, t.staff, start, 330, {lang, size: 32, color: colors.muted, width: 1400});
    ['sessions', 'booked', 'checked', 'available'].forEach((key, i) => {
      const x = ar ? 1528 - i * 370 : 72 + i * 370;
      text(ctx, t[key], x, 418, {lang, size: 30, color: colors.muted, width: 330});
      text(ctx, number(counts[key], lang), x, 496, {lang, size: 76, weight: 700, width: 330});
    });
    text(ctx, t.today, start, 577, {lang, size: 38, weight: 700, width: 1400});
    box(ctx, 64, 609, 1472, 316, 22, colors.surface);
    if (!entry) {
      text(ctx, t.empty, 800, 780, {lang, size: 40, align: 'center', width: 1280});
    } else {
      const artX = ar ? 1300 : 90, bodyX = ar ? 1254 : 350;
      contain(ctx, media.art, artX, 641, 210, 250);
      text(ctx, entry.booked ? t.reserved : t.upcoming, bodyX, 669, {
        lang, size: 28, color: entry.booked ? colors.accent : colors.muted, width: 700
      });
      text(ctx, entry.title, bodyX, 745, {lang, size: 64, weight: 700, width: 700});
      text(ctx, String(entry.time || '') + ' — ' + String(entry.end || ''), bodyX, 804, {
        lang, size: 34, weight: 700, color: colors.accent, width: 700
      });
      const capX = ar ? 96 : 1176, capWidth = 264;
      text(ctx, t.booked, capX + capWidth / 2, 680, {
        lang, size: 28, color: colors.muted, align: 'center', width: capWidth
      });
      text(ctx, number(entry.enrolled, lang) + ' / ' + number(entry.capacity, lang),
        capX + capWidth / 2, 754, {lang, size: 57, weight: 700, align: 'center', width: capWidth});
      progress(ctx, capX, 786, capWidth, entry.capacity, entry.enrolled);
      box(ctx, capX, 832, capWidth, 62, 10, colors.accent);
      text(ctx, t.attendance, capX + capWidth / 2, 872, {
        lang, size: 27, weight: 700, align: 'center', width: capWidth - 18, color: colors.accentInk
      });
    }
    text(ctx, t.note, 800, 966, {
      lang, size: 26, align: 'center', width: 1450, color: colors.muted
    });
  }

  function paintPhone(ctx, snapshot, media) {
    const lang = snapshot.lang === 'ar' ? 'ar' : 'en', ar = lang === 'ar';
    const t = labels[lang], entry = Array.isArray(snapshot.classes) ? snapshot.classes[0] : null;
    const start = ar ? 560 : 40;
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, 600, 1280);
    brand(ctx, media, lang, true);
    text(ctx, t.nextOne, start, 205, {lang, size: 66, weight: 700, width: 520});
    text(ctx, t.nextTwo, start, 275, {lang, size: 66, weight: 700, width: 520});
    text(ctx, dateLabel(snapshot.date, lang), start, 326, {
      lang, size: 28, color: colors.muted, width: 520
    });
    box(ctx, 40, 361, 520, 56, 12, colors.soft);
    text(ctx, entry && entry.booked ? t.yourPlace : t.choose, 300, 399, {
      lang, size: 28, weight: 700, align: 'center', width: 480, color: '#c7e3ed'
    });
    box(ctx, 40, 449, 520, 278, 20, '#15262d');
    contain(ctx, media.art, 90, 456, 420, 264);
    if (entry) {
      text(ctx, entry.title, start, 812, {lang, size: 58, weight: 700, width: 520});
      text(ctx, String(entry.time || '') + ' — ' + String(entry.end || ''), start, 868, {
        lang, size: 33, weight: 700, width: 520, color: colors.accent
      });
      text(ctx, t.booked, start, 930, {lang, size: 28, color: colors.muted, width: 320});
      text(ctx, number(entry.enrolled, lang) + ' / ' + number(entry.capacity, lang),
        ar ? 40 : 560, 930, {lang, size: 35, weight: 700, align: ar ? 'left' : 'right', width: 160});
      progress(ctx, 40, 954, 520, entry.capacity, entry.enrolled);
      const full = Number(entry.enrolled) >= Number(entry.capacity) && !entry.booked;
      box(ctx, 40, 1010, 520, 82, 14, full ? '#30363d' : colors.accent);
      text(ctx, entry.booked ? t.cancel : full ? t.full : t.book, 300, 1062, {
        lang, size: 32, weight: 700, align: 'center', width: 476,
        color: full ? colors.muted : colors.accentInk
      });
    } else {
      text(ctx, t.empty, 300, 835, {lang, size: 30, align: 'center', width: 520});
    }
    text(ctx, t.note, 300, 1182, {
      lang, size: 26, align: 'center', width: 520, color: colors.muted
    });
  }

  async function bind(viewer) {
    if (bindings.has(viewer)) return bindings.get(viewer);
    const pending = (async () => {
      viewer.dataset.screensReady = 'false';
      if (!viewer.model || typeof viewer.createCanvasTexture !== 'function') {
        throw new Error('Load the device model before binding its screen previews.');
      }
      const [media] = await Promise.all([mediaReady, fontsReady()]);
      const specs = [
        {role: 'staff', material: 'LaptopScreen', width: 1600, height: 1000, paint: paintLaptop},
        {role: 'member', material: 'PhoneScreen', width: 600, height: 1280, paint: paintPhone}
      ];
      const screens = [];
      for (const spec of specs) {
        const material = viewer.model.getMaterialByName(spec.material);
        if (!material) throw new Error('Missing device screen material: ' + spec.material);
        const texture = await viewer.createCanvasTexture();
        const canvas = texture.source.element;
        canvas.width = spec.width;
        canvas.height = spec.height;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('A canvas drawing context is required for device previews.');
        await material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
        // Binding applies the material's original transform; set the canvas UV correction afterwards.
        texture.sampler.setScale({u: 1, v: -1});
        texture.sampler.setOffset({u: 0, v: 1});
        screens.push({...spec, texture, context});
      }
      let disposed = false, updates = 0;
      const metadata = {
        source: 'KallosDemo.snapshot', sampleDataOnly: true, minimumTextPixels: 24,
        uvScale: {u: 1, v: -1}, uvOffset: {u: 0, v: 1},
        screens: specs.map(({role, material, width, height}) => ({role, material, width, height}))
      };
      function update() {
        if (disposed) return;
        if (!window.KallosDemo || typeof window.KallosDemo.snapshot !== 'function') {
          throw new Error('KallosDemo.snapshot must be ready before painting device previews.');
        }
        for (const screen of screens) {
          const snapshot = window.KallosDemo.snapshot(screen.role);
          screen.paint(screen.context, snapshot, media);
          screen.texture.source.update();
        }
        updates += 1;
        viewer.dataset.screenTextureUpdates = String(updates);
        return {updates, ...metadata};
      }
      update();
      viewer.dataset.screensReady = 'true';
      viewer.dataset.screenTextureMetadata = JSON.stringify(metadata);
      document.addEventListener('kallos:demo-change', update);
      return Object.freeze({
        update,
        get metadata() { return {updates, ...metadata}; },
        dispose() {
          disposed = true;
          document.removeEventListener('kallos:demo-change', update);
          bindings.delete(viewer);
          viewer.dataset.screensReady = 'false';
        }
      });
    })();
    bindings.set(viewer, pending);
    try { return await pending; }
    catch (error) { bindings.delete(viewer); throw error; }
  }

  window.KallosScreenTextures = Object.freeze({bind});
})();
