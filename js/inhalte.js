// Eigene Inhalte – unabhängig vom Buch. Schlüssel = Thementitel aus buecher.js.
// Gleichnamige Themen in BF und LK teilen sich automatisch dieses Material.
// kurs: 'bf' | 'lk' → Baustein nur in diesem Kurs zeigen (ohne Angabe: beide).
// Die Themen selbst stehen in js/inhalte/kapitel-*.js.
const INHALTE = {};

// ---- Helfer für Zufallsaufgaben ----
const zuf = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const wahl = arr => arr[Math.floor(Math.random() * arr.length)];
const nichtNull = (min, max) => { let z; do z = zuf(min, max); while (z === 0); return z; };
// Koeffizient vor Variable: 1 → "", -1 → "-"
const koef = a => a === 1 ? '' : a === -1 ? '-' : String(a);
// x hoch n als LaTeX
const pot = n => n === 1 ? 'x' : `x^{${n}}`;
const ggt = (a, b) => b ? ggt(b, a % b) : Math.abs(a);
// gekürzter Bruch z/n als LaTeX
function bruch(z, n) {
  if (n < 0) { z = -z; n = -n; }
  const g = ggt(z, n); z /= g; n /= g;
  return n === 1 ? String(z) : `${z < 0 ? '-' : ''}\\frac{${Math.abs(z)}}{${n}}`;
}
// Summe aus [Koeffizient, Term] als LaTeX, z. B. [[3,'x^{2}'],[-2,'x'],[5,'']] → 3x^{2} - 2x + 5
function summe(teile) {
  const s = teile.filter(([c]) => c !== 0).map(([c, t], i) => {
    const betrag = t ? koef(Math.abs(c)) + t : String(Math.abs(c));
    return i === 0 ? (c < 0 ? '-' : '') + betrag : (c < 0 ? ' - ' : ' + ') + betrag;
  }).join('');
  return s || '0';
}
// Zahl in Klammern, falls negativ
const kl = z => z < 0 ? `(${z})` : String(z);
// Dezimalzahl mit Komma für LaTeX
const dez = z => String(+z.toFixed(4)).replace('.', '{,}');

// ---- Selbstprüfung der Generatoren ----
// Generatoren geben optional pruef: [[behauptet, unabhängig berechnet], …] zurück;
// tools/pruefe-generatoren.js testet damit jede Zufallsaufgabe numerisch.
const ableitung = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
const abl2 = (f, x, h = 1e-3) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
const pruefAbl = (f, df, xs = [0.7, 1.3, 2.1]) => xs.map(x => [df(x), ableitung(f, x)]);

// ---- Eigene Graphen als SVG ----
// graph({ x: [-3, 3], y: [-2, 4], kurven: [{ f, kl: 'k1', label }], punkte: [{ x, y, label }] })
function graph({ x: [x0, x1], y: [y0, y1], kurven = [], punkte = [], hoehe = Math.round(320 * (y1 - y0) / (x1 - x0)) }) {
  const W = 320, H = hoehe, X = x => (x - x0) / (x1 - x0) * W, Y = y => H - (y - y0) / (y1 - y0) * H;
  let s = '';
  for (let x = Math.ceil(x0); x <= x1; x++) s += `<line class="gr" x1="${X(x)}" y1="0" x2="${X(x)}" y2="${H}"/>`;
  for (let y = Math.ceil(y0); y <= y1; y++) s += `<line class="gr" x1="0" y1="${Y(y)}" x2="${W}" y2="${Y(y)}"/>`;
  s += `<line class="ax" x1="0" y1="${Y(0)}" x2="${W}" y2="${Y(0)}"/><line class="ax" x1="${X(0)}" y1="0" x2="${X(0)}" y2="${H}"/>`;
  s += `<text x="${W - 8}" y="${Y(0) - 6}">x</text><text x="${X(0) + 6}" y="12">y</text>`;
  for (const k of kurven) {
    let d = '', neu = true;
    for (let i = 0; i <= 300; i++) {
      const x = x0 + (x1 - x0) * i / 300, y = k.f(x);
      if (!isFinite(y) || y < y0 - (y1 - y0) || y > y1 + (y1 - y0)) { neu = true; continue; }
      d += `${neu ? 'M' : 'L'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`; neu = false;
    }
    s += `<path class="${k.kl || 'k1'}" d="${d}"/>`;
    if (k.label) s += `<text class="${k.kl || 'k1'} lbl" x="${X(k.lx)}" y="${Y(k.f(k.lx)) - 8}">${k.label}</text>`;
  }
  for (const p of punkte) s += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="3.5"/>` + (p.label ? `<text x="${X(p.x) + 6}" y="${Y(p.y) + 16}">${p.label}</text>` : '');
  return `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img">${s}</svg>`;
}
