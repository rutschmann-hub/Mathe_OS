// Prüft die Inhalte ohne Browser:  node tools/pruefe-inhalte.js
// - Jeder Inhalt gehört zu einem Thema aus buecher.js und hat alle Pflichtbausteine.
// - Jede Zufallsaufgabe wird 300-mal erzeugt; alle pruef-Paare müssen numerisch übereinstimmen.
const fs = require('fs'), path = require('path'), vm = require('vm');
const wurzel = path.join(__dirname, '..');
const ctx = vm.createContext({ Math, console });
const dateien = ['js/buecher.js', 'js/inhalte.js',
  ...fs.readdirSync(path.join(wurzel, 'js/inhalte')).sort().map(f => 'js/inhalte/' + f)];
for (const f of dateien) vm.runInContext(fs.readFileSync(path.join(wurzel, f), 'utf8'), ctx, { filename: f });
const { KURSE, INHALTE } = vm.runInContext('({ KURSE, INHALTE })', ctx);

let fehler = 0;
const melde = (t, m) => { fehler++; console.log(`✗ ${t}: ${m}`); };
const titel = new Set(Object.values(KURSE).flatMap(k => k.kapitel.flatMap(c => c.u)));

// Jede Kursfassung prüfen: gemeinsame Felder, ersetzt durch die Felder unter bf bzw. lk
const fassungen = x => ['bf', 'lk'].filter(k => x[k]).map(k => [` (${k})`, { ...x, ...x[k] }]);
for (const [t, gemeinsam] of Object.entries(INHALTE)) for (const [zusatz, x] of [['', gemeinsam], ...fassungen(gemeinsam)]) {
  if (!titel.has(t)) melde(t + zusatz, 'kein Thema in buecher.js');
  for (const k of ['kurz', 'merk', 'beispiel', 'fehler', 'uebungen', 'test']) if (!x[k]) melde(t + zusatz, `fehlt: ${k}`);
  (x.test || []).forEach((q, i) => { if (!(q.richtig >= 0 && q.richtig < q.optionen.length)) melde(t + zusatz, `Testfrage ${i + 1}: richtig außerhalb`); });
  (x.pruefen || []).forEach((k, i) => { if (!(k.fehler >= 0 && k.fehler < k.schritte.length)) melde(t + zusatz, `Lösung prüfen ${i + 1}: fehler außerhalb`); });
  for (const [stufe, gen] of Object.entries(x.generator || {})) {
    for (let n = 0; n < 300; n++) {
      const r = gen();
      if (!r.aufgabe || !r.schritte?.length) { melde(t + zusatz, `Stufe ${stufe}: leere Aufgabe`); break; }
      if (/undefined|NaN|Infinity/.test(r.aufgabe + r.schritte.join(''))) { melde(t + zusatz, `Stufe ${stufe}: ${r.aufgabe} → ${r.schritte.join(' | ')}`); break; }
      const falsch = (r.pruef || []).find(([a, b]) => !(Math.abs(a - b) <= 1e-3 * Math.max(1, Math.abs(b))));
      if (falsch) { melde(t + zusatz, `Stufe ${stufe}: ${falsch[0]} ≠ ${falsch[1]} bei ${r.aufgabe}`); break; }
    }
  }
}
const kap1 = ['bf', 'lk'].flatMap(k => KURSE[k].kapitel[0].u);
for (const t of kap1) if (!INHALTE[t]) melde(t, 'Kapitel I ohne Inhalt');
console.log(fehler ? `\n${fehler} Fehler` : `✓ ${Object.keys(INHALTE).length} Themen geprüft, alles in Ordnung`);
process.exit(fehler ? 1 : 0);
