// Navigation, Seitenaufbau, Zufallsaufgaben und Selbsttest
const $ = s => document.querySelector(s);

// Routen: #/  ·  #/bf  ·  #/bf/III (Kapitel aufgeklappt)  ·  #/bf/III/3 (Thema)
function route() {
  const [kurs, kap, thema] = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  document.body.dataset.kurs = kurs || '';
  const sw = $('#switch');
  sw.hidden = !kurs;
  if (kurs) { const o = kurs === 'bf' ? 'lk' : 'bf'; sw.textContent = 'Zum ' + KURSE[o].name; sw.href = '#/' + o; }
  $('#main').innerHTML = !KURSE[kurs] ? start() : thema ? themaSeite(kurs, kap, thema) : kursSeite(kurs, kap);
  $('#main').style.animation = 'none'; $('#main').offsetHeight; $('#main').style.animation = '';
  if (thema || !kap) window.scrollTo(0, 0);
}

function start() {
  const n = k => KURSE[k].kapitel.reduce((s, c) => s + c.u.length, 0);
  return `<div class="held" style="margin-top:var(--sp-9)"><h1>Mathematik in der Kursstufe</h1>
    <p>Wähle deinen Kurs. Die Themen folgen dem Aufbau deines Schulbuchs.</p></div>
    <div class="choose">
      ${['bf', 'lk'].map(k => `<a class="${k}" href="#/${k}"><b>${KURSE[k].name}</b>
        <span>${KURSE[k].kapitel.length} Kapitel · ${n(k)} Themen</span></a>`).join('')}
    </div>`;
}

function kursSeite(kurs, offen) {
  let last = '';
  const rows = KURSE[kurs].kapitel.map(c => {
    const b = BEREICHE[c.bereich];
    const head = c.bereich !== last ? `<div class="bereich"><i style="background:${b.farbe}"></i>${b.name}</div>` : '';
    last = c.bereich;
    const open = c.nr === offen;
    return `${head}<div class="kap ${open ? 'open' : ''}">
      <a href="#/${kurs}${open ? '' : '/' + c.nr}"><span class="nr">${c.nr}</span><span class="t">${c.titel}</span>
        <span class="n">${c.u.length} Themen</span><span class="chev">›</span></a>
      <ul class="units">
        ${c.u.map((t, i) => `<li><a href="#/${kurs}/${c.nr}/${i + 1}"><b>${i + 1}</b>${t}</a></li>`).join('')}
      </ul></div>`;
  }).join('');
  return `<div class="crumb"><a href="#/">Start</a></div>
    <div class="held"><h1>${KURSE[kurs].name}</h1><p>Kapitel antippen, um die Themen zu sehen.</p></div>${rows}`;
}

function themaSeite(kurs, kapNr, thema) {
  const c = KURSE[kurs].kapitel.find(c => c.nr === kapNr);
  const i = parseInt(thema) - 1;
  const titel = c && c.u[i];
  if (!titel) return kursSeite(kurs, kapNr);
  const g = gegenstueck(kurs, titel);
  const nav = (j, lbl) => c.u[j] ? `<a href="#/${kurs}/${c.nr}/${j + 1}"><small>${lbl}</small><b>${c.u[j]}</b></a>` : '<span></span>';
  return `<div class="crumb"><a href="#/">Start</a> / <a href="#/${kurs}">${KURSE[kurs].name}</a> / <a href="#/${kurs}/${c.nr}">${c.nr} ${c.titel}</a></div>
    <div class="held"><h1>${titel}</h1>
    <div class="meta"><span>Kapitel ${c.nr} · Abschnitt ${i + 1}</span>
      ${g ? `<a href="#/${g.kurs}/${g.kap}/${g.nr}">Auch im ${KURSE[g.kurs].name} →</a>` : ''}</div></div>
    ${INHALTE[titel] ? inhalt(inhaltFuer(titel, kurs), kurs) : `
    <section class="sec">${h2('erklaerung', 'Erklärung')}<p>Noch kein Material – hier kommt dein Input hin.</p></section>
    ${videoSek(null)}
    <section class="sec">${h2('uebungen', 'Übungen')}<p>Noch keine Übungen.</p></section>
    <section class="sec">${h2('test', 'Selbsttest')}<p>Noch kein Kurztest.</p></section>`}
    <div class="pager">${nav(i - 1, '← Zurück')}${nav(i + 1, 'Weiter →')}</div>`;
}

// Inhalt eines Themas für einen Kurs: Felder unter bf bzw. lk ersetzen die gemeinsamen Felder
function inhaltFuer(titel, kurs = document.body.dataset.kurs) {
  const x = INHALTE[titel];
  return x && x[kurs] ? { ...x, ...x[kurs] } : x;
}

// Abschnittsüberschrift mit Symbol (Symbole in css/site.css, .sym[data-sym])
const h2 = (sym, text) => `<h2><span class="sym" data-sym="${sym}" aria-hidden="true"></span>${text}</h2>`;

function inhalt(x, kurs) {
  const fuer = b => !b.kurs || b.kurs === kurs;
  const ue = x.uebungen.filter(fuer);
  return `<p class="intro">${x.kurz}</p>
    <div class="merk"><div class="lbl">Merke</div>${x.merk.zeilen
      ? `<div class="regeln">${x.merk.zeilen.map(([name, f], i) => `<div class="r-name${i ? ' t' : ''}">${name}</div><div class="f${i ? ' t' : ''}">\\(\\displaystyle ${f}\\)</div>`).join('')}</div>`
      : `<div class="f">\\[${x.merk.formel}\\]</div>`}<p>${x.merk.text}</p></div>
    <section class="sec">${h2('erklaerung', 'Erklärung')}<div class="body">
      ${x.erklaerung || ''}
      <p><b>Beispiel:</b> ${x.beispiel.aufgabe}</p>
      <details><summary>Lösung Schritt für Schritt</summary><div class="inner"><ol class="steps">${x.beispiel.schritte.map(s => `<li>${s}</li>`).join('')}</ol></div></details>
      <div class="fehler">${x.fehler}</div></div></section>
    ${x.labor ? laborSek(x.labor) : ''}
    ${videoSek(x.video)}
    <section class="sec">${h2('uebungen', 'Übungen')}
      ${ue.map((u, i) => `<div class="ue"><span class="nr">${i + 1}</span><div>${u.aufgabe}${stufeTag(u.niveau)}${u.kurs === 'lk' ? '<span class="tag-lk">LK</span>' : ''}</div>
        <details><summary>Lösung</summary><div class="inner">${u.loesung}</div></details></div>`).join('')}</section>
    ${x.generator ? `<section class="sec">${h2('weiter', 'Weiter üben')}<p>Zufallsaufgaben – so viele du willst. Stufe wählen, dann „Neue Aufgabe“.</p>
      <div class="gen"><div class="stufen">${[1, 2, 3].map(n => `<button data-stufe="${n}" class="${n === 1 ? 'on' : ''}">${STUFEN[n - 1]}</button>`).join('')}
        <button class="neu" id="neu">Neue Aufgabe ↻</button></div><div id="genAufgabe"></div></div></section>` : ''}
    ${x.pruefen ? `<section class="sec">${h2('pruefen', 'Lösung prüfen')}<p>Eine KI hat gerechnet – sauber aufgeschrieben, aber in jeder Lösung steckt genau ein Fehler. Tippe auf den falschen Schritt.</p>
      ${x.pruefen.map((k, i) => `<div class="ki" data-k="${i}"><div class="ki-kopf"><span class="ki-tag">KI-Lösung</span>${k.aufgabe}</div>
        <ol class="ki-schritte">${k.schritte.map((s, j) => `<li><button data-s="${j}">${s}</button></li>`).join('')}</ol><div class="fb"></div></div>`).join('')}</section>` : ''}
    <section class="sec">${h2('test', 'Selbsttest')}<p>Drei kurze Fragen – du bekommst sofort Rückmeldung. Nichts wird gespeichert.</p>
      ${x.test.map((q, i) => `<div class="q" data-i="${i}"><div class="fr">${q.frage}</div>
        <div class="opts">${q.optionen.map((o, j) => `<button data-j="${j}">${o}</button>`).join('')}</div><div class="fb"></div></div>`).join('')}
      <div class="score" id="score"></div></section>`;
}

function videoSek(v) {
  return `<section class="sec">${h2('video', 'Video')}${v
    ? `<a class="video" href="${v.url}" target="_blank" rel="noopener"><span class="play">▶</span><span><b>${v.titel}</b><small>Öffnet in neuem Tab</small></span></a>`
    : `<div class="video leer"><span class="play">▶</span><span><b>Video folgt</b><small>Platzhalter – Link wird ergänzt</small></span></div>`}</section>`;
}

// Zufallsaufgaben
let stufe = 1;
function neueAufgabe() {
  const box = $('#genAufgabe'); if (!box) return;
  const r = inhaltFuer($('h1').textContent).generator[stufe]();
  box.innerHTML = `<div class="gen-a">\\(${r.aufgabe}\\)</div>
    <details><summary>Lösung</summary><div class="inner"><ol class="steps">${r.schritte.map(s => `<li>\\(${s}\\)</li>`).join('')}</ol></div></details>`;
  typeset(box);
}
document.addEventListener('click', e => {
  const s = e.target.closest('.stufen button[data-stufe]');
  if (s) { stufe = +s.dataset.stufe; document.querySelectorAll('.stufen button[data-stufe]').forEach(b => b.classList.toggle('on', b === s)); neueAufgabe(); }
  if (e.target.closest('#neu')) neueAufgabe();
});

// Lösung prüfen: falschen Schritt suchen
document.addEventListener('click', e => {
  const btn = e.target.closest('.ki-schritte button');
  if (!btn || btn.disabled) return;
  const kEl = btn.closest('.ki'), k = inhaltFuer($('h1').textContent).pruefen[kEl.dataset.k];
  if (+btn.dataset.s !== k.fehler) { btn.classList.add('ok'); btn.disabled = true; kEl.querySelector('.fb').textContent = 'Dieser Schritt stimmt – such weiter.'; return; }
  btn.classList.add('no');
  kEl.querySelectorAll('.ki-schritte button').forEach(b => b.disabled = true);
  kEl.querySelector('.fb').innerHTML = '✓ Gefunden! ' + k.erklaerung;
  typeset(kEl.querySelector('.fb'));
});

// Selbsttest: Klick auswerten
document.addEventListener('click', e => {
  const btn = e.target.closest('.opts button');
  if (!btn) return;
  const qEl = btn.closest('.q'), titel = $('h1').textContent, q = inhaltFuer(titel).test[qEl.dataset.i];
  const ok = +btn.dataset.j === q.richtig;
  qEl.querySelectorAll('button').forEach(b => { b.disabled = true; if (+b.dataset.j === q.richtig) b.classList.add('ok'); });
  if (!ok) btn.classList.add('no');
  qEl.dataset.ok = ok;
  qEl.querySelector('.fb').innerHTML = (ok ? '✓ Richtig. ' : '✗ Leider nicht. ') + q.erklaerung;
  typeset(qEl);
  const done = document.querySelectorAll('.q[data-ok]');
  if (done.length === inhaltFuer(titel).test.length)
    $('#score').textContent = `${[...done].filter(d => d.dataset.ok === 'true').length} von ${done.length} richtig.`;
});

function typeset(el) { return window.MathJax && MathJax.typesetPromise ? MathJax.typesetPromise([el]) : Promise.resolve(); }

// Merkformeln, die auf schmalen Bildschirmen zu breit sind, verkleinern (höchstens auf 70 %)
function passend() {
  document.querySelectorAll('.merk .f').forEach(f => {
    f.style.fontSize = '';
    const r = f.clientWidth / f.scrollWidth;
    if (r < 1) f.style.fontSize = Math.max(r, .7) * parseFloat(getComputedStyle(f).fontSize) + 'px';
  });
}
addEventListener('resize', passend);
// Leiste „Auf dieser Seite“ auf Themenseiten (sichtbar ab 1100 px): ein Eintrag je Abschnitt, mit Symbol
function seitenNav() {
  const main = $('#main'), teile = [...main.querySelectorAll('.merk, .sec')];
  main.classList.toggle('mit-nav', !!main.querySelector('.held .meta'));
  if (!main.classList.contains('mit-nav')) return;
  teile.forEach((t, i) => t.id = 'teil' + i);
  const eintrag = (t, i) => {
    const h = t.querySelector('h2');
    return `<button data-teil="teil${i}">${h ? h.querySelector('.sym').outerHTML + h.textContent : '<span class="sym" data-sym="merke"></span>Merke'}</button>`;
  };
  main.insertAdjacentHTML('afterbegin', `<nav class="seitennav" aria-label="Auf dieser Seite"><b>Auf dieser Seite</b>${teile.map(eintrag).join('')}</nav>`);
}
document.addEventListener('click', e => {
  const b = e.target.closest('.seitennav button');
  if (b) document.getElementById(b.dataset.teil).scrollIntoView({ behavior: 'smooth', block: 'start' });
});
// Beim Scrollen den Abschnitt markieren, in dem man gerade ist
addEventListener('scroll', () => {
  const nav = $('.seitennav'); if (!nav || !nav.offsetParent) return;
  let aktiv;
  for (const b of nav.querySelectorAll('button')) if (document.getElementById(b.dataset.teil).getBoundingClientRect().top < 160) aktiv = b;
  nav.querySelectorAll('button').forEach(b => b.classList.toggle('aktiv', b === aktiv));
}, { passive: true });

const _route = route;
route = function () { stufe = 1; _route(); seitenNav(); neueAufgabe(); laborStart(); typeset($('#main')).then(passend); };

function themeToggle() {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  r.dataset.theme = dark ? 'light' : 'dark';
}

addEventListener('hashchange', route);
route();
