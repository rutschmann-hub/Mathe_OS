// Ausprobieren: eigene Funktion eingeben und Steigung, Monotonie oder Krümmung am Graphen erkunden.
// Im Thema einschalten mit  labor: { f: 'x^3-3x' }

// Term wie im Taschenrechner → JS-Funktion mit LaTeX-Darstellung (f.tex).
// Erlaubt: + - * / ^ ( ), 2x, 0,5x, x², sin cos tan √ sqrt root(n)(x) ln exp abs, pi, e
// Knoten: { f: Funktion, t: LaTeX, p: Rang (1 Summe, 2 Produkt, 3 Vorzeichen, 4 Potenz, 5 Atom), i: Inhalt einer Klammer }
function termFunktion(text) {
  const s = text.replace(/^\s*(f\s*\(\s*x\s*\)|y)\s*=/i, '').replace(/−/g, '-').replace(/[·×]/g, '*')
    .replace(/²/g, '^2').replace(/³/g, '^3').replace(/,/g, '.').toLowerCase();
  const woerter = ['sqrt', 'root', 'sin', 'cos', 'tan', 'exp', 'ln', 'abs', 'pi', 'π', '√', 'x', 'e'];
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
  const F = {
    sin: [Math.sin, a => `\\sin${a.i ? a.t : ' ' + a.t}`], cos: [Math.cos, a => `\\cos${a.i ? a.t : ' ' + a.t}`],
    tan: [Math.tan, a => `\\tan${a.i ? a.t : ' ' + a.t}`], ln: [Math.log, a => `\\ln${a.i ? a.t : ' ' + a.t}`],
    sqrt: [Math.sqrt, a => `\\sqrt{${(a.i || a).t}}`], '√': [Math.sqrt, a => `\\sqrt{${(a.i || a).t}}`],
    exp: [Math.exp, a => `e^{${(a.i || a).t}}`], abs: [Math.abs, a => `\\left|${(a.i || a).t}\\right|`],
  };
  const kl = (a, r) => a.p < r ? `\\left(${a.t}\\right)` : a.t;
  let p = 0;
  const nimm = t => tok[p] === t && ++p;
  function summe() {
    let a = produkt();
    for (;;) {
      const l = a;
      if (nimm('+')) { const r = produkt(); a = { f: x => l.f(x) + r.f(x), t: `${l.t} + ${r.p === 3 ? kl(r, 4) : r.t}`, p: 1 }; }
      else if (nimm('-')) { const r = produkt(); a = { f: x => l.f(x) - r.f(x), t: `${l.t} - ${r.p === 3 ? kl(r, 4) : kl(r, 2)}`, p: 1 }; }
      else return a;
    }
  }
  function produkt() {
    let a = vorzeichen();
    for (;;) {
      const l = a, t = tok[p];
      // 2x und 2·3: Malpunkt nur zwischen Zahlen bzw. bei ausdrücklichem * ohne Zahl davor
      const mal = (r, explizit) => /^[\d-]/.test(r.t) || (explizit && !/^\d/.test(l.t)) ? ' \\cdot ' : '';
      if (nimm('*')) { const r = vorzeichen(); a = { f: x => l.f(x) * r.f(x), t: kl(l, 2) + mal(r, true) + kl(r, 4), p: 2 }; }
      else if (nimm('/')) { const r = vorzeichen(); a = { f: x => l.f(x) / r.f(x), t: `\\frac{${(l.i || l).t}}{${(r.i || r).t}}`, p: 2 }; }
      else if (t !== undefined && !'+-*/^)'.includes(t)) { const r = potenz(); a = { f: x => l.f(x) * r.f(x), t: kl(l, 2) + mal(r) + kl(r, 4), p: 2 }; } // 2x, 3(x+1), x sin(x)
      else return a;
    }
  }
  function vorzeichen() {
    if (nimm('-')) { const a = vorzeichen(); return { f: x => -a.f(x), t: '-' + kl(a, 2), p: 3 }; }
    nimm('+');
    return potenz();
  }
  function potenz() {
    const b = atom();
    if (nimm('^')) { const e = vorzeichen(); return { f: x => Math.pow(b.f(x), e.f(x)), t: `${kl(b, 5)}^{${(e.i || e).t}}`, p: 4 }; }
    return b;
  }
  function atom() {
    const t = tok[p++];
    if (typeof t === 'number') return { f: () => t, t: String(t).replace('.', '{,}'), p: 5 };
    if (t === 'x') return { f: x => x, t: 'x', p: 5 };
    if (t === 'pi' || t === 'π') return { f: () => Math.PI, t: '\\pi', p: 5 };
    if (t === 'e') return { f: () => Math.E, t: 'e', p: 5 };
    if (t === '(') { const a = summe(); if (!nimm(')')) throw 'Klammer „)“ fehlt'; return { f: a.f, t: `\\left(${a.t}\\right)`, p: 5, i: a }; }
    if (F[t]) { const [g, tex] = F[t], a = atom(); return { f: x => g(a.f(x)), t: tex(a), p: 5 }; }
    // n-te Wurzel root(n)(x); bei ungeradem n auch für negative x
    if (t === 'root') { const n = atom(), a = atom(); return { f: x => { const k = n.f(x), v = a.f(x); return v < 0 && k % 2 === 1 ? -Math.pow(-v, 1 / k) : Math.pow(v, 1 / k); }, t: `\\sqrt[${(n.i || n).t}]{${(a.i || a).t}}`, p: 5 }; }
    throw t === undefined ? 'Term unvollständig' : `„${t}“ an dieser Stelle unerwartet`;
  }
  const a = summe();
  if (p < tok.length) throw `„${tok[p]}“ an dieser Stelle unerwartet`;
  const f = a.f;
  f.tex = a.t;
  return f;
}

const LABOR_MODI = { steigung: 'Steigung', monotonie: 'Monotonie', kruemmung: 'Krümmung', ableiten: 'Grafisch ableiten' };
const LABOR_ART = {
  monotonie: { 1: 'streng monoton steigend', '-1': 'streng monoton fallend', 0: 'konstant' },
  kruemmung: { 1: 'linksgekrümmt', '-1': 'rechtsgekrümmt', 0: 'nicht gekrümmt (Gerade)' },
};

// Standardbeispiele
const LABOR_BSP = {
  'Ganzrationale Funktionen': ['x^2', '-x^2+4x', 'x^3', 'x^3-3x', '-x^3+3x^2', '0,25x^4-2x^2', '0,5(x-1)^2(x+2)'],
  'Bruch und Wurzel': ['1/x', '1/x^2', '√x'],
  'Trigonometrische Funktionen': ['sin(x)', 'cos(x)', '2sin(x)', 'sin(2x)'],
};
// Formel-Eingabefeld (MathLive, lokal in vendor/mathlive, Schriften von dort): ohne Töne
if (window.MathfieldElement) MathfieldElement.soundsDirectory = null;
// Eingabe als Text für termFunktion, z. B. x^3-3x oder sqrt(x)
const labTerm = () => $('#labF').getValue('ascii-math');

function laborSek({ f }) {
  return `<section class="sec"><h2>Ausprobieren</h2><p>Funktion eingeben, Ansicht wählen und den Punkt mit dem Schieberegler über die x-Achse bewegen.</p>
    <div class="labor" id="labor" data-modi="" data-w="10" data-weg="new" data-schritt="1">
      <div class="lab-f">\\(f(x) =\\)<math-field id="labF" math-virtual-keyboard-policy="auto">${termFunktion(f).tex}</math-field></div>
      <details class="lab-bsp"><summary>Beispiele</summary>
        ${Object.entries(LABOR_BSP).map(([g, l]) => `<div class="lab-gruppe">${g}</div><div class="lab-kacheln">${l.map(t => `<button data-f="${t}">\\(${termFunktion(t).tex}\\)</button>`).join('')}</div>`).join('')}</details>
      <div class="stufen">${Object.entries(LABOR_MODI).map(([m, n]) => `<button data-modus="${m}" aria-pressed="false">${n}</button>`).join('')}</div>
      <label class="lab-zoom"><span>Ausschnitt</span><input type="range" id="labW" min="1" max="10" step="0.5" value="10"><span id="labWText">−10 bis 10</span></label>
      <div class="stufen lab-weg"><button data-weg="new" class="on">Markante Stellen (NEW)</button><button data-weg="regler">Mit Schieberegler</button>
        <table class="lab-new"><tr><th><i>f</i></th><td>N</td><td class="e">E</td><td class="w">W</td><td></td></tr>
          <tr><th><i>f′</i></th><td></td><td class="e">N</td><td class="w">E</td><td>W</td></tr></table></div>
      <div class="stufen lab-schritte">${['Stellen markieren', 'Übertragen', 'f′ zeichnen'].map((t, i) => `<button data-schritt="${i + 1}" class="${i ? '' : 'on'}">${i + 1} · ${t}</button>`).join('')}</div>
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
  try { f = termFunktion(labTerm()); }
  catch (e) { $('#labInfo').innerHTML = `<span class="lab-fehler">${e}</span>`; return; }
  const modi = box.dataset.modi.split(' '), an = m => modi.includes(m), w = +box.dataset.w, x0 = +$('#labX').value;
  let W = $('#labGraph').clientWidth;
  const N = 600;
  const trig = /sin|cos|tan/i.test(labTerm());
  // Stellen bei trigonometrischen Funktionen im Bogenmaß, z. B. 3π/2
  const stelleText = x => trig && Math.abs(x / (Math.PI / 2) - Math.round(x / (Math.PI / 2))) < 1e-4 && Math.round(x / (Math.PI / 2)) ? labPi(Math.round(x / (Math.PI / 2))) : labZahl(x);
  const xs = Array.from({ length: N + 1 }, (_, i) => -w + 2 * w * i / N);
  if (!xs.map(f).some(isFinite)) { $('#labGraph').innerHTML = ''; $('#labInfo').innerHTML = '<span class="lab-fehler">Die Funktion ist in diesem Ausschnitt nicht definiert.</span>'; return; }
  const X = x => (x + w) / (2 * w) * W;

  // Koordinatensystem für fn: x und y gleich skaliert; die Höhe ergibt sich aus dem y-Bereich (höchstens ±0,75·Ausschnitt), die x-Achse ist immer zu sehen
  const system = fn => {
    const ws = xs.map(fn).filter(isFinite);
    let lo = Math.max(Math.min(0, ...ws), -.75 * w), hi = Math.min(Math.max(0, ...ws), .75 * w);
    if (hi - lo < .6 * w) { const m = (hi + lo) / 2; lo = m - .3 * w; hi = m + .3 * w; }
    const pad = (hi - lo) * .06; lo -= pad; hi += pad;
    return { lo, hi, get H() { return Math.round(W * (hi - lo) / (2 * w)); }, Y: y => (hi - y) * W / (2 * w) };
  };

  // Vorzeichen von f' bzw. f'' auf dem Raster, Bereiche gleicher Art zusammenfassen
  const vz = (v, eps) => isNaN(v) ? NaN : v > eps ? 1 : v < -eps ? -1 : 0;
  const artM = x => vz(ableitung(f, x), 1e-6), artK = x => vz(abl2(f, x), 1e-4);
  const bereiche = art => {
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
    return ber;
  };
  // Vorzeichenwechsel: bei f' Extremstellen, bei f'' Wendestellen
  const wechsel = ber => ber.slice(1).filter((b, j) => b.k * ber[j].k === -1).map(b => b.xa);

  const pfad = (fn, a, b, S) => {
    let d = '', neu = true;
    for (let i = 0; i <= 200; i++) {
      const x = a + (b - a) * i / 200, y = fn(x);
      if (!isFinite(y) || y < S.lo - (S.hi - S.lo) || y > S.hi + (S.hi - S.lo)) { neu = true; continue; }
      d += `${neu ? 'M' : 'L'}${X(x).toFixed(1)},${S.Y(y).toFixed(1)}`; neu = false;
    }
    return d;
  };
  // Farben: Monotonie grün/rot, Krümmung blau/orange
  const cls = k => k === 1 ? 'kp' : k === -1 ? 'kn' : 'kz', clsK = k => k === 1 ? 'kl' : k === -1 ? 'kr' : 'kz';
  const baender = (ber, S, c = cls) => ber.filter(b => !isNaN(b.k)).map(b => `<rect class="band ${c(b.k)}" x="${X(b.xa)}" y="0" width="${X(b.xb) - X(b.xa)}" height="${S.H}"/>`).join('');
  const senkrecht = (x, S) => `<line class="hilfs" x1="${X(x)}" y1="0" x2="${X(x)}" y2="${S.H}"/>`;
  const marke = (x, y, S, t) => `<circle class="wechsel" cx="${X(x)}" cy="${S.Y(y)}" r="5"/><text class="lbl" x="${X(x)}" y="${S.Y(y) - 10}" text-anchor="middle">${t}</text>`;

  // Raster: Kästchen 1 (kleiner Ausschnitt: 0,5), beschriftet je nach Ausschnitt; trigonometrisch auf der x-Achse Vielfache von π/2
  const randFrei = x => Math.abs(X(x) - W / 2) < W / 2 - 16;
  const svg = (S, name, unten, oben) => {
    const { lo, hi, H, Y } = S, g = w <= 3 ? .5 : 1, ls = w > 6 ? 2 : w > 3 ? 1 : .5, gx = trig ? Math.PI / (w <= 3 ? 4 : 2) : g;
    const yAchse = X(0), xAchse = Math.min(Math.max(Y(0), 12), H - 4), xLbl = xAchse + 15 > H ? xAchse - 6 : xAchse + 15;
    let s = unten;
    for (let k = Math.ceil(-w / gx); k * gx <= w; k++) s += `<line class="gr" x1="${X(k * gx)}" y1="0" x2="${X(k * gx)}" y2="${H}"/>`;
    for (let k = Math.ceil(lo / g); k * g <= hi; k++) {
      const y = +(k * g).toFixed(6);
      s += `<line class="gr" x1="0" y1="${Y(y)}" x2="${W}" y2="${Y(y)}"/>`;
      if (y && y % ls === 0) s += `<text x="${yAchse + 5}" y="${Y(y) + 4}">${labZahl(y)}</text>`;
    }
    if (trig) for (let q = -Math.floor(w / (Math.PI / 2)); q * Math.PI / 2 <= w; q++) { if (q && (w <= 6 || q % 2 === 0) && randFrei(q * Math.PI / 2)) s += `<text x="${X(q * Math.PI / 2)}" y="${xLbl}" text-anchor="middle">${labPi(q)}</text>`; }
    else for (let k = Math.ceil(-w / ls); k * ls <= w; k++) { const x = k * ls; if (x && randFrei(x)) s += `<text x="${X(x)}" y="${xLbl}" text-anchor="middle">${labZahl(x)}</text>`; }
    s += `<line class="ax" x1="0" y1="${Y(0)}" x2="${W}" y2="${Y(0)}"/><line class="ax" x1="${yAchse}" y1="0" x2="${yAchse}" y2="${H}"/>`;
    return `<svg class="lab-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Graph von ${name}">${s}${oben}<text class="name" x="8" y="20">${name}</text></svg>`;
  };

  const fs = x => ableitung(f, x), fS = system(f), aS = an('ableiten') && system(fs);
  // Alle Graphen zusammen höchstens 75 % der Fensterhöhe, sonst schmaler (x und y bleiben gleich skaliert)
  W = Math.min(W, Math.max(280, .75 * innerHeight * 2 * w / [fS, aS].reduce((s, S) => s + (S ? S.hi - S.lo : 0), 0)));
  const y0 = f(x0), m = ableitung(f, x0), m2 = abl2(f, x0);
  // Punkt P, auf Wunsch mit Tangente und Steigungsdreieck
  const punktP = dreieck => {
    if (!isFinite(y0)) return '';
    const Y = fS.Y;
    let s = `<line class="hilfs" x1="${X(x0)}" y1="${Y(0)}" x2="${X(x0)}" y2="${Y(y0)}"/>`;
    if (dreieck && isFinite(m)) {
      s += `<line class="tangente" x1="${X(-w)}" y1="${Y(y0 - m * (w + x0))}" x2="${X(w)}" y2="${Y(y0 + m * (w - x0))}"/>`;
      s += `<path class="dreieck" d="M${X(x0)},${Y(y0)}H${X(x0 + 1)}V${Y(y0 + m)}"/>
        <text x="${X(x0 + .5)}" y="${Y(y0) + (m > 0 ? 15 : -7)}" text-anchor="middle">1</text>
        <text class="lbl" x="${X(x0 + 1) + 6}" y="${Y(y0 + m / 2) + 4}">${labZahl(m)}</text>`;
    }
    return s + `<circle class="punkt" cx="${X(x0)}" cy="${Y(y0)}" r="5.5"/>`;
  };
  // Stelle des Schiebereglers direkt eingesetzt: f(−1,9), f′(−1,9)
  const st = `(${labZahl(x0)})`;
  let bild, info;

  if (an('ableiten')) {
    if (box.dataset.weg === 'regler') {
      // f′ entsteht beim Schieben: jede Tangentensteigung wird zu einem Punkt (x₀ | f′(x₀))
      bild = svg(fS, 'f', '', `<path class="kurve k0" d="${pfad(f, -w, w, fS)}"/>${senkrecht(x0, fS)}${punktP(true)}`)
        + svg(aS, 'f′', '', `${senkrecht(x0, aS)}<path class="kurve abl" d="${pfad(fs, -w, x0, aS)}"/>`
          + (isFinite(m) ? `<circle class="punkt" cx="${X(x0)}" cy="${aS.Y(m)}" r="5.5"/>` : ''));
      info = !isFinite(m) ? `<i>f′</i>${st} lässt sich nicht bestimmen.`
        : `Steigung der Tangente <i>f′</i>${st} = ${labZahl(m)} · wird zum Punkt (${labZahl(x0)} | ${labZahl(m)}) auf dem Graphen von <i>f′</i>`;
    } else {
      const schritt = +box.dataset.schritt, berM = bereiche(artM), E = wechsel(berM), Wd = wechsel(bereiche(artK));
      let o = `<path class="kurve k0" d="${pfad(f, -w, w, fS)}"/>`, u = '';
      for (const x of [...E, ...Wd]) { o += senkrecht(x, fS); u += senkrecht(x, aS); }
      for (const x of E) o += marke(x, f(x), fS, 'E');
      for (const x of Wd) o += marke(x, f(x), fS, 'W');
      if (schritt >= 2) {
        for (const b of berM) if (!isNaN(b.k) && b.k && X(b.xb) - X(b.xa) > 14)
          u += `<text class="vz ${cls(b.k)}" x="${X((b.xa + b.xb) / 2)}" y="${aS.Y(0) + (b.k > 0 ? -8 : 18)}" text-anchor="middle">${b.k > 0 ? '+' : '−'}</text>`;
        for (const x of E) u += marke(x, 0, aS, 'N');
        for (const x of Wd) u += marke(x, fs(x), aS, 'E');
      }
      if (schritt >= 3) u = `<path class="kurve abl" d="${pfad(fs, -w, w, aS)}"/>` + u;
      bild = svg(fS, 'f', schritt >= 2 ? baender(berM, fS) : '', o) + svg(aS, 'f′', schritt >= 2 ? baender(berM, aS) : '', u);
      const liste = xs => xs.length ? xs.map(stelleText).join('; ') : 'keine';
      info = [
        `Markiere bei <i>f</i> die Extremstellen (E): <i>x</i> = ${liste(E)} und die Wendestellen (W): <i>x</i> = ${liste(Wd)}.`,
        `Übertragen: Aus jeder Extremstelle von <i>f</i> wird eine <b>Nullstelle</b> von <i>f′</i>, aus jeder Wendestelle eine <b>Extremstelle</b> von <i>f′</i>. Wo <i>f</i> steigt, liegt <i>f′</i> über der x-Achse (+), wo <i>f</i> fällt, darunter (−).`,
        `<i>f′</i> zeichnen: durch die Nullstellen und Extrempunkte, oberhalb der x-Achse bei +, unterhalb bei −.`,
      ][schritt - 1];
    }
  } else {
    // Steigung, Monotonie und Krümmung lassen sich kombinieren: Monotonie färbt den Graphen, Krümmung den Hintergrund
    const berM = an('monotonie') && bereiche(artM), berK = an('kruemmung') && bereiche(artK);
    const kurve = berM ? berM.filter(b => !isNaN(b.k)).map(b => `<path class="kurve ${cls(b.k)}" d="${pfad(f, b.xa, b.xb, fS)}"/>`).join('')
      : `<path class="kurve k0" d="${pfad(f, -w, w, fS)}"/>`;
    const marken = (ber, t) => ber ? wechsel(ber).filter(x => isFinite(f(x))).map(x => marke(x, f(x), fS, t)).join('') : '';
    bild = svg(fS, 'f', berK ? baender(berK, fS, clsK) : berM ? baender(berM, fS) : '', kurve + marken(berM, 'E') + marken(berK, 'W') + punktP(an('steigung')));

    // Text unter dem Graphen (ohne MathJax, damit der Schieberegler flüssig bleibt)
    const zeile = (ber, n, v, eps, art, c) => {
      if (!isFinite(v)) return `<div>Am Rand des Definitionsbereichs lässt sich <i>${n}</i>${st} nicht bestimmen.</div>`;
      const k = vz(v, eps), hier = ber.find(b => x0 >= b.xa && x0 <= b.xb);
      return `<div><i>${n}</i>${st} = ${labZahl(v)}${k > 0 ? ' &gt; 0' : k < 0 ? ' &lt; 0' : ''}` + (k === 0
        ? (n === 'f′' ? ' · waagrechte Tangente' : ' · mögliche Wendestelle')
        : ` · Bereich von ${stelleText(hier.xa)} bis ${stelleText(hier.xb)}: <b class="${c(hier.k)}">${LABOR_ART[art][hier.k]}</b>`) + '</div>'
        + `<ul class="lab-liste">${ber.filter(b => !isNaN(b.k) && b.xb - b.xa > 1e-3)
          .map(b => `<li><i class="${c(b.k)}"></i>${stelleText(b.xa)} bis ${stelleText(b.xb)}: ${LABOR_ART[art][b.k]}</li>`).join('')}</ul>`;
    };
    info = !isFinite(y0) ? `<i>f</i>${st} ist nicht definiert.`
      : `<div><i>f</i>${st} = ${labZahl(y0)}${an('steigung') && isFinite(m) ? ` · Steigung der Tangente <i>f′</i>${st} = ${labZahl(m)}` : ''}</div>`
        + (berM ? zeile(berM, 'f′', m, 1e-6, 'monotonie', cls) : '') + (berK ? zeile(berK, 'f″', m2, 1e-4, 'kruemmung', clsK) : '');
  }
  $('#labGraph').innerHTML = bild;
  $('#labInfo').innerHTML = info;
}

// Ausschnitt −w bis w; der Punkt bleibt im Ausschnitt
function laborAusschnitt() {
  const box = $('#labor'), w = +$('#labW').value, r = $('#labX');
  box.dataset.w = r.max = w; r.min = -w; r.value = Math.max(-w, Math.min(w, r.value));
  $('#labWText').textContent = `−${labZahl(w)} bis ${labZahl(w)}`;
  // Grafisch ableiten mit Schieberegler beginnt am linken Rand
  if (box.dataset.modi === 'ableiten') r.value = -w;
}
document.addEventListener('input', e => {
  if (e.target.id === 'labW') laborAusschnitt();
  if (['labF', 'labX', 'labW'].includes(e.target.id)) laborZeichnen();
});
document.addEventListener('click', e => {
  const b = e.target.closest('#labor button'), box = $('#labor'); if (!b) return;
  if (b.dataset.f) { $('#labF').value = termFunktion(b.dataset.f).tex; b.closest('details').open = false; }
  // Ansichten an- und abwählen; Grafisch ableiten steht für sich allein
  if (b.dataset.modus) {
    const m = b.dataset.modus, modi = box.dataset.modi.split(' ').filter(x => x && x !== 'ableiten');
    box.dataset.modi = m === 'ableiten' ? (box.dataset.modi === 'ableiten' ? '' : 'ableiten')
      : (modi.includes(m) ? modi.filter(x => x !== m) : [...modi, m]).join(' ');
    box.querySelectorAll('[data-modus]').forEach(x => { const on = box.dataset.modi.split(' ').includes(x.dataset.modus); x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    if (box.dataset.modi === 'ableiten') $('#labX').value = -box.dataset.w;
  }
  for (const a of ['weg', 'schritt']) if (b.dataset[a]) { box.dataset[a] = b.dataset[a]; box.querySelectorAll(`[data-${a}]`).forEach(x => x.classList.toggle('on', x === b)); }
  if (b.dataset.weg === 'regler') $('#labX').value = -box.dataset.w;
  laborZeichnen();
});
addEventListener('resize', laborZeichnen);
