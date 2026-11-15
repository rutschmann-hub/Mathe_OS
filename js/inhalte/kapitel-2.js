// Kapitel II · Exponentialfunktionen (Basisfach) bzw. Exponential- und Logarithmusfunktionen (Leistungsfach)
// Bekannt ab II.1: natürliche Exponentialfunktion e^x. Ab II.2: natürlicher Logarithmus.
// Logarithmengesetze und a^x = b mit ln(b)/ln(a) stehen nur im Leistungsfach (kurs: 'lk').

// Zahl auf drei Dezimalen mit Komma für LaTeX
const dez3 = z => String(+z.toFixed(3)).replace('.', '{,}');
// x = Zähler / m als LaTeX, z. B. \frac{\ln(5) - 2}{3}; zaehlerEinfach: Zähler ist ein einzelnes ln(…)
const geteilt = (zaehler, m, zaehlerEinfach) => m === 1 ? zaehler
  : m === -1 ? (zaehlerEinfach ? `-${zaehler}` : `-\\left(${zaehler}\\right)`)
  : `${m < 0 ? '-' : ''}\\frac{${zaehler}}{${Math.abs(m)}}`;

Object.assign(INHALTE, {

  // ===== Basisfach II.2 · Leistungsfach II.2 =====
  'Exponentialgleichungen und natürlicher Logarithmus': {
    video: null,
    kurz: String.raw`Bei welchem \(x\) hat \(e^x\) den Wert 3? Die Antwort heißt \(\ln(3)\), der <b>natürliche Logarithmus</b> von 3. Mit \(\ln\) löst man Gleichungen, in denen die Unbekannte im Exponenten steht.`,
    merk: {
      zeilen: [
        ['Lösen', String.raw`e^x = b \;\Leftrightarrow\; x = \ln(b) \qquad (b > 0)`],
        ['Umkehrung', String.raw`e^{\ln(b)} = b, \qquad \ln(e^c) = c`],
        ['Besondere Werte', String.raw`\ln(1) = 0, \qquad \ln(e) = 1`],
        ['Keine Lösung', String.raw`e^x = b \text{ mit } b \le 0, \text{ denn } e^x > 0`],
      ],
      text: String.raw`Vorgehen: den e-Term allein auf eine Seite bringen, prüfen, ob die andere Seite positiv ist, dann auf beiden Seiten \(\ln\) anwenden.`,
    },
    erklaerung: String.raw`<p>Am Graphen: Die Lösung von \(e^x = 3\) ist die x-Koordinate des Schnittpunkts von \(y = e^x\) mit der Geraden \(y = 3\).
      Weil \(e^x\) immer positiv ist und streng monoton steigt, gibt es für jedes \(b > 0\) genau eine Lösung – und für \(b \le 0\) keine.</p>`
      + graph({ x: [-3, 3], y: [-1, 5], kurven: [{ f: Math.exp, kl: 'k1', label: 'y = eˣ', lx: 1.45 }, { f: () => 3, kl: 'k2', label: 'y = 3', lx: -2.8 }],
        punkte: [{ x: Math.log(3), y: 3 }, { x: Math.log(3), y: 0, label: 'ln(3) ≈ 1,1' }] })
      + String.raw`<p><b>Drei Strategien</b></p>
      <ol class="steps">
        <li><b>Isolieren:</b> \(2e^{3x} - 1 = 9 \;\Rightarrow\; e^{3x} = 5 \;\Rightarrow\; 3x = \ln(5)\)</li>
        <li><b>Ausklammern (Satz vom Nullprodukt):</b> \(e^{2x} - 4e^x = 0 \;\Rightarrow\; e^x\,(e^x - 4) = 0\). Da \(e^x \ne 0\), bleibt \(e^x = 4\).</li>
        <li><b>Substitution</b> \(u = e^x\): \(e^{2x} - 5e^x + 6 = 0 \;\Rightarrow\; u^2 - 5u + 6 = 0\). Danach zurück: \(e^x = u\).</li>
      </ol>`,
    beispiel: {
      aufgabe: String.raw`Löse die Gleichung \(2e^{0{,}5x} - 3 = 7\) und gib einen Näherungswert auf drei Dezimalen an.`,
      schritte: [
        String.raw`e-Term isolieren: \(2e^{0{,}5x} = 10 \;\Rightarrow\; e^{0{,}5x} = 5\)`,
        String.raw`\(5 > 0\), also \(\ln\) anwenden: \(0{,}5x = \ln(5)\)`,
        String.raw`\(x = 2\ln(5) \approx 3{,}219\)`,
        String.raw`Probe: \(2e^{\ln(5)} - 3 = 2\cdot 5 - 3 = 7\) ✓`,
      ],
    },
    fehler: String.raw`<b>Typische Fehler:</b> \(\ln\) auf einzelne Summanden anwenden: Aus \(e^x + 5 = 9\) folgt <i>nicht</i> \(x + \ln(5) = \ln(9)\) – erst isolieren: \(e^x = 4\), \(x = \ln(4)\).<br>
      Beim Ausklammern \(e^x = 0\) „lösen“: \(e^x\) ist nie 0, dieser Faktor liefert keine Lösung.`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Löse: a) \(e^x = 8\) &nbsp; b) \(e^x = 0{,}2\) &nbsp; c) \(e^x = -1\)`,
        loesung: String.raw`a) \(x = \ln(8) \approx 2{,}079\) &nbsp; b) \(x = \ln(0{,}2) \approx -1{,}609\) &nbsp; c) keine Lösung, da \(e^x > 0\).` },
      { niveau: 1, aufgabe: String.raw`Vereinfache: a) \(\ln(e^5)\) &nbsp; b) \(e^{\ln(7)}\) &nbsp; c) \(\ln\!\left(\frac{1}{e^2}\right)\) &nbsp; d) \(\ln(\sqrt{e})\)`,
        loesung: String.raw`a) \(5\) &nbsp; b) \(7\) &nbsp; c) \(\ln(e^{-2}) = -2\) &nbsp; d) \(\ln\!\left(e^{\frac12}\right) = \frac12\)` },
      { niveau: 2, aufgabe: String.raw`Löse \(4e^{3x} = 20\).`,
        loesung: String.raw`\(e^{3x} = 5 \;\Rightarrow\; 3x = \ln(5) \;\Rightarrow\; x = \frac{\ln(5)}{3} \approx 0{,}536\)` },
      { niveau: 2, aufgabe: String.raw`Löse \(6 - 2e^{-x} = 1\).`,
        loesung: String.raw`\(2e^{-x} = 5 \;\Rightarrow\; e^{-x} = 2{,}5 \;\Rightarrow\; -x = \ln(2{,}5) \;\Rightarrow\; x = -\ln(2{,}5) \approx -0{,}916\)` },
      { niveau: 2, aufgabe: String.raw`Löse \(e^{2x} - 4e^x = 0\).`,
        loesung: String.raw`\(e^x\,(e^x - 4) = 0\). Da \(e^x \ne 0\): \(e^x = 4 \;\Rightarrow\; x = \ln(4) \approx 1{,}386\)` },
      { niveau: 3, aufgabe: String.raw`Löse \(e^{2x} - 7e^x + 12 = 0\).`,
        loesung: String.raw`\(u = e^x\): \(u^2 - 7u + 12 = 0 \;\Rightarrow\; u = 3\) oder \(u = 4\).<br>
          \(e^x = 3 \Rightarrow x = \ln(3) \approx 1{,}099\); \(e^x = 4 \Rightarrow x = \ln(4) \approx 1{,}386\)` },
      { niveau: 3, aufgabe: String.raw`Ein Tee kühlt ab: \(T(t) = 20 + 60e^{-0{,}1t}\) (\(t\) in Minuten, \(T\) in °C). Wann ist er auf 50 °C abgekühlt?`,
        loesung: String.raw`\(60e^{-0{,}1t} = 30 \;\Rightarrow\; e^{-0{,}1t} = 0{,}5 \;\Rightarrow\; -0{,}1t = \ln(0{,}5) \;\Rightarrow\; t = -10\ln(0{,}5) \approx 6{,}93\).<br>Nach knapp 7 Minuten.` },
      { niveau: 2, kurs: 'lk', aufgabe: String.raw`Löse \(3^x = 20\).`,
        loesung: String.raw`\(\ln(3^x) = \ln(20) \;\Rightarrow\; x\cdot\ln(3) = \ln(20) \;\Rightarrow\; x = \frac{\ln(20)}{\ln(3)} \approx 2{,}727\)` },
      { niveau: 3, kurs: 'bf', aufgabe: String.raw`Schreibe \(2^x\) als Potenz mit der Basis \(e\) und löse damit \(2^x = 10\).`,
        loesung: String.raw`\(2 = e^{\ln(2)}\), also \(2^x = \left(e^{\ln(2)}\right)^x = e^{x\ln(2)}\).<br>
          \(e^{x\ln(2)} = 10 \;\Rightarrow\; x\ln(2) = \ln(10) \;\Rightarrow\; x = \frac{\ln(10)}{\ln(2)} \approx 3{,}322\)` },
      { niveau: 3, kurs: 'lk', aufgabe: String.raw`Löse \(\ln(x) + \ln(4) = \ln(12)\) für \(x > 0\).`,
        loesung: String.raw`Logarithmengesetz: \(\ln(4x) = \ln(12) \;\Rightarrow\; 4x = 12 \;\Rightarrow\; x = 3\)` },
    ],
    // Lösung prüfen: genau ein Schritt (fehler, ab 0 gezählt) ist falsch
    pruefen: [
      { aufgabe: String.raw`Löse \(3e^{2x} + 1 = 13\).`,
        schritte: [
          String.raw`\(3e^{2x} = 12\)`,
          String.raw`\(e^{2x} = 4\)`,
          String.raw`\(2x = \ln(4)\)`,
          String.raw`\(x = 2\ln(4) \approx 2{,}773\)`,
        ],
        fehler: 3,
        erklaerung: String.raw`Durch 2 teilen, nicht mit 2 multiplizieren: \(x = \frac{\ln(4)}{2} \approx 0{,}693\).` },
      { aufgabe: String.raw`Löse \(e^x + 5 = 9\).`,
        schritte: [
          String.raw`\(\ln\) anwenden: \(x + \ln(5) = \ln(9)\)`,
          String.raw`\(x = \ln(9) - \ln(5)\)`,
          String.raw`\(x \approx 0{,}588\)`,
        ],
        fehler: 0,
        erklaerung: String.raw`\(\ln\) darf nicht auf einzelne Summanden angewendet werden. Erst isolieren: \(e^x = 4\), also \(x = \ln(4) \approx 1{,}386\).` },
      { aufgabe: String.raw`Löse \(x\,e^x - 2e^x = 0\).`,
        schritte: [
          String.raw`Ausklammern: \(e^x\,(x - 2) = 0\)`,
          String.raw`\(e^x = 0 \;\Rightarrow\; x = 0\)`,
          String.raw`\(x - 2 = 0 \;\Rightarrow\; x = 2\)`,
          String.raw`Lösungen: \(x = 0\) und \(x = 2\)`,
        ],
        fehler: 1,
        erklaerung: String.raw`\(e^x\) ist nie 0 (auch \(e^0 = 1\)). Dieser Faktor liefert keine Lösung – einzige Lösung ist \(x = 2\).` },
      { aufgabe: String.raw`Löse \(e^{2x} - e^x - 2 = 0\).`,
        schritte: [
          String.raw`\(u = e^x\): \(u^2 - u - 2 = 0\)`,
          String.raw`\(u = 2\) oder \(u = -1\)`,
          String.raw`\(e^x = 2 \;\Rightarrow\; x = \ln(2) \approx 0{,}693\)`,
          String.raw`\(e^x = -1 \;\Rightarrow\; x = -\ln(1) = 0\)`,
          String.raw`Lösungen: \(x = 0\) und \(x \approx 0{,}693\)`,
        ],
        fehler: 3,
        erklaerung: String.raw`\(e^x = -1\) hat keine Lösung, weil \(e^x > 0\) ist. Einzige Lösung: \(x = \ln(2) \approx 0{,}693\).` },
    ],
    generator: {
      // a·e^(kx) = c
      1: () => {
        const a = zuf(1, 5), k = nichtNull(-3, 3), b = zuf(2, 9), ex = `e^{${koef(k)}x}`;
        if (Math.random() < .2) return { aufgabe: `${koef(a)}${ex} = ${-a * b}`,
          schritte: [`${ex} = ${-b} < 0`, `\\text{keine Lösung, da } e^{${koef(k)}x} > 0`], pruef: [] };
        const x = Math.log(b) / k;
        return { aufgabe: `${koef(a)}${ex} = ${a * b}`,
          schritte: [...(a > 1 ? [`${ex} = ${b}`] : []), `${koef(k)}x = \\ln(${b})`, `x = ${geteilt(`\\ln(${b})`, k, true)} \\approx ${dez3(x)}`],
          pruef: [[a * Math.exp(k * x), a * b]] };
      },
      // a·e^(mx + d) + c = r
      2: () => {
        const a = zuf(2, 5), m = nichtNull(-3, 3), d = nichtNull(-4, 4), b = zuf(2, 9), c = nichtNull(-6, 6), r = a * b + c;
        const ex = `e^{${summe([[m, 'x'], [d, '']])}}`, x = (Math.log(b) - d) / m;
        return { aufgabe: `${a}${ex} ${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${r}`,
          schritte: [`${a}${ex} = ${a * b}`, `${ex} = ${b}`, `${summe([[m, 'x'], [d, '']])} = \\ln(${b})`,
                     `x = ${geteilt(`\\ln(${b}) ${d < 0 ? '+' : '-'} ${Math.abs(d)}`, m, false)} \\approx ${dez3(x)}`],
          pruef: [[a * Math.exp(m * x + d) + c, r]] };
      },
      // Substitution e^(2x) - (p+q)e^x + pq = 0 oder Ausklammern
      3: () => {
        if (Math.random() < .5) {
          const p = zuf(1, 6); let q; do q = zuf(-4, 8); while (q === p || q === 0);
          const loes = [p, q].filter(u => u > 0), xs = loes.map(Math.log);
          return { aufgabe: `${summe([[1, 'e^{2x}'], [-(p + q), 'e^{x}'], [p * q, '']])} = 0`,
            schritte: [`u = e^x:\\; ${summe([[1, 'u^{2}'], [-(p + q), 'u'], [p * q, '']])} = 0`, `u = ${Math.min(p, q)} \\text{ oder } u = ${Math.max(p, q)}`,
                       ...[p, q].sort((s, t) => s - t).map(u => u > 0 ? `e^x = ${u} \\;\\Rightarrow\\; x = ${u === 1 ? '\\ln(1) = 0' : `\\ln(${u}) \\approx ${dez3(Math.log(u))}`}` : `e^x = ${u} \\;\\text{hat keine Lösung}`)],
            pruef: xs.map(x => [Math.exp(2 * x) - (p + q) * Math.exp(x) + p * q, 0]) };
        }
        const a = nichtNull(-4, 4), b = zuf(2, 9), k = wahl([1, 2, -1]);
        const ek = `e^{${koef(k)}x}`, f = x => a * x * Math.exp(k * x) - a * b * Math.exp(k * x);
        return { aufgabe: `${a === 1 ? '' : a === -1 ? '-' : a}x\\,${ek} ${a * b < 0 ? '+' : '-'} ${Math.abs(a * b)}${ek} = 0`,
          schritte: [`${ek}\\,(${summe([[a, 'x'], [-a * b, '']])}) = 0`, `${ek} \\ne 0, \\text{ also } ${summe([[a, 'x'], [-a * b, '']])} = 0`, `x = ${b}`],
          pruef: [[f(b), 0]] };
      },
    },
    test: [
      { frage: String.raw`Welchen Wert hat \(\ln(1)\)?`,
        optionen: ['1', '0', 'e'],
        richtig: 1, erklaerung: String.raw`\(e^0 = 1\), also \(\ln(1) = 0\).` },
      { frage: String.raw`Die Gleichung \(e^x = -4\) …`,
        optionen: ['hat keine Lösung', String.raw`hat die Lösung \(x = -\ln(4)\)`, String.raw`hat die Lösung \(x = \ln(-4)\)`],
        richtig: 0, erklaerung: String.raw`\(e^x\) ist immer positiv, kann also nie \(-4\) sein.` },
      { frage: String.raw`Die Lösung von \(e^{3x} = 6\) ist …`,
        optionen: [String.raw`\(x = 3\ln(6)\)`, String.raw`\(x = \ln(6) - 3\)`, String.raw`\(x = \frac{\ln(6)}{3}\)`],
        richtig: 2, erklaerung: String.raw`\(3x = \ln(6)\), dann durch 3 teilen.` },
    ],
  },
});

// ---- II.1 Die natürliche Exponentialfunktion: Basisfach nur lineare Verkettung und Produktregel, LK auch Kettenregel ----
// Summand mit Vorzeichen: + 3 bzw. - 3, bei 0 leer
const plus = c => c ? ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}` : '';

const genExp1 = () => {
  const a = nichtNull(-5, 5), n = zuf(2, 4), b = nichtNull(-6, 6), c = zuf(-9, 9);
  const f = x => a * Math.exp(x) + b * x ** n + c, df = x => a * Math.exp(x) + b * n * x ** (n - 1);
  return { aufgabe: `f(x) = ${summe([[a, 'e^{x}'], [b, pot(n)], [c, '']])}`,
    schritte: [`(e^x)' = e^x,\; \\text{Rest mit Potenz- und Faktorregel, die Konstante fällt weg}`, `f'(x) = ${summe([[a, 'e^{x}'], [b * n, pot(n - 1)]])}`],
    pruef: pruefAbl(f, df) };
};
const genExp2 = () => {
  const a = nichtNull(-4, 4), m = wahl([-3, -2, -1, 2, 3, 4]), c = zuf(-3, 3), innen = summe([[m, 'x'], [c, '']]);
  const f = x => a * Math.exp(m * x + c), df = x => a * m * Math.exp(m * x + c);
  return { aufgabe: `f(x) = ${koef(a)}e^{${innen}}`,
    schritte: [`\\text{innere Ableitung: } (${innen})' = ${m}`, `f'(x) = ${a}\\cdot ${kl(m)}\\cdot e^{${innen}} = ${koef(a * m)}e^{${innen}}`],
    pruef: pruefAbl(f, df) };
};
// (px + q)·e^(mx) mit der Produktregel
const genExp3 = () => {
  const p = nichtNull(-3, 3), q = zuf(-4, 4), m = wahl([-2, -1, 1, 2]), ex = `e^{${koef(m)}x}`;
  const f = x => (p * x + q) * Math.exp(m * x), df = x => (m * p * x + p + m * q) * Math.exp(m * x);
  return { aufgabe: `f(x) = (${summe([[p, 'x'], [q, '']])})\\,${ex}`,
    schritte: [`u = ${summe([[p, 'x'], [q, '']])},\; u' = ${p},\; v = ${ex},\; v' = ${koef(m)}${ex}`,
               `f'(x) = ${p}\\cdot ${ex} + (${summe([[p, 'x'], [q, '']])})\\cdot ${kl(m)}\\,${ex}`,
               `f'(x) = (${summe([[m * p, 'x'], [p + m * q, '']])})\\,${ex}`],
    pruef: pruefAbl(f, df) };
};
// LK: c·e^(ax² + bx) mit der Kettenregel
const genExp3LK = () => {
  const c = nichtNull(-3, 3), a = nichtNull(-2, 2), b = zuf(-3, 3), innen = summe([[a, 'x^{2}'], [b, 'x']]);
  const f = x => c * Math.exp(a * x * x + b * x), df = x => c * (2 * a * x + b) * Math.exp(a * x * x + b * x);
  return { aufgabe: `f(x) = ${koef(c)}e^{${innen}}`,
    schritte: [`\\text{Kettenregel, innere Ableitung: } ${summe([[2 * a, 'x'], [b, '']])}`,
               `f'(x) = ${c === 1 ? '' : c + '\\cdot '}(${summe([[2 * a, 'x'], [b, '']])})\\,e^{${innen}}${c === 1 ? '' : ` = (${summe([[2 * a * c, 'x'], [b * c, '']])})\\,e^{${innen}}`}`],
    pruef: pruefAbl(f, df) };
};

const erklExp = String.raw`<p>Für jede Exponentialfunktion \(f(x) = b^x\) ist die Ableitung proportional zur Funktion selbst: \(f'(x) = f'(0)\cdot f(x)\).
  Bei \(b = 2\) ist der Faktor etwa \(0{,}69\), bei \(b = 3\) etwa \(1{,}10\). Dazwischen liegt genau eine Basis mit Faktor 1 – die Euler’sche Zahl \(e \approx 2{,}718\).
  Für sie gilt \(f'(x) = f(x)\): Die Steigung des Graphen ist an jeder Stelle so groß wie der Funktionswert.</p>`
  + graph({ x: [-3, 2], y: [-1, 4], kurven: [{ f: Math.exp, kl: 'k1', label: 'y = eˣ', lx: 1.05 }, { f: x => x + 1, kl: 'k3', label: 'Tangente in (0|1)', lx: -2.9 }],
    punkte: [{ x: 0, y: 1, label: '(0|1)' }, { x: 1, y: Math.E, label: '(1|e)' }] })
  + String.raw`<p>Weil \(e^x > 0\) ist, gilt auch \(f'(x) > 0\) und \(f''(x) > 0\): Der Graph steigt streng monoton, ist linksgekrümmt, hat keine Nullstellen, Extrem- oder Wendepunkte.
  Für \(x \to -\infty\) nähert er sich der x-Achse, für \(x \to +\infty\) wächst er über alle Grenzen.</p>
  <p>Verschieben und Spiegeln wie gewohnt: \(e^{x-2}\) ist um 2 nach rechts verschoben, \(e^x + 1\) um 1 nach oben, \(-e^x\) an der x-Achse und \(e^{-x}\) an der y-Achse gespiegelt.</p>`;

// ---- II.3 Exponentialfunktionen und ihre Graphen ----
const grenzeTex = g => g === Infinity ? '+\\infty' : g === -Infinity ? '-\\infty' : String(g);
const genGraph1 = () => {
  const a = nichtNull(-3, 3), n = zuf(1, 4), s = wahl([1, -1]), c = zuf(-3, 3), ex = s > 0 ? 'e^{x}' : 'e^{-x}';
  const f = x => a * x ** n * Math.exp(s * x) + c;
  const plusUnendl = s < 0 ? c : Math.sign(a) * Infinity, minusUnendl = s > 0 ? c : Math.sign(a) * (n % 2 ? -1 : 1) * Infinity;
  const pr = (x, g) => isFinite(g) ? [f(x), g] : [Math.sign(f(x)), Math.sign(g)];
  return { aufgabe: `\\text{Verhalten für } x \\to \\pm\\infty:\; f(x) = ${summe([[a, pot(n) + '\\,' + ex], [c, '']])}`,
    schritte: [`x \\to +\\infty:\; ${s < 0 ? `e^{-x} \\to 0 \\text{ setzt sich gegen } ${pot(n)} \\text{ durch}` : `${pot(n)} \\to +\\infty,\; e^{x} \\to +\\infty`},\; f(x) \\to ${grenzeTex(plusUnendl)}`,
               `x \\to -\\infty:\; ${s > 0 ? `e^{x} \\to 0 \\text{ setzt sich gegen } ${pot(n)} \\text{ durch}` : `${pot(n)} \\to ${n % 2 ? '-' : '+'}\\infty,\; e^{-x} \\to +\\infty`},\; f(x) \\to ${grenzeTex(minusUnendl)}`,
               `\\text{Waagerechte Asymptote: } y = ${c} \\text{ für } x \\to ${s < 0 ? '+' : '-'}\\infty`],
    pruef: [pr(60, plusUnendl), pr(-60, minusUnendl)] };
};
// (x - p)·e^(kx): Extremstelle x = p - 1/k
const genGraph2 = () => {
  const p = zuf(-3, 3), k = wahl([-2, -1, 1, 2]), x0 = p - 1 / k, ex = `e^{${koef(k)}x}`;
  const f = x => (x - p) * Math.exp(k * x), y0 = f(x0), e0 = k * p - 1;
  const vorE = k === 1 ? '-' : k === -1 ? '' : bruch(-1, k);
  return { aufgabe: `\\text{Extrempunkt von } f(x) = ${xm(p)}\\,${ex}`,
    schritte: [`f'(x) = ${ex} + ${xm(p)}\\cdot ${k === 1 ? '' : kl(k) + '\\,'}${ex} = (${summe([[k, 'x'], [1 - k * p, '']])})\\,${ex}`,
               `f'(x) = 0 \;\\Leftrightarrow\; ${summe([[k, 'x'], [1 - k * p, '']])} = 0 \;\\Rightarrow\; x = ${dez(x0)}`,
               `f''(${dez(x0)}) = ${koef(k)}e^{${e0}} ${k > 0 ? '> 0 \\Rightarrow \\text{Tiefpunkt}' : '< 0 \\Rightarrow \\text{Hochpunkt}'}`,
               `f(${dez(x0)}) = ${vorE}e^{${e0}} \\approx ${dez3(y0)} \;\\Rightarrow\; ${k > 0 ? 'T' : 'H'}(${dez(x0)}\\mid ${dez3(y0)})`],
    pruef: [[ableitung(f, x0), 0], [Math.sign(abl2(f, x0)), Math.sign(k)]] };
};
// e^(2x) - a·e^x: Tiefpunkt bei x = ln(a/2)
const genGraph3 = () => {
  const a = zuf(2, 8), x0 = Math.log(a / 2), f = x => Math.exp(2 * x) - a * Math.exp(x);
  const lnTex = a === 2 ? '\\ln(1) = 0' : `\\ln${a % 2 ? `\\left(${bruch(a, 2)}\\right)` : `(${a / 2})`} \\approx ${dez3(x0)}`;
  return { aufgabe: `\\text{Extrempunkt von } f(x) = e^{2x} - ${a}e^{x}`,
    schritte: [`f'(x) = 2e^{2x} - ${a}e^{x} = e^{x}\\,(2e^{x} - ${a})`, `e^x \\ne 0:\; e^{x} = ${bruch(a, 2)} \;\\Rightarrow\; x = ${lnTex}`,
               `f''(x) = 4e^{2x} - ${a}e^{x},\; f''(x_0) = ${bruch(a * a, 2)} > 0 \;\\Rightarrow\; \\text{Tiefpunkt}`,
               `f(x_0) = ${bruch(a * a, 4)} - ${bruch(a * a, 2)} = ${bruch(-a * a, 4)}`],
    pruef: [[ableitung(f, x0), 0], [f(x0), -a * a / 4], [abl2(f, x0), a * a / 2]] };
};

// ---- II.4 Parameter: Basisfach „Wirkung von Parametern …“, LK „… mit Parameter“ (dort mit dem Begriff Funktionenschar) ----
const genPar1 = () => {
  const a = nichtNull(-3, 3), m = nichtNull(-3, 3), c = zuf(-4, 4), f = x => m * Math.exp(x - a) + c;
  return { aufgabe: `f_a(x) = ${summe([[m, 'e^{x-a}'], [c, '']])}:\; f_{${a}}(${a}) \\text{ und } f_{${a}}(${a + 1})`,
    schritte: [`f_{${a}}(x) = ${summe([[m, `e^{x ${a < 0 ? '+' : '-'} ${Math.abs(a)}}`], [c, '']])}`,
               `f_{${a}}(${a}) = ${m}\\cdot e^{0}${plus(c)} = ${m + c}`, `f_{${a}}(${a + 1}) = ${m}\\cdot e^{1}${plus(c)} \\approx ${dez3(m * Math.E + c)}`],
    pruef: [[f(a), m + c], [f(a + 1), m * Math.E + c]] };
};
const genPar2 = () => {
  const b = zuf(2, 9), x0 = nichtNull(-3, 3), c = zuf(-3, 3), k = Math.log(b) / x0;
  return { aufgabe: `f_k(x) = e^{kx}${plus(c)}:\; \\text{Für welches } k \\text{ liegt } P(${x0}\\mid ${b + c}) \\text{ auf dem Graphen?}`,
    schritte: [`e^{${x0}k}${plus(c)} = ${b + c} \;\\Rightarrow\; e^{${x0}k} = ${b}`, `${x0}k = \\ln(${b}) \;\\Rightarrow\; k = ${geteilt(`\\ln(${b})`, x0, true)} \\approx ${dez3(k)}`],
    pruef: [[Math.exp(k * x0) + c, b + c]] };
};
const genPar3 = () => {
  const a = zuf(2, 6), x0 = Math.log(a), f = x => Math.exp(2 * x) - 2 * a * Math.exp(x);
  return { aufgabe: `f_a(x) = e^{2x} - 2a\\,e^{x}\; (a > 0):\; \\text{Extrempunkt allgemein, dann für } a = ${a}`,
    schritte: [`f_a'(x) = 2e^{2x} - 2a\\,e^{x} = 2e^{x}\\,(e^{x} - a) = 0 \;\\Rightarrow\; x = \\ln(a)`,
               `f_a''(x) = 4e^{2x} - 2a\\,e^{x},\; f_a''(\\ln(a)) = 2a^2 > 0 \;\\Rightarrow\; \\text{Tiefpunkt}`,
               `f_a(\\ln(a)) = a^2 - 2a^2 = -a^2 \;\\Rightarrow\; T_a(\\ln(a)\\mid -a^2)`,
               `a = ${a}:\; T(\\ln(${a})\\mid ${-a * a}) \\approx T(${dez3(x0)}\\mid ${-a * a})`],
    pruef: [[ableitung(f, x0), 0], [f(x0), -a * a], [abl2(f, x0), 2 * a * a]] };
};

const paramGemeinsam = {
  video: null,
  labor: { f: 'e^(x-a)' },
  erklaerung: String.raw`<p>Die Graphen von \(g_a(x) = e^{x-a}\) für \(a = -1\), \(a = 0\) und \(a = 2\): Jeder Wert von \(a\) liefert eine eigene Funktion. Erhöht man \(a\), wandert der Graph nach rechts.</p>`
    + graph({ x: [-3, 4], y: [-1, 4], kurven: [{ f: x => Math.exp(x + 1), kl: 'k2', label: 'a = −1', lx: -1.5 }, { f: Math.exp, kl: 'k1', label: 'a = 0', lx: 0.9 },
      { f: x => Math.exp(x - 2), kl: 'k3', label: 'a = 2', lx: 3.05 }] })
    + String.raw`<p>Typische Fragen: Wie wirkt sich der Parameter auf den Graphen aus? Für welchen Wert geht der Graph durch einen Punkt oder hat eine bestimmte Steigung?
      Wo liegen Extrempunkte – in Abhängigkeit vom Parameter?</p>`,
  beispiel: {
    aufgabe: String.raw`Für jedes \(a > 0\) ist \(f_a(x) = e^{2x} - 2a\,e^x\) gegeben. Bestimme den Extrempunkt in Abhängigkeit von \(a\).`,
    schritte: [
      String.raw`\(f_a'(x) = 2e^{2x} - 2a\,e^x = 2e^x\,(e^x - a)\) – der Parameter wird beim Ableiten wie eine Zahl behandelt.`,
      String.raw`\(e^x \ne 0\), also \(e^x = a\) und \(x = \ln(a)\).`,
      String.raw`\(f_a''(x) = 4e^{2x} - 2a\,e^x\), \(f_a''(\ln(a)) = 4a^2 - 2a^2 = 2a^2 > 0\): Tiefpunkt.`,
      String.raw`\(f_a(\ln(a)) = a^2 - 2a^2 = -a^2\), also \(T_a(\ln(a)\mid -a^2)\). Für \(a = 3\): \(T(\ln(3)\mid -9) \approx T(1{,}099\mid -9)\).`,
    ],
  },
  fehler: String.raw`<b>Typische Fehler:</b> Den Parameter beim Ableiten wie eine Variable behandeln: \((a\,e^x)' = a\,e^x\), nicht \(e^x\). Oder \(e^{x-a}\) als Verschiebung nach <i>links</i> deuten – bei \(x - a\) mit \(a > 0\) geht es nach rechts.`,
  uebungen: [
    { niveau: 1, aufgabe: String.raw`Gegeben ist \(f_a(x) = a\,e^x - 2\). Gib \(f_3(x)\) an und berechne \(f_{-1}(0)\).`,
      loesung: String.raw`\(f_3(x) = 3e^x - 2\); \(f_{-1}(0) = -e^0 - 2 = -3\).` },
    { niveau: 1, aufgabe: String.raw`Wie wirkt sich bei \(g_b(x) = e^x + b\) eine Erhöhung von \(b\) aus? Welche Asymptote hat der Graph?`,
      loesung: String.raw`Der Graph wird um \(b\) nach oben verschoben. Für \(x \to -\infty\) gilt \(g_b(x) \to b\): waagerechte Asymptote \(y = b\).` },
    { niveau: 2, aufgabe: String.raw`Für welches \(c\) geht der Graph von \(f_c(x) = c\,e^{0{,}5x}\) durch \(P(2\mid 5)\)?`,
      loesung: String.raw`\(c\,e^{1} = 5 \;\Rightarrow\; c = \frac{5}{e} \approx 1{,}839\).` },
    { niveau: 2, aufgabe: String.raw`Gegeben ist \(f_k(x) = e^{kx}\). Für welches \(k\) hat der Graph bei \(x = 0\) die Steigung 3? Für welches \(k\) geht er durch \(Q(1\mid 4)\)?`,
      loesung: String.raw`\(f_k'(x) = k\,e^{kx}\), \(f_k'(0) = k = 3\).<br>\(e^{k} = 4 \;\Rightarrow\; k = \ln(4) \approx 1{,}386\).` },
    { niveau: 2, aufgabe: String.raw`Leite ab: \(f_a(x) = a\,x\,e^{2x}\).`,
      loesung: String.raw`Produktregel: \(f_a'(x) = a\,e^{2x} + a\,x\cdot 2e^{2x} = a\,(1 + 2x)\,e^{2x}\).` },
    { niveau: 3, aufgabe: String.raw`Bestimme den Tiefpunkt von \(f_a(x) = x\,e^{x-a}\). Wie verändert er sich, wenn \(a\) größer wird?`,
      loesung: String.raw`\(f_a'(x) = (1 + x)\,e^{x-a} = 0 \Rightarrow x = -1\); \(f_a''(x) = (2 + x)\,e^{x-a}\), \(f_a''(-1) > 0\).<br>
        \(T_a(-1\mid -e^{-1-a})\). Mit wachsendem \(a\) bleibt die Stelle \(x = -1\), der Tiefpunkt rückt näher an die x-Achse.` },
    { niveau: 3, aufgabe: String.raw`Eine Pflanze wächst nach \(h_k(t) = 2 - 1{,}5\,e^{-kt}\) (\(k > 0\), \(t\) in Wochen, \(h\) in m). Wie hoch ist sie am Anfang, wie hoch langfristig? Bestimme \(k\), wenn sie nach 4 Wochen 1,7 m hoch ist.`,
      loesung: String.raw`\(h_k(0) = 0{,}5\) m; für \(t \to \infty\) gilt \(e^{-kt} \to 0\), also langfristig 2 m.<br>
        \(2 - 1{,}5e^{-4k} = 1{,}7 \Rightarrow e^{-4k} = 0{,}2 \Rightarrow k = -\frac{\ln(0{,}2)}{4} = \frac{\ln(5)}{4} \approx 0{,}402\).` },
  ],
  generator: { 1: genPar1, 2: genPar2, 3: genPar3 },
  test: [
    { frage: String.raw`Wie entsteht der Graph von \(e^{x-3}\) aus dem von \(e^x\)?`,
      optionen: ['Verschiebung um 3 nach rechts', 'Verschiebung um 3 nach links', 'Verschiebung um 3 nach unten'],
      richtig: 0, erklaerung: String.raw`Den Wert \(e^0 = 1\) erreicht \(e^{x-3}\) erst bei \(x = 3\).` },
    { frage: String.raw`Die Ableitung von \(f_a(x) = e^{ax}\) ist …`,
      optionen: [String.raw`\(e^{ax}\)`, String.raw`\(a\,e^{ax}\)`, String.raw`\(x\,e^{ax}\)`],
      richtig: 1, erklaerung: String.raw`\(a\) wird wie eine Zahl behandelt, innere Ableitung von \(ax\) ist \(a\).` },
    { frage: String.raw`Welche waagerechte Asymptote hat \(e^x + b\)?`,
      optionen: [String.raw`\(y = 0\)`, String.raw`\(y = b\)`, 'keine'],
      richtig: 1, erklaerung: String.raw`Für \(x \to -\infty\) geht \(e^x \to 0\), also \(e^x + b \to b\).` },
  ],
};

// ---- II.5 Umkehrfunktion (nur LK) ----
const genUmk1 = () => {
  const m = nichtNull(-5, 5), c = nichtNull(-6, 6), u = x => (x - c) / m;
  return { aufgabe: `\\text{Umkehrfunktion von } f(x) = ${summe([[m, 'x'], [c, '']])}`,
    schritte: [`y = ${summe([[m, 'x'], [c, '']])} \;\\Rightarrow\; x = ${geteilt(`y${plus(-c)}`, m, false)}`, `\\bar f(x) = ${geteilt(`x${plus(-c)}`, m, false)}`],
    pruef: [[m * u(1.7) + c, 1.7]] };
};
const genUmk2 = () => {
  const a = zuf(1, 3), p = zuf(-3, 3), q = zuf(-4, 4), u = x => p + Math.sqrt((x - q) / a);
  const wurzel = a === 1 ? `\\sqrt{x${plus(-q)}}` : `\\sqrt{\\frac{x${plus(-q)}}{${a}}}`;
  return { aufgabe: `f(x) = ${koef(a)}${p ? xm(p) + '^{2}' : 'x^{2}'}${plus(q)},\; D_f = [${p};\\,\\infty[`,
    schritte: [`W_f = [${q};\\,\\infty[,\; \\text{auf } D_f \\text{ streng monoton steigend}`, `y${plus(-q)} = ${koef(a)}${p ? xm(p) + '^{2}' : 'x^{2}'} \;\\Rightarrow\; x = ${p ? p + ' + ' : ''}${wurzel.replace(/x/, 'y')} \;(x \\ge ${p})`,
               `\\bar f(x) = ${p ? p + ' + ' : ''}${wurzel},\; D_{\\bar f} = [${q};\\,\\infty[`],
    pruef: [[a * (u(q + 2) - p) ** 2 + q, q + 2]] };
};
const genUmk3 = () => {
  const a = zuf(1, 4), k = nichtNull(-2, 2), c = zuf(-3, 3), u = x => Math.log((x - c) / a) / k;
  const innen = a === 1 ? `x${plus(-c)}` : `\\frac{x${plus(-c)}}{${a}}`;
  return { aufgabe: `\\text{Umkehrfunktion von } f(x) = ${koef(a)}e^{${koef(k)}x}${plus(c)}`,
    schritte: [`W_f = ]${c};\\,\\infty[ \\text{, denn } e^{${koef(k)}x} > 0`, `y${plus(-c)} = ${koef(a)}e^{${koef(k)}x} \;\\Rightarrow\; ${koef(k)}x = \\ln\\left(${innen.replace(/x/, 'y')}\\right)`,
               `\\bar f(x) = ${geteilt(`\\ln\\left(${innen}\\right)`, k, true)},\; D_{\\bar f} = ]${c};\\,\\infty[`],
    pruef: [[a * Math.exp(k * u(c + 2.5)) + c, c + 2.5]] };
};

// ---- II.6 Logarithmusfunktion (nur LK) ----
const lnBruch = (z, nenner) => `${z < 0 ? '-' : ''}\\frac{${Math.abs(z)}}{${nenner}}`;
const genLn1 = () => {
  const a = nichtNull(-5, 5), n = zuf(2, 4), b = nichtNull(-4, 4), c = zuf(-6, 6);
  const f = x => a * Math.log(x) + b * x ** n + c, df = x => a / x + b * n * x ** (n - 1);
  return { aufgabe: `f(x) = ${summe([[a, '\\ln(x)'], [b, pot(n)], [c, '']])},\; x > 0`,
    schritte: [`(\\ln(x))' = \\frac{1}{x}`, `f'(x) = ${lnBruch(a, 'x')} ${b * n < 0 ? '-' : '+'} ${koef(Math.abs(b * n))}${pot(n - 1)}`],
    pruef: pruefAbl(f, df) };
};
const genLn2 = () => {
  const a = nichtNull(-4, 4), m = zuf(1, 4), c = zuf(0, 5), innen = summe([[m, 'x'], [c, '']]);
  const f = x => a * Math.log(m * x + c), df = x => a * m / (m * x + c);
  return { aufgabe: `f(x) = ${koef(a)}\\ln(${innen})`,
    schritte: [`\\text{Definiert für } ${innen} > 0 \\text{, also } x > ${bruch(-c, m)}`, `\\text{Kettenregel: } (\\ln(v))' = \\frac{v'}{v},\; v' = ${m}`,
               `f'(x) = ${lnBruch(a * m, innen)}`],
    pruef: pruefAbl(f, df) };
};
const genLn3 = () => {
  const r = zuf(1, 3), a = r * r, f = x => x * x - 2 * a * Math.log(x), y0 = a - a * Math.log(a);
  return { aufgabe: `\\text{Extrempunkt von } f(x) = x^{2} - ${2 * a}\\ln(x),\; x > 0`,
    schritte: [`f'(x) = 2x - \\frac{${2 * a}}{x} = 0 \;\\Leftrightarrow\; x^2 = ${a} \;\\Rightarrow\; x = ${r} \;(x > 0)`,
               `f''(x) = 2 + \\frac{${2 * a}}{x^2} > 0 \;\\Rightarrow\; \\text{Tiefpunkt}`,
               `f(${r}) = ${a} - ${2 * a}\\ln(${r})${a === 1 ? ' = 1' : ` \\approx ${dez3(y0)}`} \;\\Rightarrow\; T(${r}\\mid ${dez3(y0)})`],
    pruef: [[ableitung(f, r), 0], [f(r), y0]] };
};

// ---- Anwendungen (BF II.5, LK II.7) ----
const genAnw1 = () => {
  const A = 10 * zuf(2, 50), q = wahl([1.1, 1.25, 1.5, 2, 0.8, 0.9, 0.75, 0.5]), B = +(A * q).toFixed(1), k = Math.log(q), T = Math.log(2) / Math.abs(k);
  return { aufgabe: `f(0) = ${A},\; f(1) = ${dez(B)}:\; f(t) = f(0)\\cdot e^{kt} \\text{ und ${q > 1 ? 'Verdopplungszeit' : 'Halbwertszeit'}}`,
    schritte: [`${A}\\,e^{k} = ${dez(B)} \;\\Rightarrow\; k = \\ln\\left(\\tfrac{${dez(B)}}{${A}}\\right) \\approx ${dez3(k)}`, `f(t) = ${A}\\,e^{${dez3(k)}t}`,
               q > 1 ? `T_V = \\frac{\\ln(2)}{k} \\approx ${dez3(T)}` : `T_H = -\\frac{\\ln(2)}{k} \\approx ${dez3(T)}`],
    pruef: [[A * Math.exp(k), B], [Math.exp(Math.abs(k) * T), 2]] };
};
const genAnw2 = () => {
  const A = zuf(5, 90) * 10, k = wahl([0.02, 0.05, 0.1, 0.2, 0.25, 0.4]) * wahl([1, -1]), T = Math.log(2) / Math.abs(k);
  return { aufgabe: `f(t) = ${A}\\,e^{${dez(k)}t}:\; \\text{Anfangsbestand, Zu- oder Abnahme, } ${k > 0 ? 'T_V' : 'T_H'}`,
    schritte: [`f(0) = ${A},\; k ${k > 0 ? '> 0 \\text{: Zunahme}' : '< 0 \\text{: Abnahme}'}`,
               k > 0 ? `T_V = \\frac{\\ln(2)}{${dez(k)}} \\approx ${dez3(T)}` : `T_H = -\\frac{\\ln(2)}{${dez(k)}} = \\frac{\\ln(2)}{${dez(-k)}} \\approx ${dez3(T)}`],
    pruef: [[Math.exp(Math.abs(k) * T), 2]] };
};
const genAnw3 = () => {
  const A = 100 * zuf(1, 9), wachsen = Math.random() < .5, q = wachsen ? wahl([1.5, 2, 3]) : wahl([0.5, 0.8, 0.6]), s = zuf(2, 6);
  const r = wachsen ? wahl([4, 5, 10]) : wahl([0.1, 0.2, 0.25]), k = Math.log(q) / s, t = Math.log(r) / k;
  return { aufgabe: `\\text{Anfangs } ${A}, \\text{ nach } ${s} \\text{ Zeiteinheiten } ${dez(A * q)}. \\text{ Wann ist der Bestand } ${dez(A * r)}?`,
    schritte: [`${A}\\,e^{${s}k} = ${dez(A * q)} \;\\Rightarrow\; k = \\frac{\\ln(${dez(q)})}{${s}} \\approx ${dez3(k)}`,
               `${A}\\,e^{kt} = ${dez(A * r)} \;\\Rightarrow\; e^{kt} = ${dez(r)} \;\\Rightarrow\; t = \\frac{\\ln(${dez(r)})}{k} \\approx ${dez3(t)}`],
    pruef: [[A * Math.exp(k * s), A * q], [A * Math.exp(k * t), A * r]] };
};

Object.assign(INHALTE, {

  // ===== Basisfach II.1 · Leistungsfach II.1 =====
  'Die natürliche Exponentialfunktion und die Euler’sche Zahl e': {
    video: null,
    labor: { f: 'e^x' },
    kurz: String.raw`Es gibt genau eine Exponentialfunktion, die beim Ableiten unverändert bleibt: \(f(x) = e^x\) mit der <b>Euler’schen Zahl</b> \(e \approx 2{,}718\). Sie heißt <b>natürliche Exponentialfunktion</b>.`,
    merk: {
      zeilen: [
        ['Ableitung', String.raw`f(x) = e^x \;\Rightarrow\; f'(x) = e^x`],
        ['Euler’sche Zahl', String.raw`e \approx 2{,}718\,28`],
        ['Lineare Verkettung', String.raw`f(x) = e^{mx+c} \;\Rightarrow\; f'(x) = m\cdot e^{mx+c}`],
        ['Eigenschaften', String.raw`e^x > 0,\quad e^0 = 1,\quad e^x \to 0 \text{ für } x \to -\infty`],
      ],
      text: String.raw`Der Graph von \(e^x\) steigt streng monoton, ist linksgekrümmt und hat die x-Achse als Asymptote. Produkte wie \(x\cdot e^x\) leitet man mit der Produktregel ab.`,
    },
    erklaerung: erklExp,
    beispiel: {
      aufgabe: String.raw`Leite ab: a) \(f(x) = 3e^{2x} - x^2\) &nbsp; b) \(g(x) = (x + 1)\,e^x\)`,
      schritte: [
        String.raw`a) Innere Ableitung von \(2x\) ist 2: \(f'(x) = 3\cdot 2e^{2x} - 2x = 6e^{2x} - 2x\)`,
        String.raw`b) Produktregel mit \(u = x + 1\), \(u' = 1\), \(v = v' = e^x\): \(g'(x) = 1\cdot e^x + (x + 1)\,e^x\)`,
        String.raw`\(e^x\) ausklammern: \(g'(x) = (x + 2)\,e^x\)`,
      ],
    },
    fehler: String.raw`<b>Typische Fehler:</b> Die innere Ableitung vergessen: \((e^{3x})' = 3e^{3x}\), nicht \(e^{3x}\).
      Oder die Potenzregel anwenden: \((e^x)' = x\cdot e^{x-1}\) ist falsch – \(x\) steht im Exponenten, nicht in der Basis.`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Leite ab: a) \(f(x) = 4e^x - 2x\) &nbsp; b) \(f(x) = e^{5x}\) &nbsp; c) \(f(x) = 2e^{-0{,}5x}\) &nbsp; d) \(f(x) = e^{3 - x}\)`,
        loesung: String.raw`a) \(4e^x - 2\) &nbsp; b) \(5e^{5x}\) &nbsp; c) \(2\cdot(-0{,}5)\,e^{-0{,}5x} = -e^{-0{,}5x}\) &nbsp; d) \(-e^{3-x}\)` },
      { niveau: 1, aufgabe: String.raw`Gib eine Funktion \(f\) an, deren Ableitung an jeder Stelle doppelt so groß ist wie der Funktionswert.`,
        loesung: String.raw`\(f(x) = e^{2x}\), denn \(f'(x) = 2e^{2x} = 2f(x)\). Auch \(c\cdot e^{2x}\) passt.` },
      { niveau: 2, aufgabe: String.raw`Leite ab und klammere aus: \(f(x) = (2x - 1)\,e^x\).`,
        loesung: String.raw`\(f'(x) = 2e^x + (2x - 1)\,e^x = (2x + 1)\,e^x\)` },
      { niveau: 2, aufgabe: String.raw`Bestimme die Tangenten an den Graphen von \(e^x\) in \(P(0\mid 1)\) und in \(Q(1\mid e)\).`,
        loesung: String.raw`In \(P\): Steigung \(e^0 = 1\), \(t_1\colon y = x + 1\).<br>In \(Q\): Steigung \(e\), \(t_2\colon y = e\,(x - 1) + e = e\,x\) – sie geht durch den Ursprung.` },
      { niveau: 2, aufgabe: String.raw`Beschreibe, wie der Graph von \(g(x) = e^{x-2} + 1\) aus dem von \(e^x\) entsteht. Welche Asymptote hat er?`,
        loesung: String.raw`Verschiebung um 2 nach rechts und um 1 nach oben. Waagerechte Asymptote \(y = 1\) für \(x \to -\infty\).` },
      { niveau: 3, aufgabe: String.raw`In welchem Punkt hat der Graph von \(f(x) = x\,e^{-x}\) eine waagerechte Tangente?`,
        loesung: String.raw`\(f'(x) = e^{-x} - x\,e^{-x} = (1 - x)\,e^{-x} = 0 \Rightarrow x = 1\). Punkt \(\left(1\mid \frac1e\right) \approx (1\mid 0{,}368)\).` },
      { niveau: 3, kurs: 'lk', aufgabe: String.raw`Leite mit der Kettenregel ab: a) \(f(x) = e^{x^2}\) &nbsp; b) \(f(x) = x\,e^{-x^2}\)`,
        loesung: String.raw`a) \(f'(x) = 2x\,e^{x^2}\)<br>b) Produkt- und Kettenregel: \(f'(x) = e^{-x^2} + x\cdot(-2x)\,e^{-x^2} = (1 - 2x^2)\,e^{-x^2}\)` },
      { niveau: 3, kurs: 'lk', aufgabe: String.raw`Berechne \(\left(1 + \frac1n\right)^n\) für \(n = 10\), \(100\), \(1000\). Was fällt auf?`,
        loesung: String.raw`\(\approx 2{,}594\); \(2{,}705\); \(2{,}717\). Die Werte nähern sich \(e \approx 2{,}718\): \(e = \lim\limits_{n\to\infty}\left(1 + \frac1n\right)^n\).` },
    ],
    pruefen: [
      { aufgabe: String.raw`Leite ab: \(f(x) = 3e^{2x}\).`,
        schritte: [String.raw`Der Faktor 3 bleibt erhalten.`, String.raw`Innere Ableitung von \(2x\): 2`, String.raw`\(f'(x) = 3\cdot e^{2x} = 3e^{2x}\)`],
        fehler: 2, erklaerung: String.raw`Die innere Ableitung 2 muss als Faktor dazu: \(f'(x) = 3\cdot 2\cdot e^{2x} = 6e^{2x}\).` },
      { aufgabe: String.raw`Leite ab: \(f(x) = x\cdot e^x\).`,
        schritte: [String.raw`\(u = x\), \(v = e^x\)`, String.raw`\(u' = 1\), \(v' = e^x\)`, String.raw`\(f'(x) = u'\cdot v' = 1\cdot e^x = e^x\)`],
        fehler: 2, erklaerung: String.raw`Produktregel: \(f' = u'v + uv' = e^x + x\,e^x = (1 + x)\,e^x\).` },
    ],
    generator: { 1: genExp1, 2: genExp2, 3: genExp3 },
    test: [
      { frage: String.raw`Welche Ableitung hat \(f(x) = e^x\)?`,
        optionen: [String.raw`\(e^x\)`, String.raw`\(x\,e^{x-1}\)`, String.raw`\(e\)`],
        richtig: 0, erklaerung: String.raw`Genau dafür steht \(e\): Die Funktion stimmt mit ihrer Ableitung überein.` },
      { frage: String.raw`Wie viele Nullstellen hat \(e^x\)?`,
        optionen: ['keine', 'eine', 'zwei'],
        richtig: 0, erklaerung: String.raw`\(e^x > 0\) für alle \(x\). Der Graph nähert sich der x-Achse nur an.` },
      { frage: String.raw`Die Ableitung von \(e^{-4x}\) ist …`,
        optionen: [String.raw`\(e^{-4x}\)`, String.raw`\(-4e^{-4x}\)`, String.raw`\(-4x\,e^{-4x-1}\)`],
        richtig: 1, erklaerung: String.raw`Innere Ableitung \(-4\) als Faktor.` },
    ],
    // Leistungsfach: Kettenregel ist bekannt, dazu e als Grenzwert
    lk: {
      merk: {
        zeilen: [
          ['Ableitung', String.raw`f(x) = e^x \;\Rightarrow\; f'(x) = e^x`],
          ['Euler’sche Zahl', String.raw`e = \lim_{n\to\infty}\left(1 + \tfrac1n\right)^n \approx 2{,}718\,28`],
          ['Kettenregel', String.raw`f(x) = e^{v(x)} \;\Rightarrow\; f'(x) = v'(x)\cdot e^{v(x)}`],
          ['Eigenschaften', String.raw`e^x > 0,\quad e^0 = 1,\quad e^x \to 0 \text{ für } x \to -\infty`],
        ],
        text: String.raw`Der Graph von \(e^x\) steigt streng monoton, ist linksgekrümmt und hat die x-Achse als Asymptote. Mit Ketten- und Produktregel lassen sich alle Funktionen mit \(e\) ableiten.`,
      },
      erklaerung: erklExp + String.raw`<p>Warum ist \(e = \lim\limits_{n\to\infty}\left(1 + \frac1n\right)^n\)? Aus \(f'(0) = \lim\limits_{h\to0}\frac{e^h - 1}{h} = 1\) folgt für kleines \(h\): \(e^h \approx 1 + h\), also \(e \approx (1 + h)^{1/h}\). Mit \(h = \frac1n\) ergibt sich der Grenzwert.</p>`,
      generator: { 1: genExp1, 2: genExp2, 3: genExp3LK },
    },
  },

  // ===== Basisfach II.3 · Leistungsfach II.3 =====
  'Exponentialfunktionen und ihre Graphen': {
    video: null,
    labor: { f: '4x e^(-0,5x)' },
    kurz: String.raw`Funktionen wie \(x\cdot e^{-x}\) untersucht man wie ganzrationale Funktionen – Ableitungen, Extrem- und Wendepunkte. Neu ist das Verhalten für \(x \to \pm\infty\): Die e-Funktion „setzt sich durch“.`,
    merk: {
      zeilen: [
        [String.raw`\(x \to +\infty\)`, String.raw`x^n\cdot e^{-x} \to 0`],
        [String.raw`\(x \to -\infty\)`, String.raw`x^n\cdot e^{x} \to 0`],
        ['Vorzeichen', String.raw`\text{Bei } \pm\infty \text{ bestimmt } x^n \text{ das Vorzeichen}`],
        ['Asymptote', String.raw`f(x) \to c \;\Rightarrow\; y = c \text{ ist waagerechte Asymptote}`],
      ],
      text: String.raw`Bei \(f(x) = x^n\cdot e^x\) oder \(x^n\cdot e^{-x}\) entscheidet der e-Faktor, ob \(f(x)\) gegen 0 oder gegen \(\pm\infty\) strebt.`,
    },
    erklaerung: graph({ x: [-1, 8], y: [-2, 4], kurven: [{ f: x => 4 * x * Math.exp(-0.5 * x), kl: 'k1', label: 'f(x) = 4x·e^(−0,5x)', lx: 4.6 }],
      punkte: [{ x: 2, y: 8 / Math.E, label: 'H' }, { x: 4, y: 16 * Math.exp(-2), label: 'W' }] })
      + String.raw`<p>Für \(x \to +\infty\) wird \(4x\) zwar beliebig groß, \(e^{-0{,}5x}\) aber noch schneller klein: \(f(x) \to 0\), die x-Achse ist Asymptote.
      Für \(x \to -\infty\) gilt \(4x \to -\infty\) und \(e^{-0{,}5x} \to +\infty\), also \(f(x) \to -\infty\).</p>
      <p>Symmetrie prüft man wie gewohnt: \(f(-x) = f(x)\) bedeutet Achsensymmetrie zur y-Achse, \(f(-x) = -f(x)\) Punktsymmetrie zum Ursprung.</p>`,
    beispiel: {
      aufgabe: String.raw`Untersuche \(f(x) = 4x\cdot e^{-0{,}5x}\) auf Extrem- und Wendepunkte und auf Asymptoten.`,
      schritte: [
        String.raw`\(f'(x) = 4e^{-0{,}5x} + 4x\cdot(-0{,}5)\,e^{-0{,}5x} = (4 - 2x)\,e^{-0{,}5x}\), \(f''(x) = (x - 4)\,e^{-0{,}5x}\)`,
        String.raw`\(f'(x) = 0 \Rightarrow x = 2\); \(f''(2) = -2e^{-1} < 0\): Hochpunkt \(H\!\left(2\mid \frac8e\right) \approx H(2\mid 2{,}943)\)`,
        String.raw`\(f''(x) = 0 \Rightarrow x = 4\), Vorzeichenwechsel von \(f''\): Wendepunkt \(W\!\left(4\mid \frac{16}{e^2}\right) \approx W(4\mid 2{,}165)\)`,
        String.raw`Für \(x \to +\infty\): \(f(x) \to 0\), Asymptote \(y = 0\). Für \(x \to -\infty\): \(f(x) \to -\infty\).`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> „\(x \to \infty\) und \(e^{-x} \to 0\) – also ist das Produkt unbestimmt“. Nein: Die e-Funktion setzt sich gegen jede Potenz durch, \(x^n e^{-x} \to 0\).
      Ebenso falsch: bei \(x^3 e^{-x}\) für \(x \to -\infty\) das Vorzeichen vergessen – \(x^3 \to -\infty\), also \(f(x) \to -\infty\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Gib das Verhalten für \(x \to +\infty\) und \(x \to -\infty\) an: a) \(x^2e^{-x}\) &nbsp; b) \(x^3e^{x}\) &nbsp; c) \(2 - e^{-x}\)`,
        loesung: String.raw`a) \(\to 0\) bzw. \(\to +\infty\) &nbsp; b) \(\to +\infty\) bzw. \(\to 0\) &nbsp; c) \(\to 2\) bzw. \(\to -\infty\); Asymptote \(y = 2\).` },
      { niveau: 2, aufgabe: String.raw`Bestimme den Extrempunkt von \(f(x) = x\,e^{2x}\).`,
        loesung: String.raw`\(f'(x) = (1 + 2x)\,e^{2x} = 0 \Rightarrow x = -0{,}5\); \(f''(x) = (4 + 4x)\,e^{2x}\), \(f''(-0{,}5) = 2e^{-1} > 0\).<br>Tiefpunkt \(T\!\left(-0{,}5\mid -\frac{1}{2e}\right) \approx T(-0{,}5\mid -0{,}184)\).` },
      { niveau: 2, aufgabe: String.raw`Bestimme den Extrempunkt von \(f(x) = e^{2x} - 4e^x\).`,
        loesung: String.raw`\(f'(x) = 2e^{2x} - 4e^x = 2e^x(e^x - 2) = 0 \Rightarrow x = \ln(2)\); \(f''(\ln 2) = 4\cdot4 - 4\cdot2 = 8 > 0\).<br>Tiefpunkt \(T(\ln(2)\mid -4) \approx T(0{,}693\mid -4)\).` },
      { niveau: 2, aufgabe: String.raw`Untersuche auf Symmetrie: a) \(f(x) = e^x + e^{-x}\) &nbsp; b) \(g(x) = x\,(e^x + e^{-x})\)`,
        loesung: String.raw`a) \(f(-x) = e^{-x} + e^{x} = f(x)\): achsensymmetrisch zur y-Achse.<br>b) \(g(-x) = -x\,(e^{-x} + e^x) = -g(x)\): punktsymmetrisch zum Ursprung.` },
      { niveau: 3, aufgabe: String.raw`Die Konzentration eines Medikaments im Blut ist \(c(t) = 10t\cdot e^{-0{,}5t}\) (\(t\) in h, \(c\) in mg/l). Wann ist sie am größten, wann nimmt sie am stärksten ab, und was passiert langfristig?`,
        loesung: String.raw`\(c'(t) = 10\,(1 - 0{,}5t)\,e^{-0{,}5t} = 0 \Rightarrow t = 2\): Maximum \(c(2) = \frac{20}{e} \approx 7{,}36\) mg/l.<br>
          \(c''(t) = 10\,(0{,}25t - 1)\,e^{-0{,}5t} = 0 \Rightarrow t = 4\): stärkste Abnahme nach 4 h, \(c(4) \approx 5{,}41\) mg/l.<br>Langfristig \(c(t) \to 0\).` },
      { niveau: 3, kurs: 'lk', aufgabe: String.raw`Bestimme die Extrempunkte von \(f(x) = x\,e^{-x^2}\) und begründe die Symmetrie.`,
        loesung: String.raw`\(f'(x) = (1 - 2x^2)\,e^{-x^2} = 0 \Rightarrow x = \pm\frac{1}{\sqrt2}\). Vorzeichenwechsel von \(f'\): \(H(0{,}707\mid 0{,}429)\), \(T(-0{,}707\mid -0{,}429)\).<br>
          \(f(-x) = -f(x)\): punktsymmetrisch zum Ursprung.` },
      { niveau: 3, kurs: 'lk', aufgabe: String.raw`Begründe: \(x^5\,e^{-0{,}1x} \to 0\) für \(x \to +\infty\).`,
        loesung: String.raw`Für Funktionen \(x^n e^{-ax}\) mit \(a > 0\) bestimmt der Faktor \(e^{-ax}\) das Verhalten: Er strebt schneller gegen 0, als jede Potenz \(x^n\) wächst.` },
    ],
    pruefen: [
      { aufgabe: String.raw`Verhalten von \(f(x) = x^3e^{-x}\) für \(x \to -\infty\).`,
        schritte: [String.raw`\(x^3 \to -\infty\) für \(x \to -\infty\)`, String.raw`\(e^{-x} \to +\infty\) für \(x \to -\infty\)`, String.raw`Also \(f(x) \to +\infty\)`],
        fehler: 2, erklaerung: String.raw`Negativ mal positiv: \(f(x) \to -\infty\). Der Faktor \(x^3\) bestimmt das Vorzeichen.` },
    ],
    generator: { 1: genGraph1, 2: genGraph2, 3: genGraph3 },
    test: [
      { frage: String.raw`Wogegen strebt \(x^4e^{-x}\) für \(x \to +\infty\)?`,
        optionen: ['0', String.raw`\(+\infty\)`, '1'],
        richtig: 0, erklaerung: String.raw`Die e-Funktion setzt sich gegen die Potenz durch.` },
      { frage: String.raw`Welche Asymptote hat \(f(x) = 3 + x\,e^x\) für \(x \to -\infty\)?`,
        optionen: [String.raw`\(y = 0\)`, String.raw`\(y = 3\)`, 'keine'],
        richtig: 1, erklaerung: String.raw`\(x\,e^x \to 0\), also \(f(x) \to 3\).` },
      { frage: String.raw`\(f(-x) = f(x)\) bedeutet …`,
        optionen: ['Punktsymmetrie zum Ursprung', 'Achsensymmetrie zur y-Achse', 'keine Symmetrie'],
        richtig: 1, erklaerung: 'Gleiche Funktionswerte links und rechts: Spiegelung an der y-Achse.' },
    ],
    lk: {
      merk: {
        zeilen: [
          [String.raw`\(x \to +\infty\)`, String.raw`x^n\cdot e^{-ax} \to 0 \quad (a > 0)`],
          [String.raw`\(x \to -\infty\)`, String.raw`x^n\cdot e^{ax} \to 0 \quad (a > 0)`],
          ['Vorzeichen', String.raw`\text{Bei } \pm\infty \text{ bestimmt } x^n \text{ das Vorzeichen}`],
          ['Asymptote', String.raw`f(x) \to c \;\Rightarrow\; y = c \text{ ist waagerechte Asymptote}`],
        ],
        text: String.raw`Bei \(f(x) = x^n\cdot e^{ax}\) bzw. \(x^n\cdot e^{-ax}\) entscheidet der e-Faktor, ob \(f(x)\) gegen 0 oder gegen \(\pm\infty\) strebt. Damit gilt auch \(p(x)\cdot e^{-x} \to 0\) für jedes Polynom \(p\).`,
      },
    },
  },

  // ===== Basisfach II.4 =====
  'Wirkung von Parametern bei Exponentialfunktionen': {
    ...paramGemeinsam,
    kurz: String.raw`Steht in einem Funktionsterm neben \(x\) noch eine weitere Zahl wie \(a\) in \(e^{x-a}\), gehört zu jedem Wert von \(a\) eine eigene Funktion \(f_a\). So kann man viele ähnliche Funktionen auf einmal untersuchen.`,
    merk: {
      zeilen: [
        ['Parameter', String.raw`f_a(x) = e^{x-a}:\; \text{zu jedem Wert von } a \text{ eine Funktion } f_a`],
        ['Verschieben', String.raw`e^{x-a}:\; a \text{ nach rechts};\quad e^x + b:\; b \text{ nach oben}`],
        ['Strecken, Spiegeln', String.raw`c\cdot e^x;\quad -e^x \text{ (an der x-Achse)};\quad e^{-x} \text{ (an der y-Achse)}`],
        ['Ableiten', String.raw`\text{Parameter wie eine Zahl: } (e^{ax})' = a\,e^{ax}`],
      ],
      text: String.raw`Um den passenden Parameterwert zu finden, setzt man eine Bedingung ein – etwa einen Punkt oder eine Steigung – und löst nach dem Parameter auf.`,
    },
  },

  // ===== Leistungsfach II.4 =====
  'Exponentialfunktionen mit Parameter': {
    ...paramGemeinsam,
    kurz: String.raw`Enthält ein Funktionsterm außer \(x\) noch einen <b>Parameter</b>, etwa \(a\) in \(e^{x-a}\), gehört zu jedem Wert von \(a\) eine Funktion \(f_a\). Alle diese Funktionen zusammen bilden eine <b>Funktionenschar</b>.`,
    merk: {
      zeilen: [
        ['Funktionenschar', String.raw`f_a(x) = e^{x-a}:\; \text{zu jedem } a \text{ eine Funktion } f_a`],
        ['Verschieben', String.raw`e^{x-a}:\; a \text{ nach rechts};\quad e^x + b:\; b \text{ nach oben}`],
        ['Strecken, Spiegeln', String.raw`c\cdot e^x;\quad -e^x \text{ (an der x-Achse)};\quad e^{-x} \text{ (an der y-Achse)}`],
        ['Ableiten', String.raw`\text{Parameter wie eine Zahl: } (e^{ax^2})' = 2ax\,e^{ax^2}`],
      ],
      text: String.raw`Extrem- und Wendestellen einer Schar hängen meist vom Parameter ab. Um einen passenden Parameterwert zu finden, setzt man eine Bedingung ein und löst nach dem Parameter auf.`,
    },
    uebungen: [...paramGemeinsam.uebungen,
      { niveau: 3, aufgabe: String.raw`Bestimme für die Funktionenschar \(f_a(x) = e^{ax - x^2}\) den Hochpunkt in Abhängigkeit von \(a\).`,
        loesung: String.raw`Kettenregel: \(f_a'(x) = (a - 2x)\,e^{ax - x^2} = 0 \Rightarrow x = \frac a2\); \(f_a'\) wechselt dort von \(+\) nach \(-\).<br>
          \(f_a\!\left(\frac a2\right) = e^{\frac{a^2}{2} - \frac{a^2}{4}} = e^{\frac{a^2}{4}}\), also \(H_a\!\left(\frac a2\mid e^{a^2/4}\right)\).` },
    ],
  },

  // ===== Leistungsfach II.5 =====
  'Die Umkehrfunktion': {
    video: null,
    kurz: String.raw`Manchmal möchte man rückwärts fragen: Zu welchem \(x\) gehört ein Funktionswert \(y\)? Geht das eindeutig, ist \(f\) <b>umkehrbar</b>, und die <b>Umkehrfunktion</b> \(\bar f\) macht \(f\) rückgängig.`,
    merk: {
      zeilen: [
        ['Umkehrbar', String.raw`\text{zu jedem } y \in W_f \text{ genau ein } x \in D_f \text{ mit } f(x) = y`],
        ['Umkehrfunktion', String.raw`\bar f(y) = x,\quad D_{\bar f} = W_f,\quad W_{\bar f} = D_f`],
        ['Kriterium', String.raw`f \text{ streng monoton auf einem Intervall} \;\Rightarrow\; \text{umkehrbar}`],
        ['Graph', String.raw`G_{\bar f} \text{ ist } G_f \text{ gespiegelt an } y = x`],
      ],
      text: String.raw`Es gilt \(\bar f(f(x)) = x\) für alle \(x \in D_f\) und \(f(\bar f(x)) = x\) für alle \(x \in W_f\).`,
    },
    erklaerung: String.raw`<p>\(f(x) = x^2\) ist auf \(\mathbb R\) nicht umkehrbar, denn \(f(2) = f(-2) = 4\). Schränkt man auf \(D_f = [0;\,\infty[\) ein, ist \(f\) streng monoton steigend – die Umkehrfunktion ist \(\bar f(x) = \sqrt x\).</p>`
      + graph({ x: [-1, 4], y: [-1, 4], kurven: [{ f: x => x >= 0 ? x * x : NaN, kl: 'k1', label: 'f(x) = x²', lx: 1.25 }, { f: x => x >= 0 ? Math.sqrt(x) : NaN, kl: 'k2', label: 'f̄(x) = √x', lx: 2.9 },
        { f: x => x, kl: 'k3', label: 'y = x', lx: 2.3 }] })
      + String.raw`<p><b>Term der Umkehrfunktion in vier Schritten:</b></p>
      <ol class="steps"><li>\(y = f(x)\) setzen.</li><li>Die Gleichung nach \(x\) auflösen (dabei \(D_f\) beachten).</li><li>\(x\) und \(y\) vertauschen.</li><li>\(y\) durch \(\bar f(x)\) ersetzen.</li></ol>`,
    beispiel: {
      aufgabe: String.raw`Zeige, dass \(f(x) = 2\sqrt{x + 3} - 1\) mit \(D_f = [-3;\,\infty[\) umkehrbar ist, und bestimme \(\bar f\).`,
      schritte: [
        String.raw`\(f'(x) = \frac{1}{\sqrt{x+3}} > 0\) für \(x > -3\): streng monoton steigend, also umkehrbar. \(W_f = [-1;\,\infty[\).`,
        String.raw`\(y = 2\sqrt{x+3} - 1 \;\Rightarrow\; \frac{y+1}{2} = \sqrt{x+3} \;\Rightarrow\; x = \frac{(y+1)^2}{4} - 3\)`,
        String.raw`Vertauschen: \(\bar f(x) = \frac14(x+1)^2 - 3\) mit \(D_{\bar f} = W_f = [-1;\,\infty[\), \(W_{\bar f} = D_f = [-3;\,\infty[\)`,
        String.raw`Probe: \(f(1) = 2\cdot2 - 1 = 3\) und \(\bar f(3) = \frac{16}{4} - 3 = 1\) ✓`,
      ],
    },
    fehler: String.raw`<b>Typische Fehler:</b> \(\bar f\) mit \(\frac1f\) verwechseln – die Umkehrfunktion von \(x^2\) ist \(\sqrt x\), nicht \(\frac{1}{x^2}\).
      Oder die Definitionsmenge vergessen: \(D_{\bar f}\) ist die Wertemenge von \(f\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Bestimme die Umkehrfunktion von \(f(x) = 4x - 2\).`,
        loesung: String.raw`\(y = 4x - 2 \Rightarrow x = \frac{y + 2}{4}\), also \(\bar f(x) = \frac{x+2}{4} = 0{,}25x + 0{,}5\).` },
      { niveau: 1, aufgabe: String.raw`Bestimme \(\bar f\) für \(f(x) = (x - 2)^2\) mit \(D_f = [2;\,\infty[\).`,
        loesung: String.raw`\(y = (x-2)^2 \Rightarrow x = 2 + \sqrt y\) (wegen \(x \ge 2\)). \(\bar f(x) = \sqrt x + 2\), \(D_{\bar f} = [0;\,\infty[\).` },
      { niveau: 2, aufgabe: String.raw`Bestimme \(\bar f\) mit Definitions- und Wertemenge für \(f(x) = \frac{1}{x+1}\), \(D_f = ]-1;\,\infty[\).`,
        loesung: String.raw`\(W_f = ]0;\,\infty[\). \(y = \frac{1}{x+1} \Rightarrow x = \frac1y - 1\).<br>\(\bar f(x) = \frac1x - 1\), \(D_{\bar f} = ]0;\,\infty[\), \(W_{\bar f} = ]-1;\,\infty[\).` },
      { niveau: 2, aufgabe: String.raw`Auf welchem möglichst großen Intervall, das \(x = 5\) enthält, ist \(f(x) = x^2 - 4x\) umkehrbar? Bestimme dort \(\bar f\).`,
        loesung: String.raw`Scheitel bei \(x = 2\), also \(D_f = [2;\,\infty[\), \(W_f = [-4;\,\infty[\).<br>\(y = (x-2)^2 - 4 \Rightarrow x = 2 + \sqrt{y + 4}\), \(\bar f(x) = 2 + \sqrt{x+4}\).` },
      { niveau: 2, aufgabe: String.raw`Bestimme die Umkehrfunktion von \(f(x) = 3e^{0{,}5x} + 1\).`,
        loesung: String.raw`\(W_f = ]1;\,\infty[\). \(\frac{y-1}{3} = e^{0{,}5x} \Rightarrow x = 2\ln\!\left(\frac{y-1}{3}\right)\).<br>\(\bar f(x) = 2\ln\!\left(\frac{x-1}{3}\right)\), \(D_{\bar f} = ]1;\,\infty[\).` },
      { niveau: 3, aufgabe: String.raw`Zeige, dass \(f(x) = x^3 + x\) auf \(\mathbb R\) umkehrbar ist, und gib \(\bar f(2)\) an, ohne einen Term von \(\bar f\) zu bestimmen.`,
        loesung: String.raw`\(f'(x) = 3x^2 + 1 > 0\): streng monoton steigend, also umkehrbar. Wegen \(f(1) = 2\) ist \(\bar f(2) = 1\).` },
      { niveau: 3, aufgabe: String.raw`Wo schneiden sich die Graphen von \(f(x) = x^2\) (\(x \ge 0\)) und ihrer Umkehrfunktion?`,
        loesung: String.raw`\(\bar f(x) = \sqrt x\). Schnittpunkte liegen hier auf \(y = x\): \(x^2 = x \Rightarrow x = 0\) oder \(x = 1\). Also \((0\mid 0)\) und \((1\mid 1)\).` },
    ],
    pruefen: [
      { aufgabe: String.raw`Bestimme die Umkehrfunktion von \(f(x) = 2x + 6\).`,
        schritte: [String.raw`\(y = 2x + 6\)`, String.raw`\(x = \frac y2 - 6\)`, String.raw`Vertauschen: \(\bar f(x) = \frac x2 - 6\)`],
        fehler: 1, erklaerung: String.raw`Erst 6 abziehen, dann durch 2 teilen: \(x = \frac{y - 6}{2} = \frac y2 - 3\). Also \(\bar f(x) = \frac x2 - 3\).` },
    ],
    generator: { 1: genUmk1, 2: genUmk2, 3: genUmk3 },
    test: [
      { frage: String.raw`Woran erkennt man am Graphen, dass \(f\) umkehrbar ist?`,
        optionen: ['Jede Parallele zur x-Achse schneidet ihn höchstens einmal.', 'Jede Parallele zur y-Achse schneidet ihn höchstens einmal.', 'Er geht durch den Ursprung.'],
        richtig: 0, erklaerung: String.raw`Zu jedem \(y\) darf es höchstens ein \(x\) geben.` },
      { frage: String.raw`Wie entsteht der Graph von \(\bar f\) aus dem von \(f\)?`,
        optionen: ['Spiegelung an der x-Achse', String.raw`Spiegelung an \(y = x\)`, 'Spiegelung am Ursprung'],
        richtig: 1, erklaerung: String.raw`Aus \(P(a\mid b)\) wird \(\bar P(b\mid a)\).` },
      { frage: String.raw`\(f\) hat \(D_f = [0;\,\infty[\) und \(W_f = [2;\,\infty[\). Welche Definitionsmenge hat \(\bar f\)?`,
        optionen: [String.raw`\([0;\,\infty[\)`, String.raw`\([2;\,\infty[\)`, String.raw`\(\mathbb R\)`],
        richtig: 1, erklaerung: String.raw`\(D_{\bar f} = W_f\).` },
    ],
  },

  // ===== Leistungsfach II.6 =====
  'Die Logarithmusfunktion und ihre Ableitung': {
    video: null,
    labor: { f: 'ln(x)' },
    kurz: String.raw`Die Umkehrfunktion der natürlichen Exponentialfunktion ist die <b>natürliche Logarithmusfunktion</b> \(\ln\). Ihre Ableitung ist überraschend einfach: \((\ln x)' = \frac1x\).`,
    merk: {
      zeilen: [
        ['Definition', String.raw`\ln \text{ ist die Umkehrfunktion von } e^x:\; D = ]0;\,\infty[,\; W = \mathbb R`],
        ['Ableitung', String.raw`f(x) = \ln(x) \;\Rightarrow\; f'(x) = \frac1x`],
        ['Kettenregel', String.raw`f(x) = \ln(v(x)) \;\Rightarrow\; f'(x) = \frac{v'(x)}{v(x)}`],
        ['Grenzwerte', String.raw`\ln(x) \to -\infty \;(x \to 0),\quad \frac{\ln(x)}{x} \to 0 \;(x \to \infty)`],
      ],
      text: String.raw`\(\ln(x)\) wächst für \(x \to \infty\) über alle Grenzen, aber langsamer als jede Potenz von \(x\).`,
    },
    erklaerung: graph({ x: [-3, 4], y: [-3, 4], kurven: [{ f: Math.exp, kl: 'k1', label: 'y = eˣ', lx: 1.2 }, { f: x => x > 0 ? Math.log(x) : NaN, kl: 'k2', label: 'y = ln(x)', lx: 3 },
      { f: x => x, kl: 'k3', label: 'y = x', lx: -2.5 }] })
      + String.raw`<p>Der Graph von \(\ln\) entsteht durch Spiegelung von \(y = e^x\) an \(y = x\). Er geht durch \((1\mid 0)\) und \((e\mid 1)\), steigt streng monoton und ist rechtsgekrümmt.</p>
      <p><b>Herleitung der Ableitung:</b> Aus \(x = e^{\ln(x)}\) folgt mit der Kettenregel \(1 = e^{\ln(x)}\cdot(\ln(x))' = x\cdot(\ln(x))'\), also \((\ln(x))' = \frac1x\).</p>`,
    beispiel: {
      aufgabe: String.raw`Bestimme den Extrempunkt von \(f(x) = x^2 - 8\ln(x)\), \(x > 0\).`,
      schritte: [
        String.raw`\(f'(x) = 2x - \frac8x = 0 \;\Leftrightarrow\; 2x^2 = 8 \;\Rightarrow\; x = 2\) (wegen \(x > 0\))`,
        String.raw`\(f''(x) = 2 + \frac{8}{x^2} > 0\): Tiefpunkt`,
        String.raw`\(f(2) = 4 - 8\ln(2) \approx -1{,}545\), also \(T(2\mid -1{,}545)\)`,
      ],
    },
    fehler: String.raw`<b>Typische Fehler:</b> Die Kettenregel vergessen: \((\ln(3x))' = \frac{3}{3x} = \frac1x\), nicht \(\frac{1}{3x}\).
      Oder Werte außerhalb von \(D\) einsetzen: \(\ln(0)\) und \(\ln(-2)\) gibt es nicht.`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Leite ab: a) \(5\ln(x)\) &nbsp; b) \(\ln(3x)\) &nbsp; c) \(x^3 - \ln(x)\)`,
        loesung: String.raw`a) \(\frac5x\) &nbsp; b) \(\frac{3}{3x} = \frac1x\) &nbsp; c) \(3x^2 - \frac1x\)` },
      { niveau: 1, aufgabe: String.raw`Bestimme die Nullstelle und die Definitionsmenge: a) \(\ln(x) - 1\) &nbsp; b) \(\ln(x + 2)\)`,
        loesung: String.raw`a) \(D = ]0;\,\infty[\), \(\ln(x) = 1 \Rightarrow x = e\) &nbsp; b) \(D = ]-2;\,\infty[\), \(x + 2 = 1 \Rightarrow x = -1\)` },
      { niveau: 2, aufgabe: String.raw`Leite ab: a) \(\ln(x^2 + 1)\) &nbsp; b) \(x^2\ln(x)\) &nbsp; c) \(\ln(e^{2x})\)`,
        loesung: String.raw`a) \(\frac{2x}{x^2+1}\) &nbsp; b) \(2x\ln(x) + x^2\cdot\frac1x = 2x\ln(x) + x\) &nbsp; c) \(\ln(e^{2x}) = 2x\), also 2` },
      { niveau: 2, aufgabe: String.raw`Bestimme die Tangente an den Graphen von \(\ln\) im Punkt \((1\mid 0)\).`,
        loesung: String.raw`Steigung \(\frac11 = 1\): \(t\colon y = x - 1\).` },
      { niveau: 2, aufgabe: String.raw`Vereinfache mit einem Logarithmengesetz und leite dann ab: \(f(x) = \ln(x^4)\), \(x > 0\).`,
        loesung: String.raw`\(f(x) = 4\ln(x)\), also \(f'(x) = \frac4x\).` },
      { niveau: 3, aufgabe: String.raw`Untersuche \(f(x) = \frac{\ln(x)}{x} = \ln(x)\cdot x^{-1}\) auf Extrempunkte und auf das Verhalten am Rand von \(D\).`,
        loesung: String.raw`\(f'(x) = \frac1x\cdot x^{-1} - \ln(x)\cdot x^{-2} = \frac{1 - \ln(x)}{x^2} = 0 \Rightarrow x = e\); Vorzeichenwechsel von \(+\) nach \(-\): \(H\!\left(e\mid\frac1e\right)\).<br>
          Für \(x \to 0\): \(f(x) \to -\infty\); für \(x \to \infty\): \(f(x) \to 0\).` },
      { niveau: 3, aufgabe: String.raw`Bestimme die Umkehrfunktion von \(f(x) = 2\ln(x - 1) + 3\), \(D_f = ]1;\,\infty[\).`,
        loesung: String.raw`\(W_f = \mathbb R\). \(\frac{y-3}{2} = \ln(x-1) \Rightarrow x = e^{\frac{y-3}{2}} + 1\).<br>\(\bar f(x) = e^{\frac{x-3}{2}} + 1\), \(D_{\bar f} = \mathbb R\), \(W_{\bar f} = ]1;\,\infty[\).` },
    ],
    pruefen: [
      { aufgabe: String.raw`Leite ab: \(f(x) = \ln(3x)\).`,
        schritte: [String.raw`Äußere Ableitung: \(\frac{1}{3x}\)`, String.raw`Innere Ableitung: 3`, String.raw`\(f'(x) = \frac{1}{3x}\)`],
        fehler: 2, erklaerung: String.raw`Die innere Ableitung fehlt: \(f'(x) = \frac{1}{3x}\cdot 3 = \frac1x\).` },
    ],
    generator: { 1: genLn1, 2: genLn2, 3: genLn3 },
    test: [
      { frage: String.raw`Die Ableitung von \(\ln(x)\) ist …`,
        optionen: [String.raw`\(\frac1x\)`, String.raw`\(e^x\)`, String.raw`\(x\ln(x)\)`],
        richtig: 0, erklaerung: String.raw`Herleitung über \(x = e^{\ln(x)}\) und die Kettenregel.` },
      { frage: String.raw`Welche Definitionsmenge hat \(\ln(x)\)?`,
        optionen: [String.raw`\(\mathbb R\)`, String.raw`\(]0;\,\infty[\)`, String.raw`\([0;\,\infty[\)`],
        richtig: 1, erklaerung: String.raw`\(D_{\ln} = W_{e^x} = ]0;\,\infty[\).` },
      { frage: String.raw`\(\ln(e) = \) …`,
        optionen: ['0', '1', 'e'],
        richtig: 1, erklaerung: String.raw`\(e^1 = e\).` },
    ],
  },

  // ===== Basisfach II.5 · Leistungsfach II.7 =====
  'Anwendungen von Exponentialfunktionen': {
    video: null,
    kurz: String.raw`Ändert sich ein Bestand pro Zeiteinheit immer um denselben Faktor, spricht man von <b>exponentiellem Wachstum</b> – bei einem Faktor kleiner als 1 von exponentieller Abnahme. Mit der Basis \(e\) lässt es sich bequem ableiten und mit \(\ln\) nach der Zeit auflösen.`,
    merk: {
      zeilen: [
        ['Wachstum', String.raw`f(t) = f(0)\cdot e^{kt}`],
        ['Wachstumsfaktor', String.raw`f(t) = f(0)\cdot a^t \;\Rightarrow\; k = \ln(a)`],
        ['Verdopplungszeit', String.raw`T_V = \frac{\ln(2)}{k} \quad (k > 0)`],
        ['Halbwertszeit', String.raw`T_H = -\frac{\ln(2)}{k} \quad (k < 0)`],
      ],
      text: String.raw`\(f(0)\) ist der Anfangsbestand. Bei \(k > 0\) nimmt der Bestand zu, bei \(k < 0\) ab. Die momentane Änderungsrate ist \(f'(t) = k\cdot f(t)\).`,
    },
    beispiel: {
      aufgabe: String.raw`Eine Bakterienkultur hat anfangs 500 Bakterien, nach 3 Stunden 800. Bestimme \(f(t) = f(0)\cdot e^{kt}\) und die Verdopplungszeit.`,
      schritte: [
        String.raw`\(f(0) = 500\) und \(500\,e^{3k} = 800 \;\Rightarrow\; e^{3k} = 1{,}6\)`,
        String.raw`\(k = \frac{\ln(1{,}6)}{3} \approx 0{,}1567\), also \(f(t) = 500\,e^{0{,}1567t}\)`,
        String.raw`\(T_V = \frac{\ln(2)}{k} \approx 4{,}42\): Die Kultur verdoppelt sich etwa alle 4,4 Stunden.`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> Den Wachstumsfaktor \(a\) und die Konstante \(k\) verwechseln. Bei 5 % Zunahme pro Jahr ist \(a = 1{,}05\), aber \(k = \ln(1{,}05) \approx 0{,}0488\) – nicht \(k = 0{,}05\) und nicht \(k = 1{,}05\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Gegeben ist \(f(t) = 200\,e^{0{,}05t}\). Gib den Anfangsbestand an, entscheide über Zu- oder Abnahme und bestimme die Verdopplungszeit.`,
        loesung: String.raw`Anfangsbestand 200, Zunahme (\(k > 0\)), \(T_V = \frac{\ln(2)}{0{,}05} \approx 13{,}86\).` },
      { niveau: 1, aufgabe: String.raw`Schreibe \(f(t) = 80\cdot0{,}9^t\) mit der Basis \(e\) und bestimme die Halbwertszeit.`,
        loesung: String.raw`\(k = \ln(0{,}9) \approx -0{,}1054\), \(f(t) = 80\,e^{-0{,}1054t}\). \(T_H = -\frac{\ln(2)}{k} \approx 6{,}58\).` },
      { niveau: 2, aufgabe: String.raw`Ein Guthaben von 1000 € wächst jährlich um 3 %. Nach wie vielen Jahren hat es sich verdoppelt?`,
        loesung: String.raw`\(f(t) = 1000\cdot1{,}03^t = 1000\,e^{kt}\) mit \(k = \ln(1{,}03) \approx 0{,}0296\). \(T_V = \frac{\ln(2)}{\ln(1{,}03)} \approx 23{,}4\) Jahre.` },
      { niveau: 2, aufgabe: String.raw`Iod-131 hat eine Halbwertszeit von 8 Tagen. Wie viel Prozent sind nach 30 Tagen noch vorhanden?`,
        loesung: String.raw`\(k = -\frac{\ln(2)}{8} \approx -0{,}0866\). \(e^{30k} = 2^{-30/8} \approx 0{,}0743\): noch etwa 7,4 %.` },
      { niveau: 2, aufgabe: String.raw`Zeige, dass die Messwerte exponentielles Wachstum beschreiben, und gib \(f(t)\) mit Basis \(e\) an:<br>
          \(t\): 0, 1, 2, 3, 4 &nbsp;|&nbsp; \(f(t)\): 50; 60; 72; 86,4; 103,68`,
        loesung: String.raw`Alle Quotienten aufeinanderfolgender Werte sind 1,2: gleicher Faktor pro Zeiteinheit.<br>\(f(t) = 50\cdot1{,}2^t = 50\,e^{0{,}1823t}\), denn \(\ln(1{,}2) \approx 0{,}1823\).` },
      { niveau: 3, aufgabe: String.raw`Seerosen bedecken 2 m² eines Teichs, die Fläche verdoppelt sich alle 5 Tage. Wann ist der 400 m² große Teich bedeckt?`,
        loesung: String.raw`\(k = \frac{\ln(2)}{5} \approx 0{,}1386\). \(2\,e^{kt} = 400 \Rightarrow t = \frac{\ln(200)}{k} \approx 38{,}2\) Tage.` },
      { niveau: 3, aufgabe: String.raw`Wie schnell wächst die Bakterienkultur aus dem Beispiel nach 3 Stunden?`,
        loesung: String.raw`\(f'(t) = k\cdot f(t)\), also \(f'(3) \approx 0{,}1567\cdot 800 \approx 125\) Bakterien pro Stunde.` },
    ],
    pruefen: [
      { aufgabe: String.raw`Bestimme die Halbwertszeit für \(f(t) = 50\,e^{-0{,}2t}\).`,
        schritte: [String.raw`Ansatz: \(50\,e^{-0{,}2t} = 25\)`, String.raw`\(e^{-0{,}2t} = 0{,}5\)`, String.raw`\(-0{,}2t = \ln(0{,}5) \approx -0{,}693\)`, String.raw`\(t \approx 0{,}693\cdot 0{,}2 \approx 0{,}139\)`],
        fehler: 3, erklaerung: String.raw`Durch \(-0{,}2\) teilen, nicht multiplizieren: \(t = \frac{-0{,}693}{-0{,}2} \approx 3{,}47\).` },
    ],
    generator: { 1: genAnw1, 2: genAnw2, 3: genAnw3 },
    test: [
      { frage: String.raw`Was gibt \(f(0)\) bei \(f(t) = f(0)\cdot e^{kt}\) an?`,
        optionen: ['den Anfangsbestand', 'die Verdopplungszeit', 'die Wachstumsrate'],
        richtig: 0, erklaerung: String.raw`\(e^0 = 1\), also ist \(f(0)\) der Bestand zur Zeit 0.` },
      { frage: String.raw`Bei \(f(t) = 10\,e^{-0{,}3t}\) liegt …`,
        optionen: ['exponentielle Zunahme vor', 'exponentielle Abnahme vor', 'lineares Wachstum vor'],
        richtig: 1, erklaerung: String.raw`\(k = -0{,}3 < 0\).` },
      { frage: String.raw`Ein Bestand wächst um 10 % pro Jahr. Welches \(k\) gehört dazu?`,
        optionen: [String.raw`\(k = 0{,}1\)`, String.raw`\(k = 1{,}1\)`, String.raw`\(k = \ln(1{,}1)\)`],
        richtig: 2, erklaerung: String.raw`Wachstumsfaktor \(a = 1{,}1\), und \(k = \ln(a)\).` },
    ],
    lk: {
      merk: {
        zeilen: [
          ['Wachstum', String.raw`f(t) = f(0)\cdot a^t = f(0)\cdot e^{kt}, \quad k = \ln(a)`],
          ['Verdopplungszeit', String.raw`T_V = \frac{\ln(2)}{k} \quad (k > 0)`],
          ['Halbwertszeit', String.raw`T_H = \frac{1}{k}\ln\!\left(\tfrac12\right) = -\frac{\ln(2)}{k} \quad (k < 0)`],
          ['Änderungsrate', String.raw`f'(t) = k\cdot f(t)`],
        ],
        text: String.raw`\(f(0)\) ist der Anfangsbestand. Bei \(k > 0\) nimmt der Bestand zu, bei \(k < 0\) ab.`,
      },
    },
  },
});
