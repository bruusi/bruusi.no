/* Bruusi Holding AS — firespråklig innhold uten byggesteg og uten eksterne kall.
 *
 * Norsk bor kun i index.html: ved lasting snapshottes den norske teksten fra
 * DOM-en, slik at det ikke finnes to kopier som kan komme ut av synk.
 * Oversettelsene under inneholder lenker og settes derfor med innerHTML —
 * trygt her fordi alt er egen, håndskrevet statisk tekst uten brukerinput.
 */
(function () {
  'use strict';

  var SUPPORTED = ['no', 'en', 'de', 'es'];
  var STORAGE_KEY = 'bruusi.lang';

  // Lenker gjenbrukes på tvers av språk, så de defineres ett sted.
  var A = {
    everdeen: '<a href="https://everdeen.no" target="_blank" rel="noopener noreferrer">Everdeen DA</a>',
    surrey: '<a href="https://www.surrey.ac.uk/" target="_blank" rel="noopener noreferrer">University of Surrey</a>',
    adtranz: '<a href="https://en.wikipedia.org/wiki/Adtranz" target="_blank" rel="noopener noreferrer">AdTranz</a>',
    hrm: '<a href="https://cezannehr.com/" target="_blank" rel="noopener noreferrer">HRM Software</a>',
    infocasa: '<a href="https://www.infocasa.com/" target="_blank" rel="noopener noreferrer">InfoCasa</a>',
    proff: function (text) {
      return '<a href="https://proff.no/selskap/bruusi-holding-as/vettre/bedriftsr%C3%A5dgivning/IF8D26D043Z/"' +
        ' target="_blank" rel="noopener noreferrer">' + text + '</a>';
    }
  };

  var dict = {
    no: {}, // fylles fra DOM ved lasting

    en: {
      'skip': 'Skip to content',
      'aria.mainnav': 'Main menu',
      'aria.langnav': 'Language',

      'nav.intro': 'intro', 'nav.erfaring': 'experience', 'nav.reise': 'journey',
      'nav.om': 'about', 'nav.kontakt': 'contact',

      'kicker.intro': '// 01 · intro', 'kicker.erfaring': '// 02 · experience',
      'kicker.reise': '// 03 · formative journey', 'kicker.om': '// 04 · about',
      'kicker.kontakt': '// 05 · contact',

      'title.intro': 'Intro', 'title.erfaring': 'Experience', 'title.reise': 'Formative journey',
      'title.om': 'About', 'title.kontakt': 'Contact',

      'intro.p1': 'Thomas Bruusgaard is a highly experienced software engineer and solution architect with more ' +
        'than 25 years in the industry — a systems thinker who sees the whole rather than the parts. ' +
        'He has been involved in several large projects for companies at home and abroad. Specialist expertise in ' +
        'architecture and development of service-oriented solutions (SOA and event-driven). Passionate about agile ' +
        'development methods and well-established principles such as SOLID. A highly productive and experienced ' +
        'consultant across both Windows and web solutions.',
      'intro.p2': 'Thomas has worked in IT since 1999 and today works as a consultant for ' + A.everdeen +
        '. He is currently tech lead / solution architect at NRK.',

      'erfaring.lead': 'A selection of the clients he has worked with:',
      'erfaring.badge': 'now',

      'reise.lead': 'The road here went through three countries — and four languages.',
      'reise.edu.when': '1995–1999',
      'reise.edu.text': A.surrey + ', Guildford. Electronic and Electrical Engineering — four years, with the third year in industry.',
      'reise.de.when': '1997–1998',
      'reise.de.text': 'The industrial year: 13 months at ABB Daimler Benz (' + A.adtranz + ') in Hennigsdorf. Based in Berlin.',
      'reise.uk.when': '4+ years',
      'reise.uk.text': 'London — ' + A.hrm + ', today Cezanne HR.',
      'reise.es.when': 'then',
      'reise.es.text': 'A year in Madrid, then ' + A.infocasa + ' near Marbella on the Costa del Sol.',
      'reise.no.when': 'today',
      'reise.no.text': 'Back in Norway — working as a consultant ever since.',

      'om.p1': 'You can read more about how ' + A.proff('Bruusi Holding AS is doing here') + '.',
      'kontakt.lead': 'You can find him on LinkedIn:',

      'alt.spring': 'Spring', 'alt.summer': 'Summer', 'alt.autumn': 'Autumn', 'alt.winter': 'Winter',

      'meta.title': 'Bruusi Holding AS',
      'meta.desc': 'About Bruusi Holding AS — Thomas Bruusgaard, technologist and solution architect.',
      'meta.ogdesc': 'Thomas Bruusgaard — technologist and solution architect with more than 25 years of experience.'
    },

    de: {
      'skip': 'Zum Inhalt springen',
      'aria.mainnav': 'Hauptmenü',
      'aria.langnav': 'Sprache',

      'nav.intro': 'intro', 'nav.erfaring': 'erfahrung', 'nav.reise': 'reise',
      'nav.om': 'über', 'nav.kontakt': 'kontakt',

      'kicker.intro': '// 01 · intro', 'kicker.erfaring': '// 02 · erfahrung',
      'kicker.reise': '// 03 · bildungsreise', 'kicker.om': '// 04 · über',
      'kicker.kontakt': '// 05 · kontakt',

      'title.intro': 'Intro', 'title.erfaring': 'Erfahrung', 'title.reise': 'Bildungsreise',
      'title.om': 'Über', 'title.kontakt': 'Kontakt',

      'intro.p1': 'Thomas Bruusgaard ist ein sehr erfahrener Softwareentwickler und Lösungsarchitekt mit über ' +
        '25 Jahren Berufserfahrung — ein Systemdenker, der das Ganze sieht und nicht nur die Einzelteile. ' +
        'Er war an mehreren großen Projekten für Unternehmen im In- und Ausland beteiligt. Schwerpunkte sind Architektur und ' +
        'Entwicklung serviceorientierter Lösungen (SOA und ereignisgesteuert). Er begeistert sich für agile ' +
        'Entwicklungsmethoden und bewährte Prinzipien wie SOLID. Ein äußerst produktiver und erfahrener Berater ' +
        'für Windows- und Weblösungen.',
      'intro.p2': 'Thomas arbeitet seit 1999 in der IT und ist heute als Berater für ' + A.everdeen +
        ' tätig. Derzeit ist er Tech Lead / Lösungsarchitekt beim NRK.',

      'erfaring.lead': 'Eine Auswahl der Kunden, für die er gearbeitet hat:',
      'erfaring.badge': 'jetzt',

      'reise.lead': 'Der Weg hierher führte durch drei Länder — und vier Sprachen.',
      'reise.edu.when': '1995–1999',
      'reise.edu.text': A.surrey + ', Guildford. Electronic and Electrical Engineering — vier Jahre, das dritte davon in der Industrie.',
      'reise.de.when': '1997–1998',
      'reise.de.text': 'Das Industriejahr: 13 Monate bei ABB Daimler Benz (' + A.adtranz + ') in Hennigsdorf. Wohnhaft in Berlin.',
      'reise.uk.when': '4+ Jahre',
      'reise.uk.text': 'London — ' + A.hrm + ', heute Cezanne HR.',
      'reise.es.when': 'danach',
      'reise.es.text': 'Ein Jahr in Madrid, danach ' + A.infocasa + ' bei Marbella an der Costa del Sol.',
      'reise.no.when': 'heute',
      'reise.no.text': 'Zurück in Norwegen — seitdem als Berater tätig.',

      'om.p1': 'Mehr darüber, ' + A.proff('wie es Bruusi Holding AS ergeht') + ', erfährst du hier.',
      'kontakt.lead': 'Du findest ihn auf LinkedIn:',

      'alt.spring': 'Frühling', 'alt.summer': 'Sommer', 'alt.autumn': 'Herbst', 'alt.winter': 'Winter',

      'meta.title': 'Bruusi Holding AS',
      'meta.desc': 'Über Bruusi Holding AS — Thomas Bruusgaard, Technologe und Lösungsarchitekt.',
      'meta.ogdesc': 'Thomas Bruusgaard — Technologe und Lösungsarchitekt mit über 25 Jahren Erfahrung.'
    },

    es: {
      'skip': 'Saltar al contenido',
      'aria.mainnav': 'Menú principal',
      'aria.langnav': 'Idioma',

      'nav.intro': 'intro', 'nav.erfaring': 'experiencia', 'nav.reise': 'viaje',
      'nav.om': 'sobre', 'nav.kontakt': 'contacto',

      'kicker.intro': '// 01 · intro', 'kicker.erfaring': '// 02 · experiencia',
      'kicker.reise': '// 03 · viaje de formación', 'kicker.om': '// 04 · sobre',
      'kicker.kontakt': '// 05 · contacto',

      'title.intro': 'Intro', 'title.erfaring': 'Experiencia', 'title.reise': 'Viaje de formación',
      'title.om': 'Sobre', 'title.kontakt': 'Contacto',

      'intro.p1': 'Thomas Bruusgaard es ingeniero de software y arquitecto de soluciones con más de 25 años de ' +
        'experiencia, con una mirada sistémica que atiende al conjunto y no solo a las partes. ' +
        'Ha participado en varios ' +
        'grandes proyectos para empresas nacionales e internacionales. Especializado en arquitectura y desarrollo ' +
        'de soluciones orientadas a servicios (SOA y basadas en eventos). Apasionado por las metodologías ágiles y ' +
        'por principios consolidados como SOLID. Consultor muy productivo y experimentado tanto en soluciones ' +
        'Windows como web.',
      'intro.p2': 'Thomas trabaja en TI desde 1999 y hoy lo hace como consultor para ' + A.everdeen +
        '. En este momento es tech lead / arquitecto de soluciones en NRK.',

      'erfaring.lead': 'Una selección de los clientes con los que ha trabajado:',
      'erfaring.badge': 'ahora',

      'reise.lead': 'El camino hasta aquí pasó por tres países — y cuatro idiomas.',
      'reise.edu.when': '1995–1999',
      'reise.edu.text': A.surrey + ', Guildford. Electronic and Electrical Engineering — cuatro años, el tercero en la industria.',
      'reise.de.when': '1997–1998',
      'reise.de.text': 'El año en la industria: 13 meses en ABB Daimler Benz (' + A.adtranz + ') en Hennigsdorf. Con residencia en Berlín.',
      'reise.uk.when': '4+ años',
      'reise.uk.text': 'Londres — ' + A.hrm + ', hoy Cezanne HR.',
      'reise.es.when': 'después',
      'reise.es.text': 'Un año en Madrid y después ' + A.infocasa + ', cerca de Marbella, en la Costa del Sol.',
      'reise.no.when': 'hoy',
      'reise.no.text': 'De vuelta en Noruega — trabajando como consultor desde entonces.',

      'om.p1': 'Puedes leer más sobre cómo le va a ' + A.proff('Bruusi Holding AS aquí') + '.',
      'kontakt.lead': 'Puedes encontrarlo en LinkedIn:',

      'alt.spring': 'Primavera', 'alt.summer': 'Verano', 'alt.autumn': 'Otoño', 'alt.winter': 'Invierno',

      'meta.title': 'Bruusi Holding AS',
      'meta.desc': 'Sobre Bruusi Holding AS — Thomas Bruusgaard, tecnólogo y arquitecto de soluciones.',
      'meta.ogdesc': 'Thomas Bruusgaard — tecnólogo y arquitecto de soluciones con más de 25 años de experiencia.'
    }
  };

  /* ---------- Snapshot av norsk fra DOM ---------- */

  function snapshotNorwegian() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      dict.no[el.getAttribute('data-i18n')] = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      dict.no[el.getAttribute('data-i18n-alt')] = el.getAttribute('alt') || '';
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      dict.no[el.getAttribute('data-i18n-label')] = el.getAttribute('aria-label') || '';
    });
    var ogDesc = document.querySelector('meta[property="og:description"]');
    dict.no['meta.title'] = document.title;
    dict.no['meta.desc'] = (document.querySelector('meta[name="description"]') || {}).content || '';
    dict.no['meta.ogdesc'] = ogDesc ? ogDesc.getAttribute('content') : '';
  }

  /* ---------- Deteksjon ---------- */

  function normalize(tag) {
    if (!tag) return null;
    tag = String(tag).toLowerCase();
    if (tag.indexOf('nb') === 0 || tag.indexOf('nn') === 0 || tag.indexOf('no') === 0) return 'no';
    var base = tag.split('-')[0];
    return SUPPORTED.indexOf(base) >= 0 ? base : null;
  }

  function fromQuery() {
    var m = /[?&]lang=([a-zA-Z-]+)/.exec(window.location.search);
    return m ? normalize(m[1]) : null;
  }

  function fromStorage() {
    try { return normalize(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
  }

  function fromNavigator() {
    var list = navigator.languages || (navigator.language ? [navigator.language] : []);
    for (var i = 0; i < list.length; i++) {
      var n = normalize(list[i]);
      if (n) return n;
    }
    return null;
  }

  // Tidssone er kun en reserve når nettleserspråket ikke gir treff.
  var TZ = {
    'Europe/Oslo': 'no',
    'Europe/Berlin': 'de', 'Europe/Vienna': 'de', 'Europe/Zurich': 'de', 'Europe/Busingen': 'de',
    'Europe/Madrid': 'es', 'Atlantic/Canary': 'es', 'Africa/Ceuta': 'es',
    'America/Mexico_City': 'es', 'America/Bogota': 'es', 'America/Lima': 'es',
    'America/Santiago': 'es', 'America/Caracas': 'es', 'America/Montevideo': 'es',
    'America/Guatemala': 'es', 'America/Havana': 'es', 'America/Santo_Domingo': 'es',
    'America/Argentina/Buenos_Aires': 'es',
    'Europe/London': 'en', 'Europe/Dublin': 'en'
  };

  function fromTimeZone() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return TZ[tz] || null;
    } catch (e) { return null; }
  }

  function detect() {
    return fromQuery() || fromStorage() || fromNavigator() || fromTimeZone() || 'en';
  }

  /* ---------- Bruk et språk ---------- */

  function t(lang, key) {
    var table = dict[lang] || {};
    return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : dict.no[key];
  }

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) < 0) lang = 'no';

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t(lang, el.getAttribute('data-i18n'));
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var v = t(lang, el.getAttribute('data-i18n-alt'));
      if (v != null) el.setAttribute('alt', v);
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      var v = t(lang, el.getAttribute('data-i18n-label'));
      if (v != null) el.setAttribute('aria-label', v);
    });

    document.title = t(lang, 'meta.title');
    setMeta('meta[name="description"]', 'content', t(lang, 'meta.desc'));
    setMeta('meta[property="og:title"]', 'content', t(lang, 'meta.title'));
    setMeta('meta[property="og:description"]', 'content', t(lang, 'meta.ogdesc'));

    document.querySelectorAll('.lang-switch a').forEach(function (a) {
      var on = a.getAttribute('data-lang') === lang;
      a.classList.toggle('active', on);
      if (on) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
    });
  }

  function setMeta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el && value != null) el.setAttribute(attr, value);
  }

  /* ---------- Brukerens valg ---------- */

  function choose(lang) {
    if (SUPPORTED.indexOf(lang) < 0) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* privat modus e.l. */ }
    apply(lang);
    // Gjør valget delbart i URL-en, men behold gjeldende seksjon (hash).
    var url = window.location.pathname + '?lang=' + lang + window.location.hash;
    try { history.replaceState(null, '', url); } catch (e) { /* ignorer */ }
  }

  /* ---------- Oppstart ---------- */

  snapshotNorwegian();

  var initial = detect();
  apply(initial);
  // Kom språket fra URL-en, husk det som et aktivt valg.
  if (fromQuery()) { try { localStorage.setItem(STORAGE_KEY, initial); } catch (e) {} }

  // Delegert klikkhåndtering, så den overlever at tekst byttes ut.
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest('.lang-switch a[data-lang], .lang-chip[data-lang]');
    if (!el) return;
    ev.preventDefault();
    choose(el.getAttribute('data-lang'));
  });
})();
