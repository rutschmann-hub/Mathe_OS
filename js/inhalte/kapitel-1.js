// Kapitel I · Grundlagen der Differenzialrechnung (Basisfach und Leistungsfach)
// Bekannt in Kapitel I: Potenzfunktionen (auch Wurzel, 1/x), sin, cos – noch keine e-Funktion (erst Kapitel II).

// ---- Zufallsaufgaben, die mehrere Themen nutzen ----

// Linearfaktor (x - p) als LaTeX
const xm = p => p === 0 ? 'x' : `(x ${p < 0 ? '+' : '-'} ${Math.abs(p)})`;

// Potenz-, Faktor-, Summenregel
const genRegeln = {
  1: () => {
    const n = zuf(3, 6), m = zuf(1, n - 1), a = nichtNull(-5, 5), b = nichtNull(-6, 6), c = zuf(-9, 9);
    const f = x => a * x ** n + b * x ** m + c, df = x => a * n * x ** (n - 1) + b * m * x ** (m - 1);
    return { aufgabe: `f(x) = ${summe([[a, pot(n)], [b, pot(m)], [c, '']])}`,
      schritte: [`\\text{Summandenweise mit Potenz- und Faktorregel ableiten, die Konstante fällt weg}`,
                 `f'(x) = ${summe([[a * n, pot(n - 1)], [b * m, m > 1 ? pot(m - 1) : '']])}`],
      pruef: pruefAbl(f, df) };
  },
  2: () => {
    const n = zuf(2, 5), a = nichtNull(-4, 4), b = nichtNull(-5, 5), sin = Math.random() < .5;
    const trig = sin ? '\\sin(x)' : '\\cos(x)';
    const f = x => a * x ** n + b * (sin ? Math.sin(x) : Math.cos(x));
    const df = x => a * n * x ** (n - 1) + (sin ? b * Math.cos(x) : -b * Math.sin(x));
    const d2f = x => a * n * (n - 1) * x ** (n - 2) + (sin ? -b * Math.sin(x) : -b * Math.cos(x));
    return { aufgabe: `\\text{Bestimme } f' \\text{ und } f'' \\text{ für } f(x) = ${summe([[a, pot(n)], [b, trig]])}`,
      schritte: [`f'(x) = ${summe([[a * n, n > 1 ? pot(n - 1) : ''], sin ? [b, '\\cos(x)'] : [-b, '\\sin(x)']])}`,
                 `f''(x) = ${summe([[a * n * (n - 1), n > 2 ? pot(n - 2) : ''], [-b, sin ? '\\sin(x)' : '\\cos(x)']])}`],
      pruef: [...pruefAbl(f, df), ...pruefAbl(df, d2f)] };
  },
  3: () => {
    const a = zuf(1, 6), b = nichtNull(-6, 6), k = zuf(1, 2);
    const f = x => a * Math.sqrt(x) + b / x ** k, df = x => a / (2 * Math.sqrt(x)) - b * k / x ** (k + 1);
    const g = ggt(a, 2), t1 = 2 / g === 1 ? `\\frac{${a / g}}{\\sqrt{x}}` : `\\frac{${a / g}}{2\\sqrt{x}}`;
    const c2 = -b * k;
    return { aufgabe: `f(x) = ${koef(a)}\\sqrt{x} ${b < 0 ? '-' : '+'} \\frac{${Math.abs(b)}}{${pot(k)}}`,
      schritte: [`\\text{Als Potenzen schreiben: } f(x) = ${koef(a)}x^{\\frac{1}{2}} ${b < 0 ? '-' : '+'} ${koef(Math.abs(b))}x^{-${k}}`,
                 `f'(x) = ${a}\\cdot\\tfrac{1}{2}x^{-\\frac{1}{2}} ${c2 < 0 ? '-' : '+'} ${Math.abs(c2)}x^{-${k + 1}}`,
                 `f'(x) = ${t1} ${c2 < 0 ? '-' : '+'} \\frac{${Math.abs(c2)}}{${pot(k + 1)}}`],
      pruef: pruefAbl(f, df) };
  },
};

// Tangente an eine Parabel
function genTangenteParabel() {
  const a = wahl([-2, -1, 1, 2]), b = zuf(-4, 4), c = zuf(-5, 5), x0 = nichtNull(-3, 3);
  const f = x => a * x * x + b * x + c, m = 2 * a * x0 + b, y0 = f(x0), n = y0 - m * x0;
  return { aufgabe: `\\text{Tangente an } f(x) = ${summe([[a, 'x^{2}'], [b, 'x'], [c, '']])} \\text{ an der Stelle } x_0 = ${x0}`,
    schritte: [`f(${x0}) = ${y0}`,
               `f'(x) = ${summe([[2 * a, 'x'], [b, '']])} \\;\\Rightarrow\\; f'(${x0}) = ${m}`,
               `t:\\; y = ${m}\\cdot(x ${x0 < 0 ? '+' : '-'} ${Math.abs(x0)}) ${y0 < 0 ? '-' : '+'} ${Math.abs(y0)} = ${summe([[m, 'x'], [n, '']])}`],
    pruef: [[m, ableitung(f, x0)], [m * x0 + n, f(x0)]] };
}

// Lineare Verkettung g(mx + c)
const genLinear = {
  1: () => {
    const m = nichtNull(-4, 4), c = nichtNull(-5, 5), n = zuf(2, 5), innen = summe([[m, 'x'], [c, '']]);
    const f = x => (m * x + c) ** n, df = x => m * n * (m * x + c) ** (n - 1);
    return { aufgabe: `f(x) = (${innen})^{${n}}`,
      schritte: [`\\text{innen: } ${innen},\\; \\text{innere Ableitung: } ${m}`,
                 `f'(x) = ${n}\\,(${innen})${n - 1 > 1 ? `^{${n - 1}}` : ''}\\cdot ${kl(m)}`,
                 `f'(x) = ${koef(m * n)}(${innen})${n - 1 > 1 ? `^{${n - 1}}` : ''}`],
      pruef: pruefAbl(f, df) };
  },
  2: () => {
    const a = nichtNull(-3, 3), m = nichtNull(-4, 4), c = zuf(-3, 3), sin = Math.random() < .5, innen = summe([[m, 'x'], [c, '']]);
    const f = x => a * (sin ? Math.sin(m * x + c) : Math.cos(m * x + c));
    const df = x => sin ? a * m * Math.cos(m * x + c) : -a * m * Math.sin(m * x + c);
    return { aufgabe: `f(x) = ${koef(a)}\\${sin ? 'sin' : 'cos'}(${innen})`,
      schritte: [`\\text{innere Ableitung: } ${m}`,
                 `f'(x) = ${koef(sin ? a * m : -a * m)}\\${sin ? 'cos' : 'sin'}(${innen})`],
      pruef: pruefAbl(f, df) };
  },
  3: () => {
    const a = zuf(1, 5), m = zuf(1, 4), c = zuf(1, 5), innen = summe([[m, 'x'], [c, '']]);
    const f = x => a * Math.sqrt(m * x + c), df = x => a * m / (2 * Math.sqrt(m * x + c));
    const g = ggt(a * m, 2), z = a * m / g, nn = 2 / g;
    return { aufgabe: `f(x) = ${koef(a)}\\sqrt{${innen}}`,
      schritte: [`\\text{Ableitung von } \\sqrt{u} \\text{ ist } \\frac{1}{2\\sqrt{u}},\\; \\text{innere Ableitung: } ${m}`,
                 `f'(x) = ${a === 1 ? '' : a + '\\cdot'}\\frac{1}{2\\sqrt{${innen}}}\\cdot ${m} = \\frac{${z}}{${nn === 1 ? '' : nn}\\sqrt{${innen}}}`],
      pruef: pruefAbl(f, df) };
  },
};

// Kubische Funktion mit ganzzahligen Extremstellen p < q: f'(x) = 3a(x - p)(x - q)
function kubisch() {
  let p, q; do { p = zuf(-3, 2); q = zuf(p + 1, 3); } while ((p + q) % 2);
  const a = wahl([-1, 1]), d = zuf(-3, 3);
  const k2 = -3 * a * (p + q) / 2, k1 = 3 * a * p * q;
  const f = x => a * x ** 3 + k2 * x * x + k1 * x + d;
  return { p, q, a, d, f, term: summe([[a, 'x^{3}'], [k2, 'x^{2}'], [k1, 'x'], [d, '']]),
    abl: summe([[3 * a, 'x^{2}'], [2 * k2, 'x'], [k1, '']]), abl2: summe([[6 * a, 'x'], [2 * k2, '']]) };
}

// ---- Themen ----

Object.assign(INHALTE, {

  // ===== Basisfach I.1 =====
  'Ableitung und Tangente': {
    video: null,
    kurz: String.raw`Wie schnell ändert sich eine Größe – nicht im Durchschnitt, sondern genau in einem Moment? Die Ableitung beantwortet das: Sie ist die <b>momentane Änderungsrate</b> und zugleich die <b>Steigung der Tangente</b> an den Graphen.`,
    merk: {
      formel: String.raw`\begin{aligned} m_s &= \frac{f(a+h)-f(a)}{h} \\[4pt] f'(a) &= \lim_{h\to 0}\frac{f(a+h)-f(a)}{h} \\[4pt] t:\; y &= f'(a)\,(x-a) + f(a) \end{aligned}`,
      text: String.raw`Sekantensteigung \(m_s\) (mittlere Änderungsrate), Ableitung (momentane Änderungsrate) und Tangente in \(P(a\mid f(a))\). Für \(h \to 0\) wird die Sekantensteigung zur Tangentensteigung.`,
    },
    erklaerung: String.raw`<p>Lässt man den Punkt \(Q\) immer näher an \(P\) heranrücken, dreht sich die Sekante in die Tangente.
      Zoomt man stark an \(P\) heran, sieht der Graph dort fast wie diese Gerade aus – die Tangente ist die beste lineare Näherung.</p>
      ${graph({ x: [-1, 4], y: [-1, 5.5], kurven: [
        { f: x => x * x / 2, kl: 'k1', label: 'f', lx: 3.05 },
        { f: x => 2 * (x - 1) + 0.5, kl: 'k2', label: 'Sekante PQ', lx: 0.1 },
        { f: x => x - 0.5, kl: 'k3', label: 'Tangente in P', lx: 3.2 }],
        punkte: [{ x: 1, y: 0.5, label: 'P' }, { x: 3, y: 4.5, label: 'Q' }] })}`,
    beispiel: {
      aufgabe: String.raw`Bestimme \(f'(1)\) für \(f(x) = x^2\) mit dem Differenzenquotienten und gib die Tangente im Punkt \(P(1\mid 1)\) an.`,
      schritte: [
        String.raw`Differenzenquotient: \(\frac{(1+h)^2 - 1}{h} = \frac{2h + h^2}{h} = 2 + h\)`,
        String.raw`Für \(h \to 0\): \(f'(1) = 2\)`,
        String.raw`Tangente: \(y = 2\,(x-1) + 1 = 2x - 1\)`,
      ],
    },
    fehler: String.raw`<b>Typische Fehlvorstellung:</b> „Eine Tangente berührt den Graphen nur in einem Punkt.“ – Das stimmt nur beim Kreis!
      Die Tangente an \(f(x) = x^3\) in \(P(1\mid 1)\) ist \(y = 3x - 2\) und schneidet den Graphen noch einmal bei \(x = -2\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Berechne die mittlere Änderungsrate von \(f(x) = x^2\) im Intervall \([1;\,3]\).`,
        loesung: String.raw`\(\frac{f(3)-f(1)}{3-1} = \frac{9-1}{2} = 4\)` },
      { niveau: 1, aufgabe: String.raw`Bestimme die Steigung der Sekante durch \(P(0\mid f(0))\) und \(Q(2\mid f(2))\) für \(f(x) = x^3\).`,
        loesung: String.raw`\(m = \frac{8 - 0}{2 - 0} = 4\)` },
      { niveau: 2, aufgabe: String.raw`Bestimme \(f'(2)\) für \(f(x) = x^2\) mit dem Differenzenquotienten.`,
        loesung: String.raw`\(\frac{(2+h)^2 - 4}{h} = \frac{4h + h^2}{h} = 4 + h \;\to\; 4\) für \(h\to 0\). Also \(f'(2) = 4\).` },
      { niveau: 2, aufgabe: String.raw`Gib die Gleichung der Tangente an den Graphen von \(f(x) = x^2 - 2x\) an der Stelle \(x_0 = 3\) an.`,
        loesung: String.raw`\(f(3) = 3\), \(f'(x) = 2x - 2\), \(f'(3) = 4\).<br>\(t:\; y = 4(x-3) + 3 = 4x - 9\)` },
      { niveau: 3, aufgabe: String.raw`In welchem Punkt hat der Graph von \(f(x) = x^2\) eine Tangente mit der Steigung \(6\)?`,
        loesung: String.raw`\(f'(x) = 2x = 6 \Rightarrow x = 3\). Punkt \(P(3\mid 9)\).` },
      { niveau: 3, aufgabe: String.raw`Ein Ball wird senkrecht nach oben geworfen. Seine Höhe ist \(h(t) = -5t^2 + 20t\) (\(t\) in s, \(h\) in m).
          Berechne die mittlere Geschwindigkeit in den ersten 2 Sekunden und die momentane Geschwindigkeit nach 3 Sekunden. Deute das Vorzeichen.`,
        loesung: String.raw`Mittlere Geschwindigkeit: \(\frac{h(2) - h(0)}{2} = \frac{20 - 0}{2} = 10\) m/s.<br>
          \(h'(t) = -10t + 20\), \(h'(3) = -10\) m/s: Der Ball fällt nach 3 s mit 10 m/s.` },
    ],
    generator: {
      1: () => {
        const a = nichtNull(-2, 2), b = zuf(-4, 4), p = zuf(-3, 2), q = zuf(p + 1, 4);
        const f = x => a * x * x + b * x, r = a * (p + q) + b;
        return { aufgabe: `\\text{Mittlere Änderungsrate von } f(x) = ${summe([[a, 'x^{2}'], [b, 'x']])} \\text{ in } [${p};\\,${q}]`,
          schritte: [`f(${p}) = ${f(p)},\\; f(${q}) = ${f(q)}`,
                     `\\frac{f(${q}) - f(${p})}{${q} - ${kl(p)}} = \\frac{${f(q) - f(p)}}{${q - p}} = ${r}`],
          pruef: [[r, (f(q) - f(p)) / (q - p)]] };
      },
      2: genTangenteParabel,
      3: () => {
        const a = wahl([-2, -1, 1, 2]), b = zuf(-4, 4), c = zuf(-3, 3), x0 = zuf(-3, 3);
        const f = x => a * x * x + b * x + c, m = 2 * a * x0 + b;
        return { aufgabe: `\\text{In welchem Punkt hat } f(x) = ${summe([[a, 'x^{2}'], [b, 'x'], [c, '']])} \\text{ eine Tangente mit Steigung } ${m}\\text{?}`,
          schritte: [`f'(x) = ${summe([[2 * a, 'x'], [b, '']])} = ${m}`,
                     `x = ${x0}`, `f(${x0}) = ${f(x0)} \\;\\Rightarrow\\; P(${x0}\\mid ${f(x0)})`],
          pruef: [[m, ableitung(f, x0)]] };
      },
    },
    test: [
      { frage: String.raw`Was gibt \(f'(a)\) an?`,
        optionen: ['die Steigung der Sekante durch zwei Punkte', String.raw`die Steigung der Tangente im Punkt \(P(a\mid f(a))\)`, String.raw`den Funktionswert an der Stelle \(a\)`],
        richtig: 1, erklaerung: 'Die Ableitung ist die momentane Änderungsrate – geometrisch die Tangentensteigung.' },
      { frage: String.raw`Mittlere Änderungsrate von \(f(x) = x^2\) im Intervall \([0;\,4]\)?`,
        optionen: ['2', '4', '8', '16'],
        richtig: 1, erklaerung: String.raw`\(\frac{16 - 0}{4 - 0} = 4\)` },
      { frage: String.raw`Der Graph von \(f\) geht durch \(P(1\mid 3)\), und es gilt \(f'(1) = 2\). Wie lautet die Tangente in \(P\)?`,
        optionen: [String.raw`\(y = 2x + 3\)`, String.raw`\(y = 2x + 1\)`, String.raw`\(y = 3x + 2\)`],
        richtig: 1, erklaerung: String.raw`\(y = 2(x - 1) + 3 = 2x + 1\)` },
    ],
  },

  // ===== Basisfach I.2 =====
  'Ableitungsregeln und höhere Ableitungen': {
    video: null,
    kurz: String.raw`Ableiten über den Grenzwert ist mühsam. Mit wenigen Regeln geht es schnell – und leitet man die Ableitung noch einmal ab, erhält man <b>höhere Ableitungen</b> \(f'',\, f''',\, \dots\)`,
    merk: {
      formel: String.raw`\begin{aligned} (x^r)' &= r\,x^{r-1} && \text{Potenzregel} \\ (c\cdot g)' &= c\cdot g' && \text{Faktorregel} \\ (g + h)' &= g' + h' && \text{Summenregel} \\ (\sin x)' &= \cos x \\ (\cos x)' &= -\sin x \end{aligned}`,
      text: String.raw`Gilt auch für Wurzeln und Brüche: \(\sqrt{x} = x^{\frac12}\), \(\frac{1}{x} = x^{-1}\).`,
    },
    beispiel: {
      aufgabe: String.raw`Bestimme \(f'\) und \(f''\) für \(f(x) = 4x^3 - 2\sqrt{x} + 3\sin(x)\).`,
      schritte: [
        String.raw`Umschreiben: \(f(x) = 4x^3 - 2x^{\frac12} + 3\sin(x)\)`,
        String.raw`\(f'(x) = 12x^2 - x^{-\frac12} + 3\cos(x) = 12x^2 - \frac{1}{\sqrt{x}} + 3\cos(x)\)`,
        String.raw`\(f''(x) = 24x + \frac12 x^{-\frac32} - 3\sin(x)\)`,
      ],
    },
    fehler: String.raw`<b>Typische Fehler:</b> Hochzahl nicht verringert: \((x^4)' = 4x^3\), nicht \(4x^4\).
      Und ein Summand ohne \(x\) fällt weg: \((x^2 + 7)' = 2x\), nicht \(2x + 7\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`\(f(x) = 3x^4 - 2x^2 + 5\)`, loesung: String.raw`\(f'(x) = 12x^3 - 4x\)` },
      { niveau: 1, aufgabe: String.raw`\(f(x) = \frac{1}{x}\)`, loesung: String.raw`\(f(x) = x^{-1}\), \(f'(x) = -x^{-2} = -\frac{1}{x^2}\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = 2\sqrt{x} + \frac{4}{x^2}\)`,
        loesung: String.raw`\(f(x) = 2x^{\frac12} + 4x^{-2}\)<br>\(f'(x) = x^{-\frac12} - 8x^{-3} = \frac{1}{\sqrt{x}} - \frac{8}{x^3}\)` },
      { niveau: 2, aufgabe: String.raw`Bestimme \(f'\) und \(f''\) für \(f(x) = 2\sin(x) - \cos(x)\).`,
        loesung: String.raw`\(f'(x) = 2\cos(x) + \sin(x)\)<br>\(f''(x) = -2\sin(x) + \cos(x)\)` },
      { niveau: 3, aufgabe: String.raw`Leite \(f(x) = x^4\) so oft ab, bis die Nullfunktion entsteht. Die wievielte Ableitung ist das?`,
        loesung: String.raw`\(f' = 4x^3,\; f'' = 12x^2,\; f''' = 24x,\; f^{(4)} = 24,\; f^{(5)} = 0\). Die 5. Ableitung.` },
      { niveau: 3, aufgabe: String.raw`Ben behauptet: „Leitet man \(\sin(x)\) zweimal ab, erhält man wieder \(\sin(x)\).“ Stimmt das? Begründe.`,
        loesung: String.raw`Nein: \((\sin x)' = \cos x\), \((\cos x)' = -\sin x\). Nach zwei Ableitungen erhält man \(-\sin(x)\), erst nach vier wieder \(\sin(x)\).` },
    ],
    generator: genRegeln,
    test: [
      { frage: String.raw`\((x^6)' = \;?\)`, optionen: [String.raw`\(6x^5\)`, String.raw`\(6x^6\)`, String.raw`\(x^5\)`],
        richtig: 0, erklaerung: String.raw`Potenzregel: Hochzahl nach vorne, dann um 1 verringern.` },
      { frage: String.raw`Was ist die Ableitung von \(\sqrt{x}\)?`, optionen: [String.raw`\(2\sqrt{x}\)`, String.raw`\(\frac{1}{2\sqrt{x}}\)`, String.raw`\(\frac12\sqrt{x}\)`],
        richtig: 1, erklaerung: String.raw`\((x^{\frac12})' = \frac12 x^{-\frac12} = \frac{1}{2\sqrt{x}}\)` },
      { frage: String.raw`\(f(x) = \cos(x)\). Was ist \(f''(x)\)?`, optionen: [String.raw`\(\sin(x)\)`, String.raw`\(-\cos(x)\)`, String.raw`\(\cos(x)\)`],
        richtig: 1, erklaerung: String.raw`\(f'(x) = -\sin(x)\), \(f''(x) = -\cos(x)\)` },
    ],
  },

  // ===== Basisfach I.3 =====
  'Lineare Verkettung von Funktionen und deren Ableitung': {
    video: null,
    kurz: String.raw`Steht in einer Funktion statt \(x\) ein linearer Term wie \(3x - 1\), zum Beispiel \((3x-1)^4\) oder \(\sin(2x)\), leitet man wie gewohnt ab und multipliziert zusätzlich mit der Steigung des inneren Terms.`,
    merk: {
      formel: String.raw`\begin{aligned} f(x) &= g(mx + c) \\ f'(x) &= m\cdot g'(mx + c) \end{aligned}`,
      text: String.raw`Der innere Term \(mx + c\) bleibt stehen, dazu kommt der Faktor \(m\) („nachdifferenzieren“).`,
    },
    beispiel: {
      aufgabe: String.raw`Leite \(f(x) = (3x - 1)^4\) ab.`,
      schritte: [
        String.raw`Äußere Funktion \(g(u) = u^4\), innerer Term \(3x - 1\) mit \(m = 3\)`,
        String.raw`\(g'(u) = 4u^3\), also \(f'(x) = 3\cdot 4(3x-1)^3\)`,
        String.raw`\(f'(x) = 12(3x - 1)^3\)`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> Den Faktor \(m\) vergessen: \((\sin(2x))' = 2\cos(2x)\), nicht \(\cos(2x)\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`\(f(x) = (2x + 5)^3\)`, loesung: String.raw`\(f'(x) = 2\cdot 3(2x+5)^2 = 6(2x + 5)^2\)` },
      { niveau: 1, aufgabe: String.raw`\(f(x) = \sin(4x)\)`, loesung: String.raw`\(f'(x) = 4\cos(4x)\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = \sqrt{2x + 1}\)`, loesung: String.raw`\(f'(x) = 2\cdot\frac{1}{2\sqrt{2x+1}} = \frac{1}{\sqrt{2x + 1}}\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = \frac{1}{3x - 2}\)`,
        loesung: String.raw`\(f(x) = (3x-2)^{-1}\), \(f'(x) = 3\cdot(-1)(3x-2)^{-2} = -\frac{3}{(3x - 2)^2}\)` },
      { niveau: 3, aufgabe: String.raw`Berechne \(f'\!\left(\tfrac12\right)\) für \(f(x) = \cos(\pi x)\).`,
        loesung: String.raw`\(f'(x) = -\pi\sin(\pi x)\), \(f'\!\left(\tfrac12\right) = -\pi\sin\!\left(\tfrac{\pi}{2}\right) = -\pi\)` },
      { niveau: 3, aufgabe: String.raw`Der Graph von \(g(x) = (x - 2)^2\) entsteht aus dem von \(f(x) = x^2\) durch Verschieben um 2 nach rechts. Zeige \(g'(x) = f'(x - 2)\) und deute das.`,
        loesung: String.raw`\(g'(x) = 1\cdot 2(x - 2) = 2(x-2)\) und \(f'(x - 2) = 2(x - 2)\). Die Steigungen werden mit dem Graphen verschoben: \(g\) hat bei \(x\) dieselbe Steigung wie \(f\) bei \(x - 2\).` },
    ],
    generator: genLinear,
    test: [
      { frage: String.raw`\((\sin(3x))' = \;?\)`, optionen: [String.raw`\(\cos(3x)\)`, String.raw`\(3\cos(3x)\)`, String.raw`\(-3\cos(3x)\)`],
        richtig: 1, erklaerung: String.raw`Ableitung von \(\sin\) ist \(\cos\), dazu der Faktor \(m = 3\).` },
      { frage: String.raw`\(((2x + 1)^2)' = \;?\)`, optionen: [String.raw`\(2(2x+1)\)`, String.raw`\(4(2x + 1)\)`, String.raw`\(4x + 1\)`],
        richtig: 1, erklaerung: String.raw`\(2\cdot 2(2x+1) = 4(2x + 1)\)` },
      { frage: String.raw`\(f(x) = (5 - x)^3\). Was ist \(f'(x)\)?`, optionen: [String.raw`\(3(5 - x)^2\)`, String.raw`\(-3(5 - x)^2\)`, String.raw`\(-(5-x)^3\)`],
        richtig: 1, erklaerung: String.raw`Innerer Term \(5 - x\) hat die Steigung \(m = -1\).` },
    ],
  },

  // ===== Basisfach I.4 · Leistungsfach I.4 =====
  'Produktregel': {
    video: null, // z. B. { url: 'https://…', titel: 'Produktregel in 5 Minuten' }
    kurz: String.raw`Wie leitet man ein Produkt zweier Funktionen ab, zum Beispiel \(x^2 \cdot \sin(x)\)? Faktorweise ableiten funktioniert nicht – dafür gibt es die Produktregel.`,
    merk: {
      formel: String.raw`\begin{aligned} f(x) &= u(x)\cdot v(x) \\ f'(x) &= u'(x)\cdot v(x) + u(x)\cdot v'(x) \end{aligned}`,
      text: String.raw`Kurz: \((u\cdot v)' = u'v + uv'\) – „erster Faktor abgeleitet mal zweiter, plus erster mal zweiter abgeleitet“.`,
    },
    beispiel: {
      aufgabe: String.raw`Leite \(f(x) = x^2\cdot\sin(x)\) ab.`,
      schritte: [
        String.raw`Faktoren festlegen: \(u(x) = x^2,\; v(x) = \sin(x)\)`,
        String.raw`Einzeln ableiten: \(u'(x) = 2x,\; v'(x) = \cos(x)\)`,
        String.raw`Einsetzen: \(f'(x) = 2x\cdot\sin(x) + x^2\cdot\cos(x)\)`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> \((u\cdot v)' = u'\cdot v'\) – falsch!
      Gegenbeispiel: \((x\cdot x)' = (x^2)' = 2x\), aber \(1\cdot 1 = 1\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`\(f(x) = x\cdot\cos(x)\)`, loesung: String.raw`\(f'(x) = 1\cdot\cos(x) + x\cdot(-\sin(x)) = \cos(x) - x\sin(x)\)` },
      { niveau: 1, aufgabe: String.raw`\(f(x) = x^3\cdot\sin(x)\)`, loesung: String.raw`\(f'(x) = 3x^2\sin(x) + x^3\cos(x)\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = (2x+1)\cdot\sin(x)\)`, loesung: String.raw`\(f'(x) = 2\sin(x) + (2x+1)\cos(x)\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = \sqrt{x}\cdot(x - 3)\)`,
        loesung: String.raw`\(u = \sqrt{x},\; u' = \frac{1}{2\sqrt{x}},\; v = x - 3,\; v' = 1\)<br>\(f'(x) = \frac{x - 3}{2\sqrt{x}} + \sqrt{x} = \frac{x - 3 + 2x}{2\sqrt{x}} = \frac{3x - 3}{2\sqrt{x}}\)` },
      { niveau: 3, aufgabe: String.raw`Bestimme die Tangente an den Graphen von \(f(x) = x\cdot\sin(x)\) an der Stelle \(x_0 = \frac{\pi}{2}\).`,
        loesung: String.raw`\(f\!\left(\tfrac{\pi}{2}\right) = \tfrac{\pi}{2}\), \(f'(x) = \sin(x) + x\cos(x)\), \(f'\!\left(\tfrac{\pi}{2}\right) = 1 + 0 = 1\).<br>Tangente: \(y = 1\cdot\left(x - \tfrac{\pi}{2}\right) + \tfrac{\pi}{2} = x\)` },
      { niveau: 3, kurs: 'lk', aufgabe: String.raw`\(f(x) = x\cdot\sin(x^2)\) &nbsp;<span class="hint">Produkt- und Kettenregel</span>`,
        loesung: String.raw`\(u = x,\; v = \sin(x^2),\; v' = 2x\cos(x^2)\)<br>\(f'(x) = \sin(x^2) + x\cdot 2x\cos(x^2) = \sin(x^2) + 2x^2\cos(x^2)\)` },
    ],
    generator: {
      1: () => {
        const a = nichtNull(-4, 4), n = zuf(2, 4), sin = Math.random() < .5;
        const u = `${koef(a)}${pot(n)}`, du = `${koef(a * n)}${pot(n - 1)}`;
        const f = x => a * x ** n * (sin ? Math.sin(x) : Math.cos(x));
        const df = x => a * n * x ** (n - 1) * (sin ? Math.sin(x) : Math.cos(x)) + a * x ** n * (sin ? Math.cos(x) : -Math.sin(x));
        return { aufgabe: `f(x) = ${u}\\cdot\\${sin ? 'sin' : 'cos'}(x)`,
          schritte: [`u = ${u},\\; u' = ${du},\\; v = \\${sin ? 'sin' : 'cos'}(x),\\; v' = ${sin ? '\\cos(x)' : '-\\sin(x)'}`,
                     `f'(x) = ${summe([[a * n, pot(n - 1) + `\\${sin ? 'sin' : 'cos'}(x)`], [sin ? a : -a, pot(n) + `\\${sin ? 'cos' : 'sin'}(x)`]])}`],
          pruef: pruefAbl(f, df) };
      },
      2: () => {
        const a = nichtNull(-4, 4), b = nichtNull(-5, 5), sin = Math.random() < .5, lin = summe([[a, 'x'], [b, '']]);
        const f = x => (a * x + b) * (sin ? Math.sin(x) : Math.cos(x));
        const df = x => a * (sin ? Math.sin(x) : Math.cos(x)) + (a * x + b) * (sin ? Math.cos(x) : -Math.sin(x));
        return { aufgabe: `f(x) = (${lin})\\cdot\\${sin ? 'sin' : 'cos'}(x)`,
          schritte: [`u = ${lin},\\; u' = ${a},\\; v = \\${sin ? 'sin' : 'cos'}(x),\\; v' = ${sin ? '\\cos(x)' : '-\\sin(x)'}`,
                     `f'(x) = ${koef(a)}\\${sin ? 'sin' : 'cos'}(x) ${sin ? '+' : '-'} (${lin})\\${sin ? 'cos' : 'sin'}(x)`],
          pruef: pruefAbl(f, df) };
      },
      3: () => {
        const a = nichtNull(-3, 3), b = nichtNull(-6, 6), poly = summe([[a, 'x^{2}'], [b, '']]);
        const f = x => (a * x * x + b) * Math.sqrt(x), df = x => (5 * a * x * x + b) / (2 * Math.sqrt(x));
        return { aufgabe: `f(x) = (${poly})\\cdot\\sqrt{x}`,
          schritte: [`u = ${poly},\\; u' = ${koef(2 * a)}x,\\; v = \\sqrt{x},\\; v' = \\frac{1}{2\\sqrt{x}}`,
                     `f'(x) = ${koef(2 * a)}x\\sqrt{x} + \\frac{${poly}}{2\\sqrt{x}}`,
                     `\\text{Hauptnenner: } f'(x) = \\frac{${koef(4 * a)}x^{2}}{2\\sqrt{x}} + \\frac{${poly}}{2\\sqrt{x}} = \\frac{${summe([[5 * a, 'x^{2}'], [b, '']])}}{2\\sqrt{x}}`],
          pruef: pruefAbl(f, df) };
      },
    },
    test: [
      { frage: String.raw`Was ist die Ableitung von \(f(x) = x\cdot\sin(x)\)?`,
        optionen: [String.raw`\(\cos(x)\)`, String.raw`\(\sin(x) + x\cos(x)\)`, String.raw`\(x\cos(x)\)`, String.raw`\(\sin(x)\cdot\cos(x)\)`],
        richtig: 1, erklaerung: String.raw`\(u' v + u v' = 1\cdot\sin(x) + x\cdot\cos(x)\)` },
      { frage: String.raw`\(f(x) = x^2\cdot\cos(x)\). Welchen Wert hat \(f'(0)\)?`,
        optionen: ['0', '1', '2'],
        richtig: 0, erklaerung: String.raw`\(f'(x) = 2x\cos(x) - x^2\sin(x)\), also \(f'(0) = 0\).` },
      { frage: 'Bei welcher Funktion brauchst du die Produktregel?',
        optionen: [String.raw`\(f(x) = 5\cdot\sin(x)\)`, String.raw`\(f(x) = \sin(x) + x\)`, String.raw`\(f(x) = x\cdot\sin(x)\)`],
        richtig: 2, erklaerung: String.raw`Nur hier werden zwei Funktionen von \(x\) multipliziert. Ein konstanter Faktor wie 5 bleibt einfach stehen.` },
    ],
  },

  // ===== Basisfach I.5 · Leistungsfach I.5 =====
  'Monotonie und Krümmung': {
    video: null,
    kurz: String.raw`Steigt oder fällt der Graph – und wie ist er gebogen? Das Vorzeichen von \(f'\) verrät die <b>Monotonie</b>, das Vorzeichen von \(f''\) die <b>Krümmung</b>.`,
    merk: {
      formel: String.raw`\begin{aligned} f' > 0 &\;\Rightarrow\; \text{streng monoton steigend} \\ f' < 0 &\;\Rightarrow\; \text{streng monoton fallend} \\ f'' > 0 &\;\Rightarrow\; \text{linksgekrümmt} \\ f'' < 0 &\;\Rightarrow\; \text{rechtsgekrümmt} \end{aligned}`,
      text: String.raw`Jeweils auf einem ganzen Intervall \(I\). Die Pfeile gelten nur in eine Richtung: \(f(x) = x^3\) ist streng monoton steigend, obwohl \(f'(0) = 0\).`,
    },
    erklaerung: String.raw`<p>Stell dir vor, du fährst mit dem Fahrrad auf dem Graphen von links nach rechts.
      Musst du nach links lenken, ist der Graph <b>linksgekrümmt</b>, sonst <b>rechtsgekrümmt</b>.
      Bei einer Linkskurve wird der Graph immer steiler: \(f'\) wächst, also \(f'' > 0\).</p>
      <div class="grafiken">
        <figure>${graph({ x: [-2.5, 2.5], y: [-0.5, 3], kurven: [{ f: x => x * x / 2, kl: 'k1' }] })}
          <figcaption>\(f''(x) > 0\): Linkskurve</figcaption></figure>
        <figure>${graph({ x: [-2.5, 2.5], y: [-0.5, 3], kurven: [{ f: x => 2.5 - x * x / 2, kl: 'k2' }] })}
          <figcaption>\(f''(x) < 0\): Rechtskurve</figcaption></figure>
      </div>`,
    beispiel: {
      aufgabe: String.raw`Untersuche \(f(x) = x^3 - 3x\) auf Monotonie und Krümmung.`,
      schritte: [
        String.raw`\(f'(x) = 3x^2 - 3 = 3(x-1)(x+1)\), Nullstellen \(x = -1\) und \(x = 1\)`,
        String.raw`Vorzeichen von \(f'\): \(+\) für \(x < -1\), \(-\) für \(-1 < x < 1\), \(+\) für \(x > 1\)`,
        String.raw`\(f\) ist streng monoton steigend für \(x \le -1\) und für \(x \ge 1\), streng monoton fallend für \(-1 \le x \le 1\)`,
        String.raw`\(f''(x) = 6x\): rechtsgekrümmt für \(x < 0\), linksgekrümmt für \(x > 0\)`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehlschluss:</b> „\(f'(2) > 0\), also ist \(f\) monoton steigend.“ – Monotonie ist eine Aussage über ein ganzes <i>Intervall</i>.
      Der Wert von \(f'\) an einer einzigen Stelle reicht dafür nicht.`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Bestimme die Monotoniebereiche von \(f(x) = x^2 - 4x\).`,
        loesung: String.raw`\(f'(x) = 2x - 4\), Nullstelle \(x = 2\). Streng monoton fallend für \(x \le 2\), streng monoton steigend für \(x \ge 2\).` },
      { niveau: 1, aufgabe: String.raw`Wo ist der Graph von \(f(x) = x^3\) links-, wo rechtsgekrümmt?`,
        loesung: String.raw`\(f''(x) = 6x\): rechtsgekrümmt für \(x < 0\), linksgekrümmt für \(x > 0\).` },
      { niveau: 2, aufgabe: String.raw`Untersuche \(f(x) = -x^3 + 3x^2\) auf Monotonie und Krümmung.`,
        loesung: String.raw`\(f'(x) = -3x^2 + 6x = -3x(x - 2)\): fallend für \(x \le 0\), steigend für \(0 \le x \le 2\), fallend für \(x \ge 2\).<br>
          \(f''(x) = -6x + 6\): linksgekrümmt für \(x < 1\), rechtsgekrümmt für \(x > 1\).` },
      { niveau: 2, aufgabe: String.raw`Abgebildet ist der Graph der <b>Ableitung</b> \(f'\) mit \(f'(x) = x^2 - 1\). Wo ist \(f\) steigend, wo ist der Graph von \(f\) linksgekrümmt?
          ${graph({ x: [-2.5, 2.5], y: [-1.5, 3], kurven: [{ f: x => x * x - 1, kl: 'k1', label: "f'", lx: 1.9 }] })}`,
        loesung: String.raw`\(f\) steigt, wo \(f' > 0\): für \(x \le -1\) und \(x \ge 1\).<br>Linksgekrümmt, wo \(f'\) wächst: für \(x > 0\).` },
      { niveau: 3, aufgabe: String.raw`Untersuche \(f(x) = \sin(x)\) im Intervall \([0;\,2\pi]\) auf Monotonie und Krümmung.`,
        loesung: String.raw`\(f'(x) = \cos(x)\): steigend auf \(\left[0;\,\tfrac{\pi}{2}\right]\) und \(\left[\tfrac{3\pi}{2};\,2\pi\right]\), fallend auf \(\left[\tfrac{\pi}{2};\,\tfrac{3\pi}{2}\right]\).<br>
          \(f''(x) = -\sin(x)\): rechtsgekrümmt auf \((0;\,\pi)\), linksgekrümmt auf \((\pi;\,2\pi)\).` },
      { niveau: 3, aufgabe: String.raw`Wahr oder falsch? „Ist \(f\) streng monoton steigend, dann gilt \(f'(x) > 0\) für alle \(x\).“`,
        loesung: String.raw`Falsch. Gegenbeispiel: \(f(x) = x^3\) ist streng monoton steigend, aber \(f'(0) = 0\).` },
    ],
    generator: {
      1: () => {
        const a = nichtNull(-3, 3), xs = zuf(-4, 4), c = zuf(-5, 5), f = x => a * x * x - 2 * a * xs * x + c;
        return { aufgabe: `\\text{Monotonie von } f(x) = ${summe([[a, 'x^{2}'], [-2 * a * xs, 'x'], [c, '']])}`,
          schritte: [`f'(x) = ${summe([[2 * a, 'x'], [-2 * a * xs, '']])} = 0 \\;\\Rightarrow\\; x = ${xs}`,
                     a > 0 ? `\\text{fallend für } x \\le ${xs},\\; \\text{steigend für } x \\ge ${xs}` : `\\text{steigend für } x \\le ${xs},\\; \\text{fallend für } x \\ge ${xs}`],
          pruef: [[ableitung(f, xs), 0], [Math.sign(ableitung(f, xs + 1)), Math.sign(a)]] };
      },
      2: () => {
        const k = kubisch(), { p, q, a, f } = k;
        return { aufgabe: `\\text{Monotonie von } f(x) = ${k.term}`,
          schritte: [`f'(x) = ${k.abl} = ${koef(3 * a)}${xm(p)}${xm(q)}`,
                     `f'(x) = 0 \\;\\Rightarrow\\; x = ${p} \\text{ oder } x = ${q}`,
                     a > 0 ? `\\text{steigend für } x \\le ${p} \\text{ und } x \\ge ${q},\\; \\text{fallend für } ${p} \\le x \\le ${q}`
                           : `\\text{fallend für } x \\le ${p} \\text{ und } x \\ge ${q},\\; \\text{steigend für } ${p} \\le x \\le ${q}`],
          pruef: [[ableitung(f, p), 0], [ableitung(f, q), 0], [Math.sign(ableitung(f, (p + q) / 2)), -a]] };
      },
      3: () => {
        const a = wahl([-2, -1, 1, 2]), xw = zuf(-3, 3), c = zuf(-4, 4), f = x => a * x ** 3 - 3 * a * xw * x * x + c * x;
        return { aufgabe: `\\text{Krümmung von } f(x) = ${summe([[a, 'x^{3}'], [-3 * a * xw, 'x^{2}'], [c, 'x']])}`,
          schritte: [`f'(x) = ${summe([[3 * a, 'x^{2}'], [-6 * a * xw, 'x'], [c, '']])}`,
                     `f''(x) = ${summe([[6 * a, 'x'], [-6 * a * xw, '']])} = 0 \\;\\Rightarrow\\; x = ${xw}`,
                     a > 0 ? `\\text{rechtsgekrümmt für } x < ${xw},\\; \\text{linksgekrümmt für } x > ${xw}` : `\\text{linksgekrümmt für } x < ${xw},\\; \\text{rechtsgekrümmt für } x > ${xw}`],
          pruef: [[abl2(f, xw), 0], [Math.sign(abl2(f, xw + 1)), Math.sign(a)]] };
      },
    },
    test: [
      { frage: String.raw`Es gilt \(f'(x) < 0\) auf einem Intervall \(I\). Was folgt?`,
        optionen: [String.raw`\(f\) ist auf \(I\) streng monoton fallend`, 'Der Graph ist dort rechtsgekrümmt', String.raw`\(f(x)\) ist dort negativ`],
        richtig: 0, erklaerung: String.raw`Das Vorzeichen von \(f'\) bestimmt die Monotonie – nicht das Vorzeichen von \(f\).` },
      { frage: String.raw`Es gilt \(f''(x) > 0\) auf \(I\). Dann ist der Graph auf \(I\) …`,
        optionen: ['linksgekrümmt', 'rechtsgekrümmt', 'steigend'],
        richtig: 0, erklaerung: String.raw`\(f'' > 0\) heißt: \(f'\) wächst – Linkskurve.` },
      { frage: String.raw`Wo ist \(f(x) = x^2\) streng monoton fallend?`,
        optionen: [String.raw`für \(x \le 0\)`, String.raw`für \(x \ge 0\)`, 'nirgends'],
        richtig: 0, erklaerung: String.raw`\(f'(x) = 2x < 0\) für \(x < 0\).` },
    ],
  },

  // ===== Basisfach I.6 · Leistungsfach I.6 =====
  'Extrem- und Wendepunkte': {
    video: null,
    kurz: String.raw`Hoch- und Tiefpunkte sind die Stellen, an denen der Graph von Steigen auf Fallen umschaltet (oder umgekehrt). An einem <b>Wendepunkt</b> wechselt die Krümmung – dort ist der Graph am steilsten oder am flachsten.`,
    merk: {
      formel: String.raw`\begin{aligned} \text{Hochpunkt:}&\quad f'(x_0) = 0,\; f''(x_0) < 0 \\ \text{Tiefpunkt:}&\quad f'(x_0) = 0,\; f''(x_0) > 0 \\ \text{Wendepunkt:}&\quad f''(x_0) = 0,\; f'''(x_0) \neq 0 \end{aligned}`,
      text: String.raw`\(f'(x_0) = 0\) ist nur <i>notwendig</i>. Hinreichend ist zusätzlich \(f''(x_0) \ne 0\) – oder ein Vorzeichenwechsel von \(f'\) bei \(x_0\).`,
    },
    erklaerung: graph({ x: [-2.5, 2.5], y: [-3, 3], kurven: [{ f: x => x ** 3 - 3 * x, kl: 'k1', label: 'f', lx: 2.05 }],
      punkte: [{ x: -1, y: 2, label: 'HP' }, { x: 1, y: -2, label: 'TP' }, { x: 0, y: 0, label: 'WP' }] }),
    beispiel: {
      aufgabe: String.raw`Bestimme die Extrem- und Wendepunkte von \(f(x) = x^3 - 3x\).`,
      schritte: [
        String.raw`\(f'(x) = 3x^2 - 3 = 0 \;\Rightarrow\; x = -1\) oder \(x = 1\)`,
        String.raw`\(f''(x) = 6x\): \(f''(-1) = -6 < 0\) → Hochpunkt \(H(-1\mid 2)\); \(f''(1) = 6 > 0\) → Tiefpunkt \(T(1\mid -2)\)`,
        String.raw`\(f''(x) = 0 \;\Rightarrow\; x = 0\), \(f'''(0) = 6 \ne 0\) → Wendepunkt \(W(0\mid 0)\)`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> „\(f'(x_0) = 0\), also liegt dort ein Extrempunkt.“ – Nicht unbedingt!
      Bei \(f(x) = x^3\) ist \(f'(0) = 0\), aber \(f\) steigt links und rechts von 0: ein <i>Sattelpunkt</i>.`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Bestimme den Extrempunkt von \(f(x) = x^2 - 6x + 5\).`,
        loesung: String.raw`\(f'(x) = 2x - 6 = 0 \Rightarrow x = 3\), \(f''(3) = 2 > 0\). Tiefpunkt \(T(3\mid -4)\).` },
      { niveau: 1, aufgabe: String.raw`Bestimme die Extrempunkte von \(f(x) = -x^3 + 3x\).`,
        loesung: String.raw`\(f'(x) = -3x^2 + 3 = 0 \Rightarrow x = \pm 1\). \(f''(x) = -6x\):<br>\(f''(1) = -6\) → \(H(1\mid 2)\); \(f''(-1) = 6\) → \(T(-1\mid -2)\).` },
      { niveau: 2, aufgabe: String.raw`Bestimme den Wendepunkt von \(f(x) = x^3 - 6x^2 + 9x\).`,
        loesung: String.raw`\(f''(x) = 6x - 12 = 0 \Rightarrow x = 2\), \(f'''(2) = 6 \ne 0\), \(f(2) = 2\). Wendepunkt \(W(2\mid 2)\).` },
      { niveau: 2, aufgabe: String.raw`Bei \(f(x) = x^4\) gilt \(f'(0) = 0\) und \(f''(0) = 0\). Liegt bei \(x = 0\) ein Extrempunkt vor?`,
        loesung: String.raw`Das \(f''\)-Kriterium hilft nicht. Vorzeichen von \(f'(x) = 4x^3\): negativ für \(x < 0\), positiv für \(x > 0\). Wechsel von \(-\) nach \(+\) → Tiefpunkt \(T(0\mid 0)\).` },
      { niveau: 3, aufgabe: String.raw`Bestimme alle Extrem- und Wendepunkte von \(f(x) = x^4 - 2x^2\).`,
        loesung: String.raw`\(f'(x) = 4x^3 - 4x = 4x(x-1)(x+1) = 0 \Rightarrow x \in \{-1, 0, 1\}\).<br>
          \(f''(x) = 12x^2 - 4\): \(f''(0) = -4\) → \(H(0\mid 0)\); \(f''(\pm1) = 8\) → \(T_{1,2}(\pm 1\mid -1)\).<br>
          \(f''(x) = 0 \Rightarrow x = \pm\frac{1}{\sqrt3}\), \(f'''(x) = 24x \ne 0\) → \(W_{1,2}\!\left(\pm\frac{1}{\sqrt3}\mid -\frac59\right)\).` },
      { niveau: 3, aufgabe: String.raw`Bestimme \(a\) so, dass \(f(x) = x^3 + ax^2\) an der Stelle \(x = 2\) eine Extremstelle hat. Hoch- oder Tiefpunkt?`,
        loesung: String.raw`\(f'(x) = 3x^2 + 2ax\), \(f'(2) = 12 + 4a = 0 \Rightarrow a = -3\).<br>\(f''(x) = 6x - 6\), \(f''(2) = 6 > 0\) → Tiefpunkt \(T(2\mid -4)\).` },
    ],
    generator: {
      1: () => {
        const a = nichtNull(-3, 3), xs = zuf(-4, 4), ys = zuf(-6, 6), c = a * xs * xs + ys, f = x => a * x * x - 2 * a * xs * x + c;
        return { aufgabe: `\\text{Extrempunkt von } f(x) = ${summe([[a, 'x^{2}'], [-2 * a * xs, 'x'], [c, '']])}`,
          schritte: [`f'(x) = ${summe([[2 * a, 'x'], [-2 * a * xs, '']])} = 0 \\;\\Rightarrow\\; x = ${xs}`,
                     `f''(x) = ${2 * a} ${a > 0 ? '> 0 \\;\\Rightarrow\\; \\text{Tiefpunkt}' : '< 0 \\;\\Rightarrow\\; \\text{Hochpunkt}'}`,
                     `f(${xs}) = ${ys} \\;\\Rightarrow\\; ${a > 0 ? 'T' : 'H'}(${xs}\\mid ${ys})`],
          pruef: [[ableitung(f, xs), 0], [f(xs), ys]] };
      },
      2: () => {
        const k = kubisch(), { p, q, a, f } = k, hp = a > 0 ? p : q, tp = a > 0 ? q : p;
        return { aufgabe: `\\text{Extrempunkte von } f(x) = ${k.term}`,
          schritte: [`f'(x) = ${k.abl} = 0 \\;\\Rightarrow\\; x = ${p} \\text{ oder } x = ${q}`,
                     `f''(x) = ${k.abl2}:\\; f''(${hp}) = ${6 * a * hp - 3 * a * (p + q)} < 0,\\; f''(${tp}) = ${6 * a * tp - 3 * a * (p + q)} > 0`,
                     `H(${hp}\\mid ${f(hp)}),\\; T(${tp}\\mid ${f(tp)})`],
          pruef: [[ableitung(f, p), 0], [ableitung(f, q), 0], [Math.sign(abl2(f, hp)), -1], [Math.sign(abl2(f, tp)), 1]] };
      },
      3: () => {
        const k = kubisch(), { p, q, a, f } = k, xw = (p + q) / 2;
        return { aufgabe: `\\text{Wendepunkt von } f(x) = ${k.term}`,
          schritte: [`f'(x) = ${k.abl},\\; f''(x) = ${k.abl2}`,
                     `f''(x) = 0 \\;\\Rightarrow\\; x = ${xw},\\; f'''(x) = ${6 * a} \\ne 0`,
                     `f(${xw}) = ${f(xw)} \\;\\Rightarrow\\; W(${xw}\\mid ${f(xw)})`],
          pruef: [[abl2(f, xw), 0]] };
      },
    },
    test: [
      { frage: String.raw`Die Bedingung \(f'(x_0) = 0\) ist für eine Extremstelle …`,
        optionen: ['notwendig, aber nicht hinreichend', 'hinreichend', 'weder notwendig noch hinreichend'],
        richtig: 0, erklaerung: String.raw`Jede (innere) Extremstelle erfüllt sie – aber auch Sattelstellen wie bei \(x^3\).` },
      { frage: String.raw`Es gilt \(f'(2) = 0\) und \(f''(2) = -3\). Was liegt bei \(x = 2\) vor?`,
        optionen: ['ein Hochpunkt', 'ein Tiefpunkt', 'ein Wendepunkt'],
        richtig: 0, erklaerung: String.raw`\(f'' < 0\): Der Graph ist rechtsgekrümmt – also ein Hochpunkt.` },
      { frage: String.raw`Eine Wendestelle von \(f\) ist eine Extremstelle von …`,
        optionen: [String.raw`\(f'\)`, String.raw`\(f\)`, String.raw`\(f''\)`],
        richtig: 0, erklaerung: String.raw`Am Wendepunkt ist die Steigung \(f'\) am größten oder am kleinsten.` },
    ],
  },

  // ===== Basisfach I.7 =====
  'Differenzialrechnung in Sachsituationen': {
    video: null,
    kurz: String.raw`Beschreibt \(f(t)\) eine Größe im Lauf der Zeit, sagt die Ableitung, wie schnell sie sich gerade ändert. Mit den bekannten Werkzeugen findest du größte Werte und Zeitpunkte stärkster Änderung.`,
    merk: {
      formel: String.raw`\begin{aligned} \text{Änderungsrate:}&\quad f'(t) \\ \text{größter Wert:}&\quad f'(t) = 0,\ \text{Ränder prüfen} \\ \text{stärkste Änderung:}&\quad f''(t) = 0 \end{aligned}`,
      text: String.raw`Einheit von \(f'(t)\): Größe pro Zeit, z. B. m/s. Zum Schluss immer einen Antwortsatz mit Einheit formulieren.`,
    },
    beispiel: {
      aufgabe: String.raw`Die Temperatur in einem Gewächshaus wird durch \(T(t) = -0{,}02t^3 + 0{,}3t^2 + 12\) beschrieben (\(t\) in Stunden nach 6 Uhr, \(T\) in °C, \(0 \le t \le 12\)). Wann ist es am wärmsten, wann steigt die Temperatur am stärksten?`,
      schritte: [
        String.raw`\(T'(t) = -0{,}06t^2 + 0{,}6t = -0{,}06t(t - 10) = 0 \;\Rightarrow\; t = 0\) oder \(t = 10\)`,
        String.raw`Werte vergleichen: \(T(0) = 12\), \(T(10) = 22\), \(T(12) = 20{,}64\) → am wärmsten nach 10 h (16 Uhr) mit 22 °C`,
        String.raw`\(T''(t) = -0{,}12t + 0{,}6 = 0 \;\Rightarrow\; t = 5\), \(T'(5) = 1{,}5\)`,
        String.raw`Um 11 Uhr steigt die Temperatur am stärksten, mit 1,5 °C pro Stunde.`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> Bestand und Änderungsrate verwechseln. \(T(5)\) ist eine Temperatur (°C), \(T'(5)\) eine Temperaturänderung pro Stunde (°C/h).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Die Höhe eines Balls ist \(h(t) = -5t^2 + 15t + 2\) (\(t\) in s, \(h\) in m). Berechne \(h'(1)\) und deute den Wert.`,
        loesung: String.raw`\(h'(t) = -10t + 15\), \(h'(1) = 5\): Nach 1 s steigt der Ball mit 5 m/s.` },
      { niveau: 1, aufgabe: String.raw`Wann erreicht der Ball aus Aufgabe 1 seine größte Höhe, und wie hoch ist er dann?`,
        loesung: String.raw`\(h'(t) = 0 \Rightarrow t = 1{,}5\); \(h(1{,}5) = -11{,}25 + 22{,}5 + 2 = 13{,}25\). Nach 1,5 s ist er 13,25 m hoch.` },
      { niveau: 2, aufgabe: String.raw`Bestimme für das Gewächshaus aus dem Beispiel \(T'(11)\) und deute das Ergebnis.`,
        loesung: String.raw`\(T'(11) = -0{,}06\cdot 121 + 6{,}6 = -0{,}66\). Um 17 Uhr sinkt die Temperatur um etwa 0,66 °C pro Stunde.` },
      { niveau: 2, aufgabe: String.raw`Wann ist es im Gewächshaus zwischen 6 und 18 Uhr am kältesten?`,
        loesung: String.raw`Kandidaten: \(t = 0\) (Rand und \(T' = 0\)), \(t = 10\) und der Rand \(t = 12\). \(T(0) = 12\) ist der kleinste Wert: um 6 Uhr mit 12 °C.` },
      { niveau: 3, aufgabe: String.raw`Die Wassermenge in einem Becken ist \(V(t) = -t^3 + 12t^2\) (\(t\) in h, \(V\) in m³, \(0 \le t \le 8\)). Wann fließt das Wasser am schnellsten zu? Wie schnell?`,
        loesung: String.raw`\(V'(t) = -3t^2 + 24t\), \(V''(t) = -6t + 24 = 0 \Rightarrow t = 4\), \(V'(4) = 48\). Nach 4 h nimmt die Wassermenge am stärksten zu, mit 48 m³ pro Stunde.` },
      { niveau: 3, aufgabe: String.raw`Begründe ohne Rechnung: Wenn \(V'(t) > 0\) für \(0 < t < 8\) gilt, ist die Wassermenge bei \(t = 8\) am größten.`,
        loesung: String.raw`\(V' > 0\) heißt: \(V\) wächst auf dem ganzen Intervall. Der größte Wert liegt also am rechten Rand, bei \(t = 8\).` },
    ],
    generator: {
      1: () => {
        const v = wahl([10, 15, 20, 25, 30]), h0 = zuf(0, 5), t1 = zuf(1, 3), h = t => -5 * t * t + v * t + h0, w = -10 * t1 + v;
        return { aufgabe: `h(t) = ${summe([[-5, 't^{2}'], [v, 't'], [h0, '']])}\\; (t \\text{ in s}, h \\text{ in m}).\\; \\text{Geschwindigkeit nach } ${t1}\\text{ s?}`,
          schritte: [`h'(t) = -10t + ${v}`, `h'(${t1}) = ${w}\\;\\tfrac{\\text{m}}{\\text{s}}`,
                     w > 0 ? `\\text{Der Ball steigt mit } ${w} \\text{ m/s.}` : w < 0 ? `\\text{Der Ball fällt mit } ${-w} \\text{ m/s.}` : `\\text{Der Ball ist im höchsten Punkt.}`],
          pruef: [[w, ableitung(h, t1)]] };
      },
      2: () => {
        const v = wahl([10, 20, 30]), h0 = zuf(0, 5), ts = v / 10, h = t => -5 * t * t + v * t + h0;
        return { aufgabe: `h(t) = ${summe([[-5, 't^{2}'], [v, 't'], [h0, '']])}.\\; \\text{Wann ist der Ball am höchsten, wie hoch?}`,
          schritte: [`h'(t) = -10t + ${v} = 0 \\;\\Rightarrow\\; t = ${ts}`, `h''(t) = -10 < 0 \\;\\Rightarrow\\; \\text{Maximum}`,
                     `h(${ts}) = ${h(ts)} \\;\\Rightarrow\\; \\text{nach } ${ts}\\text{ s in } ${h(ts)}\\text{ m Höhe}`],
          pruef: [[ableitung(h, ts), 0]] };
      },
      3: () => {
        const a = wahl([1, 2]), w = zuf(2, 5), V = t => -a * t ** 3 + 3 * a * w * t * t, r = 3 * a * w * w;
        return { aufgabe: `V(t) = ${summe([[-a, 't^{3}'], [3 * a * w, 't^{2}']])}\\; (t \\text{ in h}, V \\text{ in m}^3).\\; \\text{Wann nimmt } V \\text{ am stärksten zu?}`,
          schritte: [`V'(t) = ${summe([[-3 * a, 't^{2}'], [6 * a * w, 't']])}`,
                     `V''(t) = ${summe([[-6 * a, 't'], [6 * a * w, '']])} = 0 \\;\\Rightarrow\\; t = ${w}`,
                     `V'(${w}) = ${r} \\;\\Rightarrow\\; \\text{nach } ${w}\\text{ h mit } ${r}\\;\\tfrac{\\text{m}^3}{\\text{h}}`],
          pruef: [[abl2(V, w), 0], [r, ableitung(V, w)]] };
      },
    },
    test: [
      { frage: String.raw`\(h(t)\) ist eine Höhe in m, \(t\) eine Zeit in s. Welche Einheit hat \(h'(t)\)?`,
        optionen: ['m', 'm/s', 's/m'], richtig: 1, erklaerung: 'Änderungsrate = Änderung der Größe pro Zeiteinheit.' },
      { frage: 'Wie findet man den Zeitpunkt der stärksten Zunahme eines Bestands?',
        optionen: [String.raw`\(f''(t) = 0\) (Wendestelle)`, String.raw`\(f'(t) = 0\)`, String.raw`\(f(t) = 0\)`],
        richtig: 0, erklaerung: String.raw`Gesucht ist das Maximum von \(f'\) – also eine Nullstelle von \(f''\).` },
      { frage: String.raw`Was bedeutet \(f'(3) = -2\), wenn \(f(t)\) eine Wassermenge in Litern ist (\(t\) in min)?`,
        optionen: ['Nach 3 min nimmt die Wassermenge um 2 Liter pro Minute ab.', 'Nach 3 min sind −2 Liter im Becken.', 'Ab Minute 3 nimmt die Wassermenge immer ab.'],
        richtig: 0, erklaerung: String.raw`\(f'(3)\) ist die momentane Änderungsrate zum Zeitpunkt 3 – keine Aussage über später.` },
    ],
  },

  // ===== Leistungsfach I.1 =====
  'Ableitung und Ableitungsregeln': {
    video: null,
    kurz: String.raw`Die Ableitung \(f'(a)\) ist der Grenzwert der Differenzenquotienten: die <b>momentane Änderungsrate</b> von \(f\) an der Stelle \(a\) – geometrisch die Steigung der Tangente. Mit Regeln lassen sich Ableitungen schnell berechnen.`,
    merk: {
      formel: String.raw`\begin{aligned} f'(a) &= \lim_{h\to 0}\frac{f(a+h) - f(a)}{h} \\[4pt] (x^r)' &= r\,x^{r-1} \\ (c\cdot g)' &= c\cdot g' \\ (g + h)' &= g' + h' \\ (\sin x)' &= \cos x \\ (\cos x)' &= -\sin x \end{aligned}`,
      text: String.raw`Leitet man \(f'\) erneut ab, erhält man \(f''\), dann \(f'''\) usw.`,
    },
    erklaerung: String.raw`<p>Drei Sichtweisen auf dieselbe Zahl \(f'(a)\): <b>momentane Änderungsrate</b> (z. B. Geschwindigkeit),
      <b>Tangentensteigung</b> und <b>lokale Linearität</b> – zoomt man in den Graphen hinein, sieht er aus wie eine Gerade mit Steigung \(f'(a)\).</p>`,
    beispiel: {
      aufgabe: String.raw`Bestimme \(f'\) und \(f''\) für \(f(x) = 2x^3 - 4\sqrt{x} + \sin(x)\).`,
      schritte: [
        String.raw`Umschreiben: \(f(x) = 2x^3 - 4x^{\frac12} + \sin(x)\)`,
        String.raw`\(f'(x) = 6x^2 - 2x^{-\frac12} + \cos(x) = 6x^2 - \frac{2}{\sqrt{x}} + \cos(x)\)`,
        String.raw`\(f''(x) = 12x + x^{-\frac32} - \sin(x)\)`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> Im Differenzenquotienten sofort \(h = 0\) einsetzen. Das ergibt \(\frac00\) – erst kürzen bzw. umformen, dann \(h \to 0\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Bestimme \(f'(1)\) für \(f(x) = x^3\) mit dem Differenzenquotienten.`,
        loesung: String.raw`\(\frac{(1+h)^3 - 1}{h} = \frac{3h + 3h^2 + h^3}{h} = 3 + 3h + h^2 \to 3\). Also \(f'(1) = 3\).` },
      { niveau: 1, aufgabe: String.raw`\(f(x) = 5x^4 - 3x^2 + x - 7\)`, loesung: String.raw`\(f'(x) = 20x^3 - 6x + 1\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = \frac{2}{x^3} - 3\sqrt{x}\)`,
        loesung: String.raw`\(f(x) = 2x^{-3} - 3x^{\frac12}\), \(f'(x) = -6x^{-4} - \frac32 x^{-\frac12} = -\frac{6}{x^4} - \frac{3}{2\sqrt{x}}\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = x\sqrt{x}\) – ohne Produktregel!`,
        loesung: String.raw`\(f(x) = x^{\frac32}\), \(f'(x) = \frac32 x^{\frac12} = \frac32\sqrt{x}\)` },
      { niveau: 3, aufgabe: String.raw`Für \(s(t) = t^2 + 2t\) (Weg in m, Zeit in s): Vergleiche die mittlere Geschwindigkeit in \([1;\,3]\) mit der momentanen Geschwindigkeit bei \(t = 2\). Was fällt auf? Begründe.`,
        loesung: String.raw`Mittlere: \(\frac{s(3) - s(1)}{2} = \frac{15 - 3}{2} = 6\) m/s. Momentane: \(s'(t) = 2t + 2\), \(s'(2) = 6\) m/s.<br>
          Gleich! Bei einer Parabel ist die Sekantensteigung über \([a;\,b]\) immer gleich der Tangentensteigung in der Intervallmitte: \(\frac{s(b) - s(a)}{b - a} = (a + b) + 2 = s'\!\left(\tfrac{a+b}{2}\right)\).` },
      { niveau: 3, aufgabe: String.raw`An welchen Stellen in \([0;\,2\pi]\) hat der Graph von \(f(x) = \sin(x)\) eine waagerechte Tangente?`,
        loesung: String.raw`\(f'(x) = \cos(x) = 0 \Rightarrow x = \frac{\pi}{2}\) oder \(x = \frac{3\pi}{2}\).` },
    ],
    generator: genRegeln,
    test: [
      { frage: 'Der Differenzenquotient beschreibt …',
        optionen: ['die mittlere Änderungsrate', 'die momentane Änderungsrate', 'den Funktionswert'],
        richtig: 0, erklaerung: 'Erst der Grenzwert für h → 0 liefert die momentane Änderungsrate.' },
      { frage: String.raw`\(\left(\frac1x\right)' = \;?\)`, optionen: [String.raw`\(-\frac{1}{x^2}\)`, String.raw`\(\frac{1}{x^2}\)`, String.raw`\(0\)`],
        richtig: 0, erklaerung: String.raw`\((x^{-1})' = -x^{-2}\)` },
      { frage: String.raw`\(f(x) = \cos(x)\). Wie groß ist \(f'(\pi)\)?`, optionen: ['0', '−1', '1'],
        richtig: 0, erklaerung: String.raw`\(f'(x) = -\sin(x)\), \(-\sin(\pi) = 0\)` },
    ],
  },

  // ===== Leistungsfach I.2 =====
  'Verkettung von Funktionen': {
    video: null,
    kurz: String.raw`Zwei Funktionen hintereinander ausführen: erst \(v\), dann \(u\). So entsteht zum Beispiel \(\sqrt{x^2 + 1}\) aus \(v(x) = x^2 + 1\) und \(u(x) = \sqrt{x}\). Für die Kettenregel muss man solche Verkettungen sicher erkennen.`,
    merk: {
      formel: String.raw`\begin{aligned} &(u \circ v)(x) = u(v(x)) \\ &v: \text{ innere Funktion} \\ &u: \text{ äußere Funktion} \end{aligned}`,
      text: String.raw`Die Reihenfolge zählt: \(u(v(x))\) und \(v(u(x))\) sind im Allgemeinen verschieden. \(x\) muss in der Definitionsmenge von \(v\) liegen und \(v(x)\) in der von \(u\).`,
    },
    beispiel: {
      aufgabe: String.raw`Gegeben sind \(u(x) = \sqrt{x}\) und \(v(x) = x^2 + 1\). Bestimme \(u(v(x))\) und \(v(u(x))\).`,
      schritte: [
        String.raw`\(u(v(x)) = \sqrt{x^2 + 1}\), definiert für alle \(x \in \mathbb{R}\)`,
        String.raw`\(v(u(x)) = (\sqrt{x})^2 + 1 = x + 1\), aber nur für \(x \ge 0\)`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> Verkettung mit Produkt verwechseln: \(u(v(x))\) ist <i>nicht</i> \(u(x)\cdot v(x)\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`\(u(x) = x^3\), \(v(x) = 2x - 1\). Bestimme \(u(v(x))\) und \(v(u(x))\).`,
        loesung: String.raw`\(u(v(x)) = (2x - 1)^3\), \(v(u(x)) = 2x^3 - 1\)` },
      { niveau: 1, aufgabe: String.raw`Zerlege \(f(x) = \sin(x^2)\) in innere und äußere Funktion.`,
        loesung: String.raw`innen \(v(x) = x^2\), außen \(u(x) = \sin(x)\)` },
      { niveau: 2, aufgabe: String.raw`Zerlege \(f(x) = \sqrt{4 - x^2}\) und gib die Definitionsmenge an.`,
        loesung: String.raw`innen \(v(x) = 4 - x^2\), außen \(u(x) = \sqrt{x}\). Es muss \(4 - x^2 \ge 0\) gelten: \(D = [-2;\,2]\).` },
      { niveau: 2, aufgabe: String.raw`Finde zwei verschiedene Zerlegungen von \(f(x) = \frac{1}{(x-3)^2}\).`,
        loesung: String.raw`z. B. innen \(x - 3\), außen \(\frac{1}{x^2}\) – oder innen \((x - 3)^2\), außen \(\frac{1}{x}\).` },
      { niveau: 3, aufgabe: String.raw`Für welche \(x\) ist \(u(v(x))\) mit \(u(x) = \sqrt{x}\) und \(v(x) = x - 5\) definiert? Und \(v(u(x))\)?`,
        loesung: String.raw`\(u(v(x)) = \sqrt{x - 5}\): für \(x \ge 5\). \(v(u(x)) = \sqrt{x} - 5\): für \(x \ge 0\).` },
      { niveau: 3, aufgabe: String.raw`Gibt es Funktionen mit \(u(v(x)) = v(u(x))\)? Finde ein Beispiel mit \(u \ne v\).`,
        loesung: String.raw`Ja, z. B. \(u(x) = x + 2\), \(v(x) = x + 5\): beide Reihenfolgen ergeben \(x + 7\). Oder \(u(x) = x^2\), \(v(x) = x^3\): beide ergeben \(x^6\).` },
    ],
    generator: {
      1: () => {
        const m = nichtNull(-3, 3), c = zuf(-4, 4), a = zuf(-3, 3), w = m * a + c;
        return { aufgabe: `u(x) = x^{2},\\; v(x) = ${summe([[m, 'x'], [c, '']])}.\\; \\text{Berechne } u(v(${a})) \\text{ und } v(u(${a})).`,
          schritte: [`v(${a}) = ${w} \\;\\Rightarrow\\; u(v(${a})) = ${kl(w)}^2 = ${w * w}`,
                     `u(${a}) = ${a * a} \\;\\Rightarrow\\; v(u(${a})) = ${m * a * a + c}`],
          pruef: [[w * w, (m * a + c) ** 2]] };
      },
      2: () => {
        const n = zuf(2, 4), m = nichtNull(-3, 3), c = nichtNull(-5, 5), innen = summe([[m, 'x'], [c, '']]);
        return { aufgabe: `u(x) = ${pot(n)},\\; v(x) = ${innen}.\\; \\text{Bestimme } u(v(x)) \\text{ und } v(u(x)).`,
          schritte: [`u(v(x)) = (${innen})^{${n}}`, `v(u(x)) = ${summe([[m, pot(n)], [c, '']])}`] };
      },
      3: () => {
        const m = nichtNull(-3, 3), c = nichtNull(-5, 5), n = zuf(2, 5), innen = summe([[m, 'x'], [c, '']]);
        const [term, aussen] = wahl([[`(${innen})^{${n}}`, pot(n)], [`\\sin(${innen})`, '\\sin(x)'], [`\\sqrt{${innen}}`, '\\sqrt{x}'], [`\\frac{1}{${innen}}`, '\\frac{1}{x}']]);
        return { aufgabe: `\\text{Zerlege } f(x) = ${term}`,
          schritte: [`\\text{innere Funktion: } v(x) = ${innen}`, `\\text{äußere Funktion: } u(x) = ${aussen}`] };
      },
    },
    test: [
      { frage: String.raw`\(u(x) = x^2\), \(v(x) = x + 1\). Wie groß ist \(u(v(2))\)?`, optionen: ['5', '9', '6'],
        richtig: 1, erklaerung: String.raw`\(v(2) = 3\), \(u(3) = 9\)` },
      { frage: String.raw`Was ist die innere Funktion von \(f(x) = \sin(3x)\)?`, optionen: [String.raw`\(3x\)`, String.raw`\(\sin(x)\)`, String.raw`\(3\)`],
        richtig: 0, erklaerung: 'Die innere Funktion wird zuerst ausgeführt.' },
      { frage: String.raw`\(u(x) = x^2\), \(v(x) = x + 1\). Was ist \(v(u(x))\)?`, optionen: [String.raw`\((x+1)^2\)`, String.raw`\(x^2 + 1\)`, String.raw`\(x^2(x + 1)\)`],
        richtig: 1, erklaerung: String.raw`Erst \(u\), dann \(v\): \(x^2 + 1\).` },
    ],
  },

  // ===== Leistungsfach I.3 =====
  'Kettenregel': {
    video: null,
    kurz: String.raw`Wie leitet man eine Verkettung wie \(\sin(x^2)\) oder \(\sqrt{x^3 + 2}\) ab? Die Kettenregel sagt: äußere Ableitung mal innere Ableitung.`,
    merk: {
      formel: String.raw`\begin{aligned} f(x) &= u(v(x)) \\ f'(x) &= u'(v(x))\cdot v'(x) \end{aligned}`,
      text: String.raw`„Äußere Ableitung (innere Funktion bleibt stehen) mal innere Ableitung.“`,
    },
    erklaerung: String.raw`<p><b>Verstärkungsfaktoren:</b> Ändert sich \(x\) ein wenig, ändert sich \(v(x)\) etwa um das \(v'(x)\)-Fache.
      Diese Änderung wird von \(u\) noch einmal etwa um das \(u'(v(x))\)-Fache verstärkt. Insgesamt multiplizieren sich die beiden Faktoren.</p>`,
    beispiel: {
      aufgabe: String.raw`Leite \(f(x) = \sin(x^2)\) ab.`,
      schritte: [
        String.raw`Innen \(v(x) = x^2\), \(v'(x) = 2x\); außen \(u(x) = \sin(x)\), \(u'(x) = \cos(x)\)`,
        String.raw`\(f'(x) = \cos(x^2)\cdot 2x = 2x\cos(x^2)\)`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> Innere Ableitung vergessen: \(\left(\sqrt{x^2 + 1}\right)' = \frac{2x}{2\sqrt{x^2+1}} = \frac{x}{\sqrt{x^2 + 1}}\), nicht \(\frac{1}{2\sqrt{x^2 + 1}}\).`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`\(f(x) = (x^2 + 1)^5\)`, loesung: String.raw`\(f'(x) = 5(x^2 + 1)^4\cdot 2x = 10x(x^2 + 1)^4\)` },
      { niveau: 1, aufgabe: String.raw`\(f(x) = \cos(3x^2)\)`, loesung: String.raw`\(f'(x) = -\sin(3x^2)\cdot 6x = -6x\sin(3x^2)\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = \sqrt{x^3 + 2}\)`, loesung: String.raw`\(f'(x) = \frac{1}{2\sqrt{x^3 + 2}}\cdot 3x^2 = \frac{3x^2}{2\sqrt{x^3 + 2}}\)` },
      { niveau: 2, aufgabe: String.raw`\(f(x) = \frac{1}{(2x - 1)^3}\)`, loesung: String.raw`\(f(x) = (2x-1)^{-3}\), \(f'(x) = -3(2x - 1)^{-4}\cdot 2 = -\frac{6}{(2x - 1)^4}\)` },
      { niveau: 3, aufgabe: String.raw`\(f(x) = \sin^2(x) = (\sin x)^2\)`, loesung: String.raw`\(f'(x) = 2\sin(x)\cdot\cos(x)\)` },
      { niveau: 3, aufgabe: String.raw`Bestimme die Tangente an den Graphen von \(f(x) = \sqrt{2x + 5}\) an der Stelle \(x_0 = 2\).`,
        loesung: String.raw`\(f(2) = 3\), \(f'(x) = \frac{1}{\sqrt{2x + 5}}\), \(f'(2) = \frac13\).<br>\(t:\; y = \frac13(x - 2) + 3 = \frac13 x + \frac73\)` },
    ],
    generator: {
      1: genLinear[1],
      2: () => {
        const a = nichtNull(-3, 3), c = nichtNull(-4, 4), n = zuf(2, 4), innen = summe([[a, 'x^{2}'], [c, '']]);
        const f = x => (a * x * x + c) ** n, df = x => 2 * a * n * x * (a * x * x + c) ** (n - 1);
        return { aufgabe: `f(x) = (${innen})^{${n}}`,
          schritte: [`\\text{innen: } ${innen},\\; \\text{innere Ableitung: } ${koef(2 * a)}x`,
                     `f'(x) = ${n}(${innen})^{${n - 1}}\\cdot ${2 * a < 0 ? `(${koef(2 * a)}x)` : koef(2 * a) + 'x'}`,
                     `f'(x) = ${koef(2 * a * n)}x\\,(${innen})${n - 1 > 1 ? `^{${n - 1}}` : ''}`],
          pruef: pruefAbl(f, df) };
      },
      3: () => {
        const a = nichtNull(-3, 3), sin = Math.random() < .5, innen = `${koef(a)}x^{2}`;
        const f = x => sin ? Math.sin(a * x * x) : Math.cos(a * x * x);
        const df = x => sin ? 2 * a * x * Math.cos(a * x * x) : -2 * a * x * Math.sin(a * x * x);
        return { aufgabe: `f(x) = \\${sin ? 'sin' : 'cos'}(${innen})`,
          schritte: [`\\text{innere Ableitung: } ${koef(2 * a)}x`,
                     `f'(x) = ${koef(sin ? 2 * a : -2 * a)}x\\,\\${sin ? 'cos' : 'sin'}(${innen})`],
          pruef: pruefAbl(f, df) };
      },
    },
    test: [
      { frage: String.raw`\(((3x + 1)^4)' = \;?\)`, optionen: [String.raw`\(4(3x+1)^3\)`, String.raw`\(12(3x + 1)^3\)`, String.raw`\(12x^3\)`],
        richtig: 1, erklaerung: String.raw`\(4(3x+1)^3\cdot 3\)` },
      { frage: String.raw`\((\sin(x^2))' = \;?\)`, optionen: [String.raw`\(\cos(x^2)\)`, String.raw`\(2x\cos(x^2)\)`, String.raw`\(\cos(2x)\)`],
        richtig: 1, erklaerung: String.raw`Äußere Ableitung \(\cos(x^2)\) mal innere Ableitung \(2x\).` },
      { frage: String.raw`\(((\cos x)^2)' = \;?\)`, optionen: [String.raw`\(-2\sin(x)\cos(x)\)`, String.raw`\(2\cos(x)\)`, String.raw`\(-\sin^2(x)\)`],
        richtig: 0, erklaerung: String.raw`\(2\cos(x)\cdot(-\sin(x))\)` },
    ],
  },

  // ===== Leistungsfach I.7 =====
  'Tangente und Normale': {
    video: null,
    kurz: String.raw`Die <b>Tangente</b> schmiegt sich im Punkt \(P\) an den Graphen an. Die <b>Normale</b> steht in \(P\) senkrecht auf der Tangente.`,
    merk: {
      formel: String.raw`\begin{aligned} t:\; y &= f'(a)\,(x - a) + f(a) \\ n:\; y &= -\frac{1}{f'(a)}\,(x - a) + f(a) \qquad (f'(a) \ne 0) \end{aligned}`,
      text: String.raw`Senkrechte Geraden: \(m_t\cdot m_n = -1\). Ist \(f'(a) = 0\), ist die Normale die senkrechte Gerade \(x = a\).`,
    },
    erklaerung: graph({ x: [-2, 3], y: [-1, 4], kurven: [
      { f: x => x * x, kl: 'k1', label: 'f', lx: -1.9 },
      { f: x => 2 * x - 1, kl: 'k3', label: 'Tangente', lx: 2.1 },
      { f: x => -x / 2 + 1.5, kl: 'k2', label: 'Normale', lx: 2.2 }],
      punkte: [{ x: 1, y: 1, label: 'P' }] }),
    beispiel: {
      aufgabe: String.raw`Bestimme Tangente und Normale an den Graphen von \(f(x) = x^2\) im Punkt \(P(1\mid 1)\).`,
      schritte: [
        String.raw`\(f'(x) = 2x\), \(f'(1) = 2\)`,
        String.raw`Tangente: \(y = 2(x - 1) + 1 = 2x - 1\)`,
        String.raw`Normale: \(m_n = -\frac12\), \(y = -\frac12(x - 1) + 1 = -\frac12 x + \frac32\)`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> Normalensteigung \(-m\) statt \(-\frac1m\). Beide Schritte sind nötig: Kehrwert <i>und</i> Vorzeichenwechsel.`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`Tangente an \(f(x) = x^3\) im Punkt \(P(1\mid 1)\).`,
        loesung: String.raw`\(f'(x) = 3x^2\), \(f'(1) = 3\): \(y = 3(x - 1) + 1 = 3x - 2\)` },
      { niveau: 1, aufgabe: String.raw`Normale an \(f(x) = x^2\) an der Stelle \(x_0 = 2\).`,
        loesung: String.raw`\(f(2) = 4\), \(f'(2) = 4\), \(m_n = -\frac14\): \(y = -\frac14(x - 2) + 4 = -\frac14 x + \frac92\)` },
      { niveau: 2, aufgabe: String.raw`Zeige: Die Tangente \(y = 3x - 2\) aus Aufgabe 1 schneidet den Graphen von \(f(x) = x^3\) noch in einem zweiten Punkt.`,
        loesung: String.raw`\(x^3 = 3x - 2 \Leftrightarrow x^3 - 3x + 2 = 0 \Leftrightarrow (x - 1)^2(x + 2) = 0\). Zweiter Schnittpunkt bei \(x = -2\): \(S(-2\mid -8)\).` },
      { niveau: 2, aufgabe: String.raw`An welchen Stellen hat der Graph von \(f(x) = x^3 - 3x\) eine Tangente parallel zu \(y = 9x\)?`,
        loesung: String.raw`\(f'(x) = 3x^2 - 3 = 9 \Rightarrow x = \pm 2\). Punkte \((2\mid 2)\) und \((-2\mid -2)\).` },
      { niveau: 3, aufgabe: String.raw`Vom Punkt \(Q(0\mid -1)\) aus werden Tangenten an den Graphen von \(f(x) = x^2\) gelegt. Bestimme ihre Gleichungen.`,
        loesung: String.raw`Tangente in \((a\mid a^2)\): \(y = 2a(x - a) + a^2 = 2ax - a^2\). Durch \(Q\): \(-1 = -a^2 \Rightarrow a = \pm1\).<br>Tangenten: \(y = 2x - 1\) und \(y = -2x - 1\).` },
      { niveau: 3, aufgabe: String.raw`Wo schneidet die Normale an \(f(x) = \sqrt{x}\) im Punkt \(P(4\mid 2)\) die \(x\)-Achse?`,
        loesung: String.raw`\(f'(x) = \frac{1}{2\sqrt{x}}\), \(f'(4) = \frac14\), \(m_n = -4\): \(y = -4(x - 4) + 2 = -4x + 18\). Nullstelle bei \(x = 4{,}5\).` },
    ],
    generator: {
      1: genTangenteParabel,
      2: () => {
        let a, b, x0, m;
        do { a = wahl([-2, -1, 1, 2]); b = zuf(-4, 4); x0 = nichtNull(-3, 3); m = 2 * a * x0 + b; } while (m === 0);
        const c = zuf(-5, 5), f = x => a * x * x + b * x + c, y0 = f(x0);
        return { aufgabe: `\\text{Normale an } f(x) = ${summe([[a, 'x^{2}'], [b, 'x'], [c, '']])} \\text{ an der Stelle } x_0 = ${x0}`,
          schritte: [`f(${x0}) = ${y0},\\; f'(x) = ${summe([[2 * a, 'x'], [b, '']])},\\; f'(${x0}) = ${m}`,
                     `m_n = -\\frac{1}{${m}} = ${bruch(-1, m)}`,
                     `n:\\; y = ${bruch(-1, m)}\\,(x ${x0 < 0 ? '+' : '-'} ${Math.abs(x0)}) ${y0 < 0 ? '-' : '+'} ${Math.abs(y0)} = ${bruch(-1, m)}x ${(x0 + y0 * m) / m < 0 ? '-' : '+'} ${bruch(Math.abs(x0 + y0 * m), Math.abs(m))}`],
          pruef: [[m, ableitung(f, x0)], [-1 / m * x0 + (x0 + y0 * m) / m, y0]] };
      },
      3: () => {
        const b = zuf(-4, 4), x0 = nichtNull(-2, 2), f = x => x ** 3 + b * x, m = 3 * x0 * x0 + b, y0 = f(x0), n = y0 - m * x0;
        return { aufgabe: `\\text{Tangente an } f(x) = ${summe([[1, 'x^{3}'], [b, 'x']])} \\text{ an der Stelle } x_0 = ${x0}`,
          schritte: [`f(${x0}) = ${y0},\\; f'(x) = ${summe([[3, 'x^{2}'], [b, '']])},\\; f'(${x0}) = ${m}`,
                     `t:\\; y = ${m}\\,(x ${x0 < 0 ? '+' : '-'} ${Math.abs(x0)}) ${y0 < 0 ? '-' : '+'} ${Math.abs(y0)} = ${summe([[m, 'x'], [n, '']])}`],
          pruef: [[m, ableitung(f, x0)], [m * x0 + n, y0]] };
      },
    },
    test: [
      { frage: String.raw`Die Tangente hat die Steigung \(2\). Welche Steigung hat die Normale?`, optionen: [String.raw`\(-2\)`, String.raw`\(-\frac12\)`, String.raw`\(\frac12\)`],
        richtig: 1, erklaerung: String.raw`\(m_n = -\frac{1}{m_t}\)` },
      { frage: String.raw`Es gilt \(f'(a) = 0\). Wie verläuft die Normale in \(P(a\mid f(a))\)?`,
        optionen: [String.raw`senkrecht: \(x = a\)`, 'waagerecht', 'Es gibt keine Normale.'],
        richtig: 0, erklaerung: 'Die Tangente ist waagerecht, die Normale steht senkrecht darauf.' },
      { frage: String.raw`Tangente an \(f(x) = x^2\) an der Stelle \(x_0 = 3\)?`, optionen: [String.raw`\(y = 6x - 9\)`, String.raw`\(y = 6x + 9\)`, String.raw`\(y = 3x\)`],
        richtig: 0, erklaerung: String.raw`\(y = 6(x - 3) + 9 = 6x - 9\)` },
    ],
  },

  // ===== Leistungsfach I.8 =====
  'Extremwertprobleme mit Nebenbedingungen': {
    video: null,
    kurz: String.raw`Größtmögliche Fläche, kleinster Materialverbrauch: Optimieren heißt, eine Zielgröße zu maximieren oder zu minimieren – unter einer Bedingung, die die Variablen miteinander verknüpft.`,
    merk: {
      formel: String.raw`\begin{aligned} &\text{Zielfunktion } Z(x, y) \\ &\downarrow\ \text{Nebenbedingung einsetzen} \\ &Z(x) \text{ mit Definitionsbereich} \\ &\downarrow \\ &Z'(x) = 0,\ \text{Ränder prüfen} \end{aligned}`,
      text: 'Ablauf: Skizze und Variablen – Zielfunktion – Nebenbedingung – einsetzen – Definitionsbereich – Extremum (inklusive Ränder) – Antwortsatz.',
    },
    beispiel: {
      aufgabe: String.raw`Ein rechteckiges Beet wird an einer Hauswand mit 40 m Zaun auf den drei anderen Seiten eingezäunt. Wie groß kann es höchstens werden?`,
      schritte: [
        String.raw`Variablen: \(x\) = Seite senkrecht zur Wand, \(y\) = Seite parallel zur Wand`,
        String.raw`Zielfunktion \(A = x\cdot y\), Nebenbedingung \(2x + y = 40 \Rightarrow y = 40 - 2x\)`,
        String.raw`\(A(x) = x(40 - 2x) = 40x - 2x^2\), \(0 < x < 20\)`,
        String.raw`\(A'(x) = 40 - 4x = 0 \Rightarrow x = 10\), \(A''(x) = -4 < 0\) → Maximum`,
        String.raw`\(y = 20\), \(A = 200\): Das Beet ist 10 m × 20 m groß, also 200 m².`,
      ],
    },
    fehler: String.raw`<b>Typischer Fehler:</b> Ränder vergessen. \(Z'(x) = 0\) findet nur Extrema im Inneren – der größte oder kleinste Wert kann auch am Rand des Definitionsbereichs liegen.`,
    uebungen: [
      { niveau: 1, aufgabe: 'Zwei positive Zahlen haben die Summe 10. Wann ist ihr Produkt am größten?',
        loesung: String.raw`\(P(x) = x(10 - x)\), \(P'(x) = 10 - 2x = 0 \Rightarrow x = 5\). Beide Zahlen sind 5, \(P = 25\).` },
      { niveau: 2, aufgabe: String.raw`Aus einem quadratischen Blech mit 12 cm Seitenlänge entsteht eine oben offene Schachtel, indem an den Ecken Quadrate mit Seitenlänge \(x\) ausgeschnitten werden. Für welches \(x\) ist das Volumen maximal?`,
        loesung: String.raw`\(V(x) = x(12 - 2x)^2\), \(0 < x < 6\).<br>\(V'(x) = (12 - 2x)^2 - 4x(12 - 2x) = (12 - 2x)(12 - 6x) = 0 \Rightarrow x = 2\) (\(x = 6\) ist Rand).<br>\(V(2) = 2\cdot 64 = 128\) cm³.` },
      { niveau: 2, aufgabe: String.raw`Bestimme den größten und den kleinsten Wert von \(f(x) = x^3 - 3x\) im Intervall \([0;\,3]\).`,
        loesung: String.raw`\(f'(x) = 3x^2 - 3 = 0 \Rightarrow x = 1\) (in \([0;3]\)). Werte: \(f(0) = 0\), \(f(1) = -2\), \(f(3) = 18\).<br>Kleinster Wert \(-2\) bei \(x = 1\), größter Wert \(18\) am Rand \(x = 3\).` },
      { niveau: 3, aufgabe: String.raw`Unter dem Graphen von \(f(x) = -x^2 + 4\) liegt im 1. Quadranten ein Rechteck mit einer Ecke im Ursprung und der gegenüberliegenden Ecke auf dem Graphen. Wann ist seine Fläche maximal?`,
        loesung: String.raw`\(A(u) = u(4 - u^2) = 4u - u^3\), \(0 < u < 2\). \(A'(u) = 4 - 3u^2 = 0 \Rightarrow u = \frac{2}{\sqrt3}\).<br>\(A = \frac{2}{\sqrt3}\cdot\frac83 = \frac{16}{3\sqrt3} = \frac{16\sqrt3}{9} \approx 3{,}08\)` },
      { niveau: 3, aufgabe: String.raw`Eine zylindrische Dose soll 1 Liter (1000 cm³) fassen. Bei welchem Radius ist die Oberfläche am kleinsten?`,
        loesung: String.raw`\(O = 2\pi r^2 + 2\pi r h\), \(\pi r^2 h = 1000 \Rightarrow h = \frac{1000}{\pi r^2}\).<br>\(O(r) = 2\pi r^2 + \frac{2000}{r}\), \(O'(r) = 4\pi r - \frac{2000}{r^2} = 0 \Rightarrow r = \sqrt[3]{\frac{500}{\pi}} \approx 5{,}42\) cm.<br>Dann ist \(h \approx 10{,}84\) cm \(= 2r\): Höhe gleich Durchmesser.` },
    ],
    generator: {
      1: () => {
        const s = 2 * zuf(4, 20), x = s / 2, P = t => t * (s - t);
        return { aufgabe: `\\text{Zwei Zahlen haben die Summe } ${s}.\\; \\text{Wann ist ihr Produkt maximal?}`,
          schritte: [`P(x) = x(${s} - x) = ${s}x - x^{2}`, `P'(x) = ${s} - 2x = 0 \\;\\Rightarrow\\; x = ${x}`,
                     `P''(x) = -2 < 0 \\;\\Rightarrow\\; \\text{Maximum: } ${x}\\cdot ${x} = ${x * x}`],
          pruef: [[ableitung(P, x), 0]] };
      },
      2: () => {
        const L = 4 * zuf(5, 20), x = L / 4, A = t => t * (L - 2 * t);
        return { aufgabe: `\\text{Rechteck an einer Wand, } ${L}\\text{ m Zaun für drei Seiten. Größte Fläche?}`,
          schritte: [`A(x) = x(${L} - 2x) = ${L}x - 2x^{2},\\; 0 < x < ${L / 2}`, `A'(x) = ${L} - 4x = 0 \\;\\Rightarrow\\; x = ${x}`,
                     `y = ${L} - 2\\cdot ${x} = ${L / 2},\\; A = ${x}\\cdot ${L / 2} = ${x * L / 2}\\text{ m}^2`],
          pruef: [[ableitung(A, x), 0], [x * L / 2, A(x)]] };
      },
      3: () => {
        const k = zuf(1, 5), a = 6 * k, V = x => x * (a - 2 * x) ** 2;
        return { aufgabe: `\\text{Offene Schachtel aus Quadrat mit Seite } ${a}\\text{ cm: Ecken } x \\text{ ausschneiden. Größtes Volumen?}`,
          schritte: [`V(x) = x(${a} - 2x)^2,\\; 0 < x < ${a / 2}`,
                     `V'(x) = (${a} - 2x)(${a} - 6x) = 0 \\;\\Rightarrow\\; x = ${k} \\;(x = ${a / 2} \\text{ ist Rand})`,
                     `V(${k}) = ${k}\\cdot ${a - 2 * k}^2 = ${16 * k ** 3}\\text{ cm}^3`],
          pruef: [[ableitung(V, k), 0], [16 * k ** 3, V(k)]] };
      },
    },
    test: [
      { frage: 'Was beschreibt die Nebenbedingung?',
        optionen: ['den Zusammenhang zwischen den Variablen', 'die Größe, die optimiert werden soll', 'den Definitionsbereich der Ableitung'],
        richtig: 0, erklaerung: 'Mit ihr wird eine Variable durch die andere ausgedrückt.' },
      { frage: String.raw`Du hast \(Z'(x) = 0\) gelöst. Was musst du noch prüfen?`,
        optionen: ['die Randwerte des Definitionsbereichs', 'nichts mehr', String.raw`ob \(Z(x) = 0\) ist`],
        richtig: 0, erklaerung: 'Der größte oder kleinste Wert kann auch am Rand liegen.' },
      { frage: 'Welches Rechteck mit Umfang 20 cm hat die größte Fläche?',
        optionen: ['das Quadrat 5 cm × 5 cm', '4 cm × 6 cm', '1 cm × 9 cm'],
        richtig: 0, erklaerung: String.raw`\(A(x) = x(10 - x)\) ist bei \(x = 5\) maximal: 25 cm².` },
    ],
  },
});
