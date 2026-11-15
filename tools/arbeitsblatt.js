// Arbeitsblatt als PDF im Stil der Lernseite: Merkkasten, Erklärung, Beispiel, Fehler, Übungen und Lösungen.
//   node tools/arbeitsblatt.js bf II            alle Themen von Kapitel II im Basisfach
//   node tools/arbeitsblatt.js lk II 5 ~/Desktop Thema II.5 im Leistungsfach, PDF auf den Schreibtisch
// Inhalt wie auf der Seite (Kursfassung, Übungen des Kurses). Gedruckt wird mit Brave im Hintergrund,
// Schrift und MathJax kommen aus vendor/ – nichts von fremden Servern.
const fs = require('fs'), path = require('path'), os = require('os'), vm = require('vm'), { execFileSync } = require('child_process');
const wurzel = path.join(__dirname, '..');
const BRAVE = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const [kurs, kapNr, themaNr, ziel = path.join(os.homedir(), 'Documents/Schule/Mathe/MatheNavigator/Arbeitsblaetter')] = process.argv.slice(2);

const ctx = vm.createContext({ Math, console });
for (const f of ['js/buecher.js', 'js/inhalte.js', ...fs.readdirSync(path.join(wurzel, 'js/inhalte')).sort().map(f => 'js/inhalte/' + f)])
  vm.runInContext(fs.readFileSync(path.join(wurzel, f), 'utf8'), ctx, { filename: f });
const { KURSE, INHALTE } = vm.runInContext('({ KURSE, INHALTE })', ctx);

const kap = KURSE[kurs] && KURSE[kurs].kapitel.find(c => c.nr === kapNr);
if (!kap) { console.log('Aufruf: node tools/arbeitsblatt.js bf|lk Kapitel [Thema] [Zielordner]   z. B. bf II 3'); process.exit(1); }
const vendor = 'file://' + path.join(wurzel, 'vendor');
const dateiname = t => t.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');

function blatt(titel, nr) {
  const x = { ...INHALTE[titel], ...INHALTE[titel][kurs] }, ue = x.uebungen.filter(u => !u.kurs || u.kurs === kurs);
  const kopf = rechts => `<div class="kopf"><span><b>Mathe Kursstufe</b> · ${KURSE[kurs].name}</span><span>Kapitel ${kapNr}.${nr}${rechts ? ' · ' + rechts : ''}</span></div>`;
  const merk = x.merk.zeilen ? `<div class="regeln">${x.merk.zeilen.map(([n, f]) => `<div class="n">${n}</div><div>\\(\\displaystyle ${f}\\)</div>`).join('')}</div>`
    : `<div class="formel">\\[${x.merk.formel}\\]</div>`;
  const karten = (feld, tag) => ue.map((u, i) => `<div class="aufg"><span class="nr">${i + 1}</span><div>${u[feld]}${tag ? `<span class="lvl">${'●'.repeat(u.niveau)}</span>` : ''}</div></div>`).join('');
  return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>${titel}</title>
<link rel="stylesheet" href="${vendor}/fonts/inter.css">
<link rel="stylesheet" href="file://${path.join(wurzel, 'css/base.css')}">
<style>
  /* Farben, Schrift und Graphfarben aus css/base.css; hier nur die Kursfarbe */
  :root { --k: var(--${kurs}); --k-soft: var(--${kurs}-soft); }
  @page { size: A4; margin: 15mm 16mm 17mm;
    @bottom-left { content: "Mathe Kursstufe · ${KURSE[kurs].name} · Kapitel ${kapNr}.${nr}"; font: 8pt Inter, sans-serif; color: var(--muted); }
    @bottom-right { content: "Seite " counter(page) " von " counter(pages); font: 8pt Inter, sans-serif; color: var(--muted); } }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--surface); font-family: var(--font); font-size: 9.5pt; line-height: 1.45; color: var(--text); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  mjx-container { font-size: 105% !important; }
  .kopf { display: flex; justify-content: space-between; font-size: 8.5pt; color: var(--muted); border-bottom: 1px solid var(--line); padding-bottom: 6px; margin-bottom: 12px; }
  .kopf b { color: var(--k); }
  h1 { font-size: 16pt; line-height: 1.15; letter-spacing: -.02em; margin: 0 0 4px; }
  h2 { font-size: 11.5pt; margin: 14px 0 6px; }
  .lead { color: var(--muted); margin: 0 0 14px; }
  .merk { position: relative; background: var(--k-soft); border: 1px solid color-mix(in srgb, var(--k) 30%, transparent); border-radius: 14px; padding: 14px 14px 8px; break-inside: avoid; }
  .merk .lbl { position: absolute; top: -9px; left: 16px; background: var(--k); color: var(--surface); font-size: 7.5pt; font-weight: 700; letter-spacing: .12em; padding: 2px 10px; border-radius: 99px; }
  .regeln { display: grid; grid-template-columns: auto 1fr; column-gap: 14px; }
  .regeln > div { padding: 3px 0; border-top: 1px solid color-mix(in srgb, var(--k) 18%, transparent); }
  .regeln > div:nth-child(-n+2) { border-top: 0; }
  .regeln .n { color: var(--muted); font-size: 8.5pt; padding-top: 6px; }
  .merk p { margin: 8px 0 2px; font-size: 9pt; color: var(--muted); }
  .erkl p { margin: 0 0 8px; }
  .graph { display: block; width: 200px; float: right; margin: 0 0 8px 14px; color: var(--muted); }
  .erkl::after { content: ''; display: block; clear: both; }
  .graph .gr { stroke: var(--plot-grid); stroke-width: .6; } .graph .ax { stroke: var(--plot-axis); stroke-width: 1.1; }
  .graph path { fill: none; stroke-width: 2.2; stroke-linecap: round; }
  .graph .k1 { stroke: var(--plot-1); fill: var(--plot-1); } .graph path.k1 { fill: none; }
  .graph .k2 { stroke: var(--plot-2); fill: var(--plot-2); } .graph path.k2 { fill: none; }
  .graph .k3 { stroke: var(--plot-3); fill: var(--plot-3); } .graph path.k3 { fill: none; stroke-dasharray: 5 4; }
  .graph text { font-size: 12px; fill: currentColor; stroke: none; } .graph text.lbl { font-weight: 600; fill: var(--text); stroke: var(--surface); stroke-width: 4px; stroke-linejoin: round; paint-order: stroke; } .graph circle { fill: var(--text); }
  ol.steps { margin: 4px 0 0; padding-left: 20px; } ol.steps li { margin: 2px 0; }
  .karte { border: 1px solid var(--line); border-radius: 12px; padding: 8px 12px; break-inside: avoid; }
  .fehler { background: color-mix(in srgb, var(--falsch) 7%, var(--surface)); border-left: 3px solid var(--falsch); border-radius: 0 10px 10px 0; padding: 7px 12px; margin-top: 10px; font-size: 9pt; break-inside: avoid; }
  .neue-seite { break-before: page; }
  .aufg { display: grid; grid-template-columns: 24px 1fr; gap: 8px; border: 1px solid var(--line); border-radius: 12px; padding: 8px 12px; margin: 0 0 8px; break-inside: avoid; }
  .aufg .nr { display: inline-grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: var(--k); color: var(--surface); font-size: 9pt; font-weight: 700; }
  .lvl { margin-left: 8px; color: var(--muted); font-size: 8pt; letter-spacing: .1em; }
  .loes .aufg { font-size: 9pt; padding: 6px 12px; margin-bottom: 6px; }
</style>
<script>window.MathJax = { tex: { inlineMath: [['\\\\(', '\\\\)']], displayMath: [['\\\\[', '\\\\]']] },
  chtml: { fontURL: '${vendor}/mathjax/output/chtml/fonts/woff-v2', mtextInheritFont: true }, options: { enableMenu: false } };</script>
<script src="${vendor}/mathjax/tex-chtml.js"></script>
</head><body>
${kopf()}
<h1>${titel}</h1>
<p class="lead">${x.kurz}</p>
<div class="merk"><div class="lbl">MERKE</div>${merk}<p>${x.merk.text}</p></div>
${x.erklaerung ? `<h2>Erklärung</h2><div class="erkl">${x.erklaerung}</div>` : ''}
<h2>Beispiel</h2>
<div class="karte"><div>${x.beispiel.aufgabe}</div><ol class="steps">${x.beispiel.schritte.map(s => `<li>${s}</li>`).join('')}</ol></div>
<div class="fehler">${x.fehler}</div>
<div class="neue-seite">${kopf('Übungen')}<h1>Übungen</h1><p class="lead">Schwierigkeit: ● leicht · ●● mittel · ●●● anspruchsvoll</p>${karten('aufgabe', true)}</div>
<div class="neue-seite loes">${kopf('Lösungen')}<h1>Lösungen</h1>${karten('loesung')}</div>
</body></html>`;
}

fs.mkdirSync(ziel, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'arbeitsblatt-'));
kap.u.forEach((titel, i) => {
  if (themaNr && +themaNr !== i + 1) return;
  if (!INHALTE[titel]) { console.log(`– ${kapNr}.${i + 1} ${titel}: noch kein Inhalt`); return; }
  const html = path.join(tmp, 'blatt.html'), pdf = path.join(ziel, `KS_${kurs.toUpperCase()}_${kapNr}${i + 1}_${dateiname(titel)}.pdf`);
  fs.writeFileSync(html, blatt(titel, i + 1));
  execFileSync(BRAVE, ['--headless=new', '--disable-gpu', '--allow-file-access-from-files', '--no-pdf-header-footer',
    '--virtual-time-budget=20000', `--print-to-pdf=${pdf}`, 'file://' + html], { stdio: 'ignore' });
  console.log(`✓ ${pdf}`);
});
fs.rmSync(tmp, { recursive: true, force: true });
