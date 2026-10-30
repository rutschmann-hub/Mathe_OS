// Ausprobieren: eigene Funktion eingeben und Steigung, Monotonie oder Krümmung am Graphen erkunden.
// Im Thema einschalten mit  labor: { modus: 'steigung' | 'monotonie' | 'kruemmung', f: 'x^3-3x' }

// Term wie im Taschenrechner → JS-Funktion. Erlaubt: + - * / ^ ( ), 2x, 0,5x, x², sin cos tan √ sqrt ln exp abs, pi, e
function termFunktion(text) {
  const s = text.replace(/^\s*(f\s*\(\s*x\s*\)|y)\s*=/i, '').replace(/−/g, '-').replace(/[·×]/g, '*')
    .replace(/²/g, '^2').replace(/³/g, '^3').replace(/,/g, '.').toLowerCase();
  const woerter = ['sqrt', 'sin', 'cos', 'tan', 'exp', 'ln', 'abs', 'pi', 'π', '√', 'x', 'e'];
  const tok = [];
  for (let i = 0; i < s.length;) {
    if (/\s/.test(s[i])) { i++; continue; }
    const z = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
    if (z) { tok.push(+z[0]); i += z[0].length; continue; }
    const w = woerter.find(w => s.startsWith(w, i));
    if (w) { tok.push(w); i += w.length; continue; }
    if ('+-*/^()'.includes(s[i])) { tok.push(s[i++]); continue; }
    throw `Unbekanntes Zeichen „${s[i]}“`;
  }
  const F = { sin: Math.sin, cos: Math.cos, tan: Math.tan, sqrt: Math.sqrt, '√': Math.sqrt, exp: Math.exp, ln: Math.log, abs: Math.abs };
  let p = 0;
  const nimm = t => tok[p] === t && ++p;
  function summe() {
    let a = produkt();
    for (;;) {
      const l = a;
      if (nimm('+')) { const r = produkt(); a = x => l(x) + r(x); }
      else if (nimm('-')) { const r = produkt(); a = x => l(x) - r(x); }
      else return a;
    }
  }
  function produkt() {
    let a = vorzeichen();
    for (;;) {
      const l = a, t = tok[p];
      if (nimm('*')) { const r = vorzeichen(); a = x => l(x) * r(x); }
      else if (nimm('/')) { const r = vorzeichen(); a = x => l(x) / r(x); }
      else if (t !== undefined && !'+-*/^)'.includes(t)) { const r = potenz(); a = x => l(x) * r(x); } // 2x, 3(x+1), x sin(x)
      else return a;
    }
  }
  function vorzeichen() {
    if (nimm('-')) { const a = vorzeichen(); return x => -a(x); }
    nimm('+');
    return potenz();
  }
  function potenz() {
    const b = atom();
    if (nimm('^')) { const e = vorzeichen(); return x => Math.pow(b(x), e(x)); }
    return b;
  }
  function atom() {
    const t = tok[p++];
    if (typeof t === 'number') return () => t;
    if (t === 'x') return x => x;
    if (t === 'pi' || t === 'π') return () => Math.PI;
    if (t === 'e') return () => Math.E;
    if (t === '(') { const a = summe(); if (!nimm(')')) throw 'Klammer „)“ fehlt'; return a; }
    if (F[t]) { const g = F[t], a = atom(); return x => g(a(x)); }
    throw t === undefined ? 'Term unvollständig' : `„${t}“ an dieser Stelle unerwartet`;
  }
  const f = summe();
  if (p < tok.length) throw `„${tok[p]}“ an dieser Stelle unerwartet`;
  return f;
}

const LABOR_MODI = { steigung: 'Steigung', monotonie: 'Monotonie', kruemmung: 'Krümmung' };
const LABOR_ART = {
  monotonie: { 1: 'streng monoton steigend', '-1': 'streng monoton fallend', 0: 'konstant' },
  kruemmung: { 1: 'linksgekrümmt', '-1': 'rechtsgekrümmt', 0: 'nicht gekrümmt (Gerade)' },
};

function laborSek({ modus, f }) {
  return `<section class="sec"><h2>Ausprobieren</h2><p>Funktion eingeben, Ansicht wählen und den Punkt mit dem Schieberegler über die x-Achse bewegen.</p>
    <div class="labor" id="labor" data-modus="${modus}" data-w="10">
      <label class="lab-f">\\(f(x) =\\) <input id="labF" value="${f}" spellcheck="false" autocomplete="off" autocapitalize="off"></label>
      <div class="lab-bsp">${['x^2', 'x^3-3x', '0,25x^4-2x^2', 'sin(x)', '√x'].map(b => `<button data-f="${b}">${b}</button>`).join('')}</div>
      <div class="stufen">${Object.entries(LABOR_MODI).map(([m, n]) => `<button data-modus="${m}" class="${m === modus ? 'on' : ''}">${n}</button>`).join('')}</div>
      <div class="stufen lab-zoom"><span>Ausschnitt</span>${[10, 5, 2].map(w => `<button data-w="${w}" class="${w === 10 ? 'on' : ''}">−${w} bis ${w}</button>`).join('')}</div>
      <div id="labGraph"></div>
      <input type="range" id="labX" min="-10" max="10" step="0.05" value="1.5" aria-label="Stelle x₀">
      <div class="lab-info" id="labInfo"></div>
    </div></section>`;
}

// Zahl mit Komma und echtem Minus, höchstens zwei Nachkommastellen
const labZahl = v => String(+(Math.abs(v) < 5e-3 ? 0 : v).toFixed(2)).replace('.', ',').replace('-', '−');
// Vielfaches von π/2 als Text: q = 1 → π/2, q = 2 → π, q = −3 → −3π/2
const labPi = q => (q < 0 ? '−' : '') + (q % 2 ? (Math.abs(q) === 1 ? '' : Math.abs(q)) + 'π/2' : (Math.abs(q) === 2 ? '' : Math.abs(q / 2)) + 'π');

function laborZeichnen() {
  const box = $('#labor'); if (!box) return;
  let f;
  try { f = termFunktion($('#labF').value); }
  catch (e) { $('#labInfo').innerHTML = `<span class="lab-fehler">${e}</span>`; return; }
  const modus = box.dataset.modus, w = +box.dataset.w, x0 = +$('#labX').value;
  const W = $('#labGraph').clientWidth, N = 600;
  const trig = /sin|cos|tan/i.test($('#labF').value);
  // Stellen bei trigonometrischen Funktionen im Bogenmaß, z. B. 3π/2
  const stelleText = x => trig && Math.abs(x / (Math.PI / 2) - Math.round(x / (Math.PI / 2))) < 1e-4 && Math.round(x / (Math.PI / 2)) ? labPi(Math.round(x / (Math.PI / 2))) : labZahl(x);
  const xs = Array.from({ length: N + 1 }, (_, i) => -w + 2 * w * i / N);
  const ok = xs.map(f).filter(isFinite);
  if (!ok.length) { $('#labGraph').innerHTML = ''; $('#labInfo').innerHTML = '<span class="lab-fehler">Die Funktion ist in diesem Ausschnitt nicht definiert.</span>'; return; }

  // x und y gleich skaliert: Die Höhe ergibt sich aus dem y-Bereich (höchstens ±0,75·Ausschnitt), die x-Achse ist immer zu sehen
  let lo = Math.max(Math.min(0, ...ok), -.75 * w), hi = Math.min(Math.max(0, ...ok), .75 * w);
  if (hi - lo < .6 * w) { const m = (hi + lo) / 2; lo = m - .3 * w; hi = m + .3 * w; }
  const pad = (hi - lo) * .06; lo -= pad; hi += pad;
  const H = Math.round(W * (hi - lo) / (2 * w));
  const X = x => (x + w) / (2 * w) * W, Y = y => H - (y - lo) / (hi - lo) * H;

  // Vorzeichen von f' bzw. f'' auf dem Raster, Bereiche gleicher Art zusammenfassen
  const vz = (v, eps) => isNaN(v) ? NaN : v > eps ? 1 : v < -eps ? -1 : 0;
  const art = modus === 'monotonie' ? x => vz(ableitung(f, x), 1e-6)
    : modus === 'kruemmung' ? x => vz(abl2(f, x), 1e-4)
    : x => isFinite(f(x)) ? 1 : NaN;
  const kat = xs.map(art);
  // einzelne Nullstellen von f' bzw. f'' zwischen zwei Vorzeichen gehören zum Nachbarbereich (z. B. x³ bei 0); die genaue Grenze liefert grenze()
  for (let i = 1; i < N; i++) if (kat[i] === 0 && kat[i - 1] && kat[i + 1]) kat[i] = kat[i - 1];
  const ber = [];
  kat.forEach((k, i) => ber.length && Object.is(ber.at(-1).k, k) ? ber.at(-1).bis = i : ber.push({ k, von: i, bis: i }));
  const grenze = (a, b) => {
    const ka = art(a); let l = a, r = b;
    for (let n = 0; n < 40; n++) { const m = (l + r) / 2; Object.is(art(m), ka) ? l = m : r = m; }
    return (l + r) / 2;
  };
  ber.forEach((b, j) => { b.xa = j ? ber[j - 1].xb : -w; b.xb = j < ber.length - 1 ? grenze(xs[b.bis], xs[b.bis + 1]) : w; });

  const pfad = (a, b) => {
    let d = '', neu = true;
    for (let i = 0; i <= 200; i++) {
      const x = a + (b - a) * i / 200, y = f(x);
      if (!isFinite(y) || y < lo - (hi - lo) || y > hi + (hi - lo)) { neu = true; continue; }
      d += `${neu ? 'M' : 'L'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`; neu = false;
    }
    return d;
  };
  const cls = k => modus === 'steigung' ? 'k0' : k === 1 ? 'kp' : k === -1 ? 'kn' : 'kz';

  let s = '';
  if (modus !== 'steigung') for (const b of ber) if (!isNaN(b.k)) s += `<rect class="band ${cls(b.k)}" x="${X(b.xa)}" y="0" width="${X(b.xb) - X(b.xa)}" height="${H}"/>`;
  // Raster: Kästchen 1 (bei −2 bis 2: 0,5), beschriftet jede bzw. jede zweite Einheit; trigonometrisch auf der x-Achse Vielfache von π/2
  const g = w === 2 ? .5 : 1, ls = w === 10 ? 2 : 1;
  const yAchse = X(0), xAchse = Math.min(Math.max(Y(0), 12), H - 4), xLbl = xAchse + 15 > H ? xAchse - 6 : xAchse + 15;
  const gx = trig ? Math.PI / (w === 2 ? 4 : 2) : g;
  for (let k = Math.ceil(-w / gx); k * gx <= w; k++) s += `<line class="gr" x1="${X(k * gx)}" y1="0" x2="${X(k * gx)}" y2="${H}"/>`;
  for (let k = Math.ceil(lo / g); k * g <= hi; k++) {
    const y = +(k * g).toFixed(6);
    s += `<line class="gr" x1="0" y1="${Y(y)}" x2="${W}" y2="${Y(y)}"/>`;
    if (y && y % ls === 0) s += `<text x="${yAchse + 5}" y="${Y(y) + 4}">${labZahl(y)}</text>`;
  }
  if (trig) for (let q = -Math.floor(w / (Math.PI / 2)); q * Math.PI / 2 <= w; q++) { if (q && (w < 10 || q % 2 === 0) && Math.abs(X(q * Math.PI / 2) - W / 2) < W / 2 - 16) s += `<text x="${X(q * Math.PI / 2)}" y="${xLbl}" text-anchor="middle">${labPi(q)}</text>`; }
  else for (let x = -w + 1; x < w; x++) if (x && x % ls === 0) s += `<text x="${X(x)}" y="${xLbl}" text-anchor="middle">${labZahl(x)}</text>`;
  s += `<line class="ax" x1="0" y1="${Y(0)}" x2="${W}" y2="${Y(0)}"/><line class="ax" x1="${yAchse}" y1="0" x2="${yAchse}" y2="${H}"/>`;
  for (const b of ber) if (!isNaN(b.k)) s += `<path class="kurve ${cls(b.k)}" d="${pfad(b.xa, b.xb)}"/>`;
  // Vorzeichenwechsel markieren: Extremstellen bzw. Wendestellen
  const wechsel = ber.slice(1).filter((b, j) => b.k * ber[j].k === -1).map(b => b.xa);
  for (const x of wechsel) if (isFinite(f(x))) s += `<circle class="wechsel" cx="${X(x)}" cy="${Y(f(x))}" r="5"/>`;

  const y0 = f(x0), m = ableitung(f, x0), m2 = abl2(f, x0);
  if (isFinite(y0)) {
    s += `<line class="hilfs" x1="${X(x0)}" y1="${Y(0)}" x2="${X(x0)}" y2="${Y(y0)}"/>`;
    if (isFinite(m)) {
      s += `<line class="tangente" x1="${X(-w)}" y1="${Y(y0 - m * (w + x0))}" x2="${X(w)}" y2="${Y(y0 + m * (w - x0))}"/>`;
      if (modus === 'steigung') s += `<path class="dreieck" d="M${X(x0)},${Y(y0)}H${X(x0 + 1)}V${Y(y0 + m)}"/>
        <text x="${X(x0 + .5)}" y="${Y(y0) + (m > 0 ? 15 : -7)}" text-anchor="middle">1</text>
        <text class="lbl" x="${X(x0 + 1) + 6}" y="${Y(y0 + m / 2) + 4}">${labZahl(m)}</text>`;
    }
    s += `<circle class="punkt" cx="${X(x0)}" cy="${Y(y0)}" r="5.5"/>`;
  }
  $('#labGraph').innerHTML = `<svg class="lab-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Graph von f">${s}</svg>`;

  // Text unter dem Graphen (ohne MathJax, damit der Schieberegler flüssig bleibt)
  const stelle = `<i>x</i>₀ = ${labZahl(x0)}`, n = modus === 'kruemmung' ? 'f″' : 'f′', v = modus === 'kruemmung' ? m2 : m;
  let info;
  if (!isFinite(y0)) info = `${stelle}: Hier ist <i>f</i> nicht definiert.`;
  else if (!isFinite(v)) info = `${stelle}: Am Rand des Definitionsbereichs lässt sich <i>${n}</i>(<i>x</i>₀) nicht bestimmen.`;
  else if (modus === 'steigung') info = `${stelle} · <i>f</i>(<i>x</i>₀) = ${labZahl(y0)} · Steigung der Tangente <i>f′</i>(<i>x</i>₀) = ${labZahl(m)}`;
  else {
    const k = vz(v, modus === 'monotonie' ? 1e-6 : 1e-4), hier = ber.find(b => x0 >= b.xa && x0 <= b.xb);
    info = `${stelle} · <i>${n}</i>(<i>x</i>₀) = ${labZahl(v)}${k > 0 ? ' &gt; 0' : k < 0 ? ' &lt; 0' : ''}` + (k === 0
      ? (modus === 'monotonie' ? ' · waagrechte Tangente' : ' · mögliche Wendestelle')
      : ` · Bereich von ${stelleText(hier.xa)} bis ${stelleText(hier.xb)}: <b class="${cls(hier.k)}">${LABOR_ART[modus][hier.k]}</b>`);
    const liste = ber.filter(b => !isNaN(b.k) && b.xb - b.xa > 1e-3)
      .map(b => `<li><i class="${cls(b.k)}"></i>${stelleText(b.xa)} bis ${stelleText(b.xb)}: ${LABOR_ART[modus][b.k]}</li>`).join('');
    info += `<ul class="lab-liste">${liste}</ul>`;
  }
  $('#labInfo').innerHTML = info;
}

document.addEventListener('input', e => { if (e.target.id === 'labF' || e.target.id === 'labX') laborZeichnen(); });
document.addEventListener('click', e => {
  const b = e.target.closest('#labor button'), box = $('#labor'); if (!b) return;
  if (b.dataset.f) $('#labF').value = b.dataset.f;
  if (b.dataset.w) {
    const r = $('#labX'); box.dataset.w = r.max = b.dataset.w; r.min = -b.dataset.w; r.value = Math.max(-r.max, Math.min(r.max, r.value));
    box.querySelectorAll('[data-w]').forEach(x => x.classList.toggle('on', x === b));
  }
  if (b.dataset.modus) { box.dataset.modus = b.dataset.modus; box.querySelectorAll('[data-modus]').forEach(x => x.classList.toggle('on', x === b)); }
  laborZeichnen();
});
addEventListener('resize', laborZeichnen);
