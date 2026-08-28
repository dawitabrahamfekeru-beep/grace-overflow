/* ==========================================================================
   GRACE OVERFLOW CHURCH — Application layer
   No framework, no build step, no dependencies. Ships as-is to any static host.
   ========================================================================== */
(function () {
  'use strict';

  var S = window.SITE;
  var T = S.t;
  var LANGS = ['ti', 'am', 'en'];
  var LS = { lang: 'go.lang', low: 'go.lowdata', theme: 'go.theme' };

  /* Africa/Kampala is UTC+3 year-round with no daylight saving, so all
     service-time maths can be done as fixed-offset UTC arithmetic. */
  var EAT = 3 * 60 * 60 * 1000;

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); }
    catch (e) { return null; }
  }

  /* ======================================================================
     1. LANGUAGE
     ====================================================================== */
  function pickLang() {
    var saved = store(LS.lang);
    if (saved && LANGS.indexOf(saved) > -1) return saved;
    var q = new URLSearchParams(location.search).get('lang');
    if (q && LANGS.indexOf(q) > -1) return q;
    /* Deliberately NOT falling back to navigator.language for English.
       This congregation is Tigrinya-speaking but almost all of them carry
       English-configured phones, so honouring Accept-Language would serve
       English to nearly everyone and defeat the point of the site. Tigrinya
       is the default; the switcher sits in the header and the hero carries an
       English line under the Ge'ez, so an English reader sees the way out
       within a second. */
    var nav = (navigator.languages || [navigator.language || 'ti']).join(',').toLowerCase();
    if (/(^|,)am\b/.test(nav)) return 'am';
    return 'ti';
  }

  var lang = pickLang();

  function tr(key) {
    var e = T[key];
    if (!e) return key;
    return e[lang] || e.en || key;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    store(LS.lang, lang);

    $$('[data-i18n]').forEach(function (el) {
      el.textContent = tr(el.getAttribute('data-i18n'));
    });
    $$('[data-i18n-ph]').forEach(function (el) {
      el.placeholder = tr(el.getAttribute('data-i18n-ph'));
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', tr(el.getAttribute('data-i18n-aria')));
    });

    $$('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });

    renderServices();
    renderSermons();
    renderStatus();
    renderHubs();
    renderGiving();
  }

  /* ======================================================================
     2. SERVICE TIME ENGINE
     ====================================================================== */
  function eatNow(ms) {
    var d = new Date(ms + EAT);
    return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), dow: d.getUTCDay() };
  }
  function eatToUtc(y, m, d, hhmm) {
    var p = hhmm.split(':');
    return Date.UTC(y, m, d, +p[0], +p[1]) - EAT;
  }

  /* Returns {svc, startUtc, endUtc, isLive} for whichever gathering is
     happening now, or the next one due. */
  function nextService(now) {
    now = now || Date.now();
    var e = eatNow(now);
    var best = null;

    S.services.forEach(function (svc) {
      // look across today and the next 8 days to wrap the week cleanly
      for (var i = 0; i <= 8; i++) {
        var day = new Date(Date.UTC(e.y, e.m, e.d + i));
        if (day.getUTCDay() !== svc.dow) continue;
        var start = eatToUtc(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), svc.start);
        var end = eatToUtc(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), svc.end);
        if (end < now) continue;
        var cand = { svc: svc, startUtc: start, endUtc: end, isLive: now >= start && now <= end };
        if (!best || cand.startUtc < best.startUtc || (cand.isLive && !best.isLive)) best = cand;
        break;
      }
    });
    return best;
  }

  var userTz = '';
  try { userTz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  var isLocal = userTz === 'Africa/Kampala' || userTz === 'Africa/Nairobi';

  function fmtLocal(ms, opts) {
    try {
      return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : (lang === 'am' ? 'am-ET' : 'ti-ER'),
        opts || { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(ms));
    } catch (e) {
      return new Date(ms).toLocaleString();
    }
  }

  /* ---- Status bar: LIVE NOW, or a countdown ---- */
  function renderStatus() {
    var bar = $('#statusbar');
    if (!bar) return;
    var n = nextService();
    if (!n) { bar.hidden = true; return; }

    bar.classList.toggle('is-live', n.isLive);
    var label = $('#statusLabel');
    var link = $('#statusLink');

    if (n.isLive) {
      label.textContent = tr('live.now');
      link.textContent = tr('live.join');
      link.hidden = false;
    } else {
      label.textContent = tr('live.next') + ' · ' + tr(n.svc.key) + ' · ' + fmtLocal(n.startUtc);
      link.textContent = tr('cta.watchlive');
      link.hidden = false;
    }

    syncMarquee();
  }

  /* Marquee.

     Two copies is not enough: on a wide screen one copy of the message is
     narrower than the bar, so a -50% slide would leave the strip visibly empty
     for part of every cycle. Instead we lay down however many copies it takes
     to cover the bar (k), then double that. Sliding -50% then travels exactly
     k copies, which lands on a copy boundary, so the loop has no visible seam
     at any width or in any language.

     Duration is derived from the distance rather than fixed, so the text moves
     at a constant readable speed whether the message is short English or long
     Tigrinya. The clones are rebuilt on every render and on resize, so they can
     never fall out of sync with the language or the live state. */
  var MARQUEE_PX_PER_SEC = 55;

  function syncMarquee() {
    var bar = $('#statusbar');
    var track = $('#statusTrack');
    if (!bar || !track) return;
    var original = $('.statusbar__in', track);
    if (!original) return;

    $$('.statusbar__in.is-clone', track).forEach(function (c) { c.remove(); });

    var copyW = original.offsetWidth;
    var barW = bar.clientWidth;
    if (!copyW) return;

    var k = Math.max(1, Math.ceil(barW / copyW));
    var total = k * 2;

    for (var i = 1; i < total; i++) {
      var clone = original.cloneNode(true);
      clone.classList.add('is-clone');
      clone.setAttribute('aria-hidden', 'true');
      // duplicate ids would break getElementById, and the copies are decorative
      $$('[id]', clone).forEach(function (el) { el.removeAttribute('id'); });
      // keep the copies out of the tab order — it is the same link repeated
      $$('a', clone).forEach(function (a) { a.setAttribute('tabindex', '-1'); });
      track.appendChild(clone);
    }

    track.style.animationDuration = Math.max(8, Math.round((k * copyW) / MARQUEE_PX_PER_SEC)) + 's';
  }

  /* ---- Countdown tiles ---- */
  function renderCountdown() {
    var box = $('#countdown');
    if (!box) return;
    var n = nextService();
    if (!n) return;
    var diff = Math.max(0, n.startUtc - Date.now());
    var d = Math.floor(diff / 864e5);
    var h = Math.floor(diff / 36e5) % 24;
    var m = Math.floor(diff / 6e4) % 60;
    var s = Math.floor(diff / 1e3) % 60;
    var parts = [[d, 'D'], [h, 'H'], [m, 'M'], [s, 'S']];
    box.innerHTML = parts.map(function (p) {
      return '<div><b>' + String(p[0]).padStart(2, '0') + '</b><span>' + p[1] + '</span></div>';
    }).join('');
    box.hidden = n.isLive;
  }

  /* ---- Weekly schedule cards ---- */
  function renderServices() {
    var box = $('#services');
    if (!box) return;
    var n = nextService();

    box.innerHTML = S.services.map(function (svc) {
      var isNext = n && n.svc.id === svc.id;
      // build the next date for this specific service, for local conversion
      var e = eatNow(Date.now());
      var target = null;
      for (var i = 0; i <= 8; i++) {
        var day = new Date(Date.UTC(e.y, e.m, e.d + i));
        if (day.getUTCDay() === svc.dow) {
          target = eatToUtc(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), svc.start);
          break;
        }
      }
      var dayShort = fmtLocal(target, { weekday: 'short' });
      var dayNum = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new Date(target));

      var localPill = '';
      if (!isLocal && target) {
        localPill = '<span class="timecard__local">🌍 ' + tr('svc.yourtime') + ' · ' +
          fmtLocal(target, { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }) + '</span>';
      }

      return '<div class="timecard' + (isNext ? ' is-next' : '') + '">' +
        '<div class="timecard__day"><b>' + dayNum + '</b><span>' + dayShort + '</span></div>' +
        '<div class="timecard__body">' +
          '<div class="timecard__name">' + tr(svc.key) + '</div>' +
          '<div class="timecard__meta">' + svc.start + '–' + svc.end + ' ' + tr('svc.eat') +
            ' · ' + tr('svc.inperson') + '</div>' +
          localPill +
        '</div></div>';
    }).join('');

    var note = $('#tzNote');
    if (note) note.hidden = isLocal;
  }

  /* ---- Diaspora hub clocks ---- */
  function renderHubs() {
    var box = $('#hubs');
    if (!box) return;
    box.innerHTML = S.hubs.map(function (h) {
      var time = '--:--';
      try {
        time = new Intl.DateTimeFormat('en-GB', {
          timeZone: h.tz, hour: '2-digit', minute: '2-digit', hour12: false
        }).format(new Date());
      } catch (e) {}
      return '<div class="clock">' +
        '<span class="clock__flag">' + h.flag + '</span>' +
        '<div style="min-width:0;text-align:left">' +
          '<div class="clock__label">' + tr('clock.label') + '</div>' +
          '<div class="clock__time">' + time + '</div>' +
        '</div></div>';
    }).join('');
  }

  /* ======================================================================
     3. SERMON ARCHIVE
     ====================================================================== */
  var filter = 'all';
  var query = '';

  function renderSermons() {
    var box = $('#sermons');
    if (!box) return;
    var limit = parseInt(box.dataset.limit || '0', 10);

    var list = S.sermons.filter(function (v) {
      if (filter !== 'all' && v.series !== filter) return false;
      if (!query) return true;
      var hay = (v.title.ti + ' ' + v.title.am + ' ' + v.title.en + ' ' + (v.ref || '')).toLowerCase();
      return hay.indexOf(query.toLowerCase()) > -1;
    });
    if (limit) list = list.slice(0, limit);

    var empty = $('#sermonsEmpty');
    if (empty) empty.hidden = list.length > 0;

    box.innerHTML = list.map(function (v) {
      var title = v.title[lang] || v.title.en;
      var date = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'en-GB',
        { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(v.date));
      var badge = v.live ? '<span class="sermon__badge">● LIVE</span>' : '';
      return '<article class="sermon">' +
        '<a href="' + S.church.youtube + '" target="_blank" rel="noopener" class="sermon__thumb" aria-hidden="true">' +
          badge + v.glyph + '</a>' +
        '<div class="sermon__body">' +
          '<h3 class="sermon__title"><a href="' + S.church.youtube + '" target="_blank" rel="noopener">' + title + '</a></h3>' +
          (v.ref ? '<p class="small muted geez" style="margin:0">' + v.ref + '</p>' : '') +
          '<p class="sermon__meta">' + date + ' · ' + v.views + ' ' + tr('watch.views') + '</p>' +
        '</div></article>';
    }).join('');
  }

  /* ======================================================================
     4. GIVING
     ====================================================================== */
  var CUR = {
    UGX: { sym: 'UGX', amounts: [10000, 20000, 50000, 100000, 200000], rail: 'momo' },
    GBP: { sym: '£',   amounts: [10, 25, 50, 100, 250],  rail: 'card' },
    EUR: { sym: '€',   amounts: [10, 25, 50, 100, 250],  rail: 'card' },
    USD: { sym: '$',   amounts: [10, 25, 50, 100, 250],  rail: 'card' },
    CAD: { sym: 'C$',  amounts: [15, 30, 60, 120, 300],  rail: 'card' },
    AED: { sym: 'AED', amounts: [50, 100, 250, 500, 1000], rail: 'card' },
    ILS: { sym: '₪',   amounts: [50, 100, 200, 400, 800], rail: 'card' }
  };

  function detectCurrency() {
    if (/Kampala|Nairobi|Dar_es_Salaam/.test(userTz)) return 'UGX';
    if (/London|Dublin/.test(userTz)) return 'GBP';
    if (/Jerusalem|Tel_Aviv/.test(userTz)) return 'ILS';
    if (/Dubai|Qatar|Riyadh/.test(userTz)) return 'AED';
    if (/^Europe\//.test(userTz)) return 'EUR';
    if (/Toronto|Vancouver|Edmonton|Winnipeg|Halifax/.test(userTz)) return 'CAD';
    if (/^America\//.test(userTz)) return 'USD';
    return 'USD';
  }

  var give = { cur: detectCurrency(), amount: null, freq: 'once', fund: 'tithe' };

  function renderGiving() {
    var box = $('#giveAmounts');
    if (!box) return;
    var c = CUR[give.cur];

    // Rails reflect where the giver actually is
    $$('.rail').forEach(function (r) {
      r.setAttribute('aria-pressed', String(r.dataset.rail === c.rail));
    });

    var sel = $('#giveCurrency');
    if (sel && sel.value !== give.cur) sel.value = give.cur;

    box.innerHTML = c.amounts.map(function (a) {
      var label = give.cur === 'UGX'
        ? c.sym + ' ' + new Intl.NumberFormat('en').format(a)
        : c.sym + new Intl.NumberFormat('en').format(a);
      return '<button type="button" class="amount" data-amount="' + a + '" aria-pressed="' +
        (give.amount === a) + '">' + label + '</button>';
    }).join('');

    $$('#giveAmounts .amount').forEach(function (b) {
      b.addEventListener('click', function () {
        give.amount = +b.dataset.amount;
        var custom = $('#giveCustom');
        if (custom) custom.value = '';
        renderGiving();
      });
    });

    $$('[data-freq]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.freq === give.freq)); });
    $$('[data-fund]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.fund === give.fund)); });
  }

  function bindGiving() {
    if (!$('#giveAmounts')) return;

    var sel = $('#giveCurrency');
    if (sel) sel.addEventListener('change', function () { give.cur = sel.value; give.amount = null; renderGiving(); });

    $$('.rail').forEach(function (r) {
      r.addEventListener('click', function () {
        // Choosing a rail implies a currency family
        give.cur = r.dataset.rail === 'momo' ? 'UGX' : (give.cur === 'UGX' ? 'GBP' : give.cur);
        give.amount = null;
        renderGiving();
      });
    });

    $$('[data-freq]').forEach(function (b) {
      b.addEventListener('click', function () { give.freq = b.dataset.freq; renderGiving(); });
    });
    $$('[data-fund]').forEach(function (b) {
      b.addEventListener('click', function () { give.fund = b.dataset.fund; renderGiving(); });
    });

    var custom = $('#giveCustom');
    if (custom) custom.addEventListener('input', function () {
      give.amount = custom.value ? +custom.value : null;
      $$('#giveAmounts .amount').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    });
  }

  /* ======================================================================
     5. CHROME — header, menu, reveal, low-data
     ====================================================================== */
  function bindChrome() {
    var header = $('.header');
    var nav = $('#nav');
    var burger = $('#burger');

    if (header) {
      var onScroll = function () { header.classList.toggle("is-stuck", window.scrollY > 8); };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!open));
        nav.classList.toggle('is-open', !open);
      });
      $$('a', nav).forEach(function (a) {
        a.addEventListener('click', function () {
          burger.setAttribute('aria-expanded', 'false');
          nav.classList.remove('is-open');
        });
      });
    }

    $$('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { lang = b.dataset.lang; applyLang(); });
    });

    /* Theme. No stored preference means "follow the device", which is the
       right default — nobody should have to opt in to a dark screen at 23:00.
       Clicking only ever sets an explicit light or dark override. */
    var themeBtn = $('#theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        var current = document.documentElement.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        store(LS.theme, next);
      });
    }

    // Low-data mode — a real feature in a market where data is expensive
    var low = store(LS.low) === '1';
    document.body.classList.toggle('lowdata', low);
    var toggle = $('#lowdata');
    if (toggle) {
      toggle.checked = low;
      toggle.addEventListener('change', function () {
        document.body.classList.toggle('lowdata', toggle.checked);
        store(LS.low, toggle.checked ? '1' : '0');
      });
    }

    // Reveal
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
      $$('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    }

    // Sermon filters + search
    $$('.chip[data-filter]').forEach(function (c) {
      c.addEventListener('click', function () {
        filter = c.dataset.filter;
        $$('.chip[data-filter]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
        renderSermons();
      });
    });
    var search = $('#sermonSearch');
    if (search) search.addEventListener('input', function () { query = search.value; renderSermons(); });

    // Anonymous prayer toggle hides the identity fields entirely
    var anon = $('#prayAnon');
    if (anon) {
      var idFields = $('#prayIdentity');
      var sync = function () { if (idFields) idFields.hidden = anon.checked; };
      anon.addEventListener('change', sync);
      sync();
    }

    // Demo form handling — nothing is transmitted anywhere
    $$('form[data-demo]').forEach(function (f) {
      f.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var out = $('.form-result', f);
        if (out) { out.hidden = false; out.textContent = f.dataset.demo; }
        f.querySelectorAll('input, textarea').forEach(function (i) {
          if (i.type !== 'checkbox') i.value = '';
        });
      });
    });
  }

  /* ======================================================================
     6. FILL CONTACT FACTS
     ====================================================================== */
  function fillFacts() {
    $$('[data-fact]').forEach(function (el) {
      var v = S.church[el.dataset.fact];
      if (!v) return;
      if (el.tagName === 'A') {
        if (el.dataset.fact === 'phone') el.href = 'tel:' + v.replace(/\s/g, '');
        else if (el.dataset.fact === 'email') el.href = 'mailto:' + v;
        else el.href = v;
      }
      /* A bare `data-fact-href` attribute yields "" in dataset, which is falsy —
         so the old truthiness check overwrote the social icons with raw URLs.
         Test for the key's presence instead. */
      if (!('factHref' in el.dataset)) el.textContent = v;
    });
    $$('[data-wa]').forEach(function (el) {
      el.href = 'https://wa.me/' + S.church.whatsapp;
    });
    var yr = $('#year');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  function init() {
    fillFacts();
    bindChrome();
    bindGiving();
    applyLang();
    renderCountdown();
    setInterval(renderCountdown, 1000);

    // copy count depends on bar width, so rebuild when the viewport changes
    var rz;
    window.addEventListener('resize', function () {
      clearTimeout(rz);
      rz = setTimeout(syncMarquee, 150);
    });

    /* The copy count is derived from measured text width, and text measured
       before the Ge'ez webfonts arrive is the wrong width — which produced too
       few copies and left a visible gap in the strip. Re-measure once the fonts
       are actually in, with a timeout fallback for browsers without the API. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncMarquee).catch(function () {});
    }
    setTimeout(syncMarquee, 600);
    setInterval(function () { renderStatus(); renderHubs(); }, 30000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
