// Eigene Inhalte – unabhängig vom Buch. Schlüssel = Thementitel.
// Gleichnamige Themen in BF und LK teilen sich automatisch dieses Material.
// kurs: 'bf' | 'lk' → Baustein nur in diesem Kurs zeigen (ohne Angabe: beide).
// ---- Helfer für Zufallsaufgaben ----
const zuf = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const wahl = arr => arr[Math.floor(Math.random() * arr.length)];
const nichtNull = (min, max) => { let z; do z = zuf(min, max); while (z === 0); return z; };
// Koeffizient vor Variable: 1 → "", -1 → "-"
const koef = a => a === 1 ? '' : a === -1 ? '-' : String(a);
// Lineares Glied a·x + b als LaTeX
function lin(a, b) {
  let s = a === 0 ? '' : koef(a) + 'x';
  if (b !== 0) s += s ? (b > 0 ? ' + ' + b : ' - ' + (-b)) : String(b);
  return s || '0';
}
const ex = c => `e^{${koef(c)}x}`;

const INHALTE = {
  'Produktregel': {
    video: null, // z. B. { url: 'https://…', titel: 'Produktregel in 5 Minuten' }

    // Zufallsaufgaben je Stufe: liefert { aufgabe, schritte[] } (LaTeX)
    generator: {
      1: () => {
        const a = zuf(1, 5), n = zuf(2, 4);
        const u = `${koef(a)}x^{${n}}`, du = `${a * n}x${n - 1 > 1 ? `^{${n - 1}}` : ''}`;
        return { aufgabe: `f(x) = ${u}\\cdot e^x`,
          schritte: [`u = ${u},\\; u' = ${du},\\; v = e^x,\\; v' = e^x`,
                     `f'(x) = ${du}\\cdot e^x + ${u}\\cdot e^x`,
                     `f'(x) = (${u} + ${du})\\,e^x`] };
      },
      2: () => {
        const a = nichtNull(-4, 4), b = nichtNull(-5, 5), c = wahl([-2, -1, 2, 3]);
        return { aufgabe: `f(x) = (${lin(a, b)})\\cdot ${ex(c)}`,
          schritte: [`u = ${lin(a, b)},\\; u' = ${a},\\; v = ${ex(c)},\\; v' = ${c}\\,${ex(c)}`,
                     `f'(x) = ${a}\\cdot ${ex(c)} + (${lin(a, b)})\\cdot ${c < 0 ? `(${c})` : c}\\,${ex(c)}`,
                     `f'(x) = (${lin(a * c, a + b * c)})\\,${ex(c)}`] };
      },
      3: () => {
        const a = nichtNull(-3, 3), b = nichtNull(-4, 4), c = wahl([-2, -1, 1, 2]);
        const m = a + b * c;
        return { aufgabe: `\\text{Tangente an } f(x) = (${lin(a, b)})\\cdot ${ex(c)} \\text{ im Punkt } P(0\\mid f(0))`,
          schritte: [`f(0) = ${b}`,
                     `f'(x) = (${lin(a * c, m)})\\,${ex(c)} \\;\\Rightarrow\\; f'(0) = ${m}`,
                     `t:\\; y = ${lin(m, b)}`] };
      },
    },
  },
};

Object.assign(INHALTE['Produktregel'], {
    kurz: 'Wie leitet man ein Produkt zweier Funktionen ab, zum Beispiel \\(x^2 \\cdot e^x\\)? Faktorweise ableiten funktioniert nicht – dafür gibt es die Produktregel.',

    merk: {
      formel: String.raw`f(x) = u(x)\cdot v(x) \quad\Longrightarrow\quad f'(x) = u'(x)\cdot v(x) + u(x)\cdot v'(x)`,
      text: 'Kurz: \\((u\\cdot v)\' = u\'v + uv\'\\) – „erster Faktor abgeleitet mal zweiter, plus erster mal zweiter abgeleitet“.',
    },

    warum: {
      titel: 'Warum gilt die Produktregel?',
      html: String.raw`<p>Stell dir \(u\cdot v\) als Fläche eines Rechtecks mit den Seiten \(u\) und \(v\) vor.
        Wächst \(u\) um \(\Delta u\) und \(v\) um \(\Delta v\), kommen drei Streifen hinzu:</p>
        <p>\[\Delta(u\cdot v) = \Delta u\cdot v + u\cdot\Delta v + \Delta u\cdot\Delta v\]</p>
        <p>Teilt man durch \(\Delta x\) und lässt \(\Delta x \to 0\) gehen, verschwindet das kleine Eckstück
        \(\Delta u\cdot\Delta v\) – übrig bleibt \(u'v + uv'\).</p>`,
    },

    beispiel: {
      aufgabe: String.raw`Leite \(f(x) = x^2\cdot e^x\) ab.`,
      schritte: [
        String.raw`Faktoren festlegen: \(u(x) = x^2,\; v(x) = e^x\)`,
        String.raw`Einzeln ableiten: \(u'(x) = 2x,\; v'(x) = e^x\)`,
        String.raw`Einsetzen: \(f'(x) = 2x\cdot e^x + x^2\cdot e^x\)`,
        String.raw`Ausklammern: \(f'(x) = (x^2 + 2x)\,e^x = x(x+2)\,e^x\)`,
      ],
    },

    fehler: String.raw`<b>Typischer Fehler:</b> \((u\cdot v)' = u'\cdot v'\) – falsch!
      Gegenbeispiel: \((x\cdot x)' = (x^2)' = 2x\), aber \(1\cdot 1 = 1\).`,

    uebungen: [
      { niveau: 1, aufgabe: String.raw`\(f(x) = x\cdot e^x\)`,
        loesung: String.raw`\(f'(x) = 1\cdot e^x + x\cdot e^x = (1+x)\,e^x\)` },
      { niveau: 1, aufgabe: String.raw`\(f(x) = x^3\cdot\sin(x)\)`,
        loesung: String.raw`\(f'(x) = 3x^2\sin(x) + x^3\cos(x)\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = (2x+1)\cdot e^x\)`,
        loesung: String.raw`\(f'(x) = 2e^x + (2x+1)e^x = (2x+3)\,e^x\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = x^2\cdot e^{-x}\)`,
        loesung: String.raw`\(v(x) = e^{-x},\; v'(x) = -e^{-x}\)<br>\(f'(x) = 2x\,e^{-x} - x^2 e^{-x} = x(2-x)\,e^{-x}\)` },
      { niveau: 3, aufgabe: String.raw`Bestimme die Gleichung der Tangente an den Graphen von \(f(x) = x\cdot e^x\) im Punkt \(P(0\mid f(0))\).`,
        loesung: String.raw`\(f(0) = 0\), \(f'(x) = (1+x)e^x\), also \(f'(0) = 1\).<br>Tangente: \(y = 1\cdot(x-0) + 0 = x\)` },
      { niveau: 3, kurs: 'lk', aufgabe: String.raw`\(f(x) = x\cdot e^{x^2}\) &nbsp;<span class="hint">Produkt- und Kettenregel</span>`,
        loesung: String.raw`\(u = x,\; v = e^{x^2},\; v' = 2x\,e^{x^2}\)<br>\(f'(x) = e^{x^2} + x\cdot 2x\,e^{x^2} = (1+2x^2)\,e^{x^2}\)` },
    ],

    test: [
      { frage: String.raw`Was ist die Ableitung von \(f(x) = x\cdot\sin(x)\)?`,
        optionen: [String.raw`\(\cos(x)\)`, String.raw`\(\sin(x) + x\cos(x)\)`, String.raw`\(x\cos(x)\)`, String.raw`\(\sin(x)\cdot\cos(x)\)`],
        richtig: 1, erklaerung: String.raw`\(u' v + u v' = 1\cdot\sin(x) + x\cdot\cos(x)\)` },
      { frage: String.raw`\(f(x) = x^2\cdot e^x\). Welchen Wert hat \(f'(0)\)?`,
        optionen: ['0', '1', '2'],
        richtig: 0, erklaerung: String.raw`\(f'(x) = x(x+2)\,e^x\), also \(f'(0) = 0\).` },
      { frage: 'Bei welcher Funktion brauchst du die Produktregel?',
        optionen: [String.raw`\(f(x) = 5\cdot e^x\)`, String.raw`\(f(x) = e^x + x\)`, String.raw`\(f(x) = x\cdot e^x\)`],
        richtig: 2, erklaerung: 'Nur hier werden zwei Funktionen von \\(x\\) multipliziert. Ein konstanter Faktor wie 5 bleibt einfach stehen.' },
    ],
});
