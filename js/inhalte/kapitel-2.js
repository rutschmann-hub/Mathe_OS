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
