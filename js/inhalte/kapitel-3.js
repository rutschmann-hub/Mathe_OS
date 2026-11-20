// Kapitel III · Integralrechnung (Basisfach und Leistungsfach)
// Bekannt ab III.1: Ableitung, Änderungsrate, Potenz- und Summenregel, e-Funktion, Logarithmus. Noch nicht: Integral, Stammfunktion.
// Bestimmte Integrale und Stammfunktionen kommen erst in III.2 bis III.4; hier nur Flächen aus Rechtecken, Dreiecken, Trapezen.

// Fläche zwischen Graph von f und t-Achse über [a; b], numerisch (nur für pruef-Paare)
const flaecheZahl = (f, a, b, n = 4000) => { let s = 0; for (let i = 0; i < n; i++) s += f(a + (b - a) * (i + .5) / n); return s * (b - a) / n; };

Object.assign(INHALTE, {

  // ===== Basisfach III.1 · Leistungsfach III.1 =====
  'Rekonstruieren einer Größe': {
    video: null,
    kurz: String.raw`Bisher haben wir aus einer Größe ihre Änderungsrate berechnet. Jetzt geht es zurück: Kennt man die <b>Änderungsrate</b> (zum Beispiel Zuflussrate oder Geschwindigkeit), kann man die Größe selbst <b>rekonstruieren</b> – als Flächeninhalt unter dem Graphen der Rate.`,
    merk: {
      zeilen: [
        ['Konstante Rate', String.raw`B(t_2) = B(t_1) + r\cdot(t_2 - t_1)`],
        ['Allgemein', String.raw`B(t_2) = B(t_1) + \text{Fläche zwischen Graph der Rate und } t\text{-Achse}`],
        ['Vorzeichen', String.raw`\text{Rate} > 0:\ \text{Fläche zählt} +, \qquad \text{Rate} < 0:\ \text{Fläche zählt} -`],
      ],
      text: String.raw`\(B\) ist der Bestand (zum Beispiel Wassermenge in Litern), die Rate hat die Einheit „Bestand pro Zeit“ (l/min). Die Fläche unter dem Graphen der Rate ist die <b>Gesamtänderung</b> des Bestands.`,
    },
    erklaerung: String.raw`<p>Fließt in ein Becken Wasser mit der <b>konstanten</b> Zuflussrate \(r = 4\) l/min, dann kommen in 3 Minuten \(4\cdot 3 = 12\) l dazu. Genau das ist der Flächeninhalt eines Rechtecks mit Breite 3 (Minuten) und Höhe 4 (l/min).
      Einheiten bestätigen das: \(\text{l/min}\cdot\text{min} = \text{l}\).</p>
      <p>Ändert sich die Rate, zerlegt man den Graphen in Stücke, deren Fläche man kennt (Rechteck, Dreieck, Trapez) und addiert die Flächen. Im Bild (waagerecht die Zeit \(t\) in min, senkrecht die Rate in l/min) ist die Zuflussrate zuerst 3 min lang konstant 4 und sinkt dann gleichmäßig auf 0:</p>`
      + graph({ x: [-0.5, 6.5], y: [-1, 5], kurven: [{ f: t => t < 0 || t > 6 ? NaN : t <= 3 ? 4 : 4 - 4 * (t - 3) / 3, kl: 'k1', label: 'Rate', lx: 4.6 }],
        flaechen: [{ a: 0, b: 3, f: () => 4 }, { a: 3, b: 6, f: t => 4 - 4 * (t - 3) / 3 }] })
      + String.raw`<p>Rechteck: \(3\cdot 4 = 12\). Dreieck: \(\frac12\cdot 3\cdot 4 = 6\). Insgesamt fließen \(18\) l zu. War das Becken zu Beginn mit \(10\) l gefüllt, enthält es nach 6 Minuten \(10 + 18 = 28\) l.</p>
      <p><b>Rate unter der Achse:</b> Ist die Rate negativ (Wasser fließt ab, ein Auto fährt rückwärts), liegt der Graph unter der \(t\)-Achse. Diese Fläche zählt negativ und verkleinert den Bestand. Insgesamt gilt: Fläche oberhalb minus Fläche unterhalb ist die Gesamtänderung („Bilanz“).</p>
      <p><b>Wenn der Graph gekrümmt ist,</b> kennt man keine Flächenformel. Dann schätzt man ab: Man legt Rechtecke der Breite 1 unter bzw. über den Graphen und erhält eine untere und eine obere Schranke für die Gesamtänderung. Beispiel: Ein Fahrzeug hat die Geschwindigkeit \(v(t) = \frac12 t^2\) (m/s) in den ersten 4 Sekunden. Welchen Weg legt es zurück?</p>`
      + `<div class="grafiken"><figure>`
      + graph({ x: [-0.5, 4.5], y: [-1, 9], kurven: [{ f: t => t * t / 2, kl: 'k1' }], balken: [0, 1, 2, 3].map(i => ({ a: i, b: i + 1, h: i * i / 2 })) })
      + String.raw`<figcaption>Rechtecke unter dem Graphen: \(0 + 0{,}5 + 2 + 4{,}5 = 7\)</figcaption></figure><figure>`
      + graph({ x: [-0.5, 4.5], y: [-1, 9], kurven: [{ f: t => t * t / 2, kl: 'k1' }], balken: [0, 1, 2, 3].map(i => ({ a: i, b: i + 1, h: (i + 1) ** 2 / 2 })) })
      + String.raw`<figcaption>Rechtecke über dem Graphen: \(0{,}5 + 2 + 4{,}5 + 8 = 15\)</figcaption></figure></div>
      <p>Der gesuchte Weg liegt zwischen 7 m und 15 m. Mit schmaleren Rechtecken wird die Abschätzung immer genauer – daraus entsteht in den nächsten Abschnitten der Begriff des <b>Integrals</b>.</p>`,
    beispiel: {
      aufgabe: String.raw`Ein Becken enthält anfangs \(20\) l Wasser. Die Zuflussrate (in l/min) ist \(r(t) = 2t\) für \(0 \le t \le 3\) und danach konstant \(6\) bis \(t = 5\). Wie viel Wasser ist nach 5 Minuten im Becken?`,
      schritte: [
        String.raw`Erster Abschnitt (\(0\) bis \(3\) min): Dreieck mit Breite \(3\) und Höhe \(r(3) = 6\): \(\frac12\cdot 3\cdot 6 = 9\) l`,
        String.raw`Zweiter Abschnitt (\(3\) bis \(5\) min): Rechteck mit Breite \(2\) und Höhe \(6\): \(2\cdot 6 = 12\) l`,
        String.raw`Gesamtänderung: \(9 + 12 = 21\) l`,
        String.raw`Bestand nach 5 min: \(20 + 21 = 41\) l`,
      ],
    },
    fehler: String.raw`<b>Typische Fehler:</b> Die Rate mit dem Bestand verwechseln – die <i>Rate</i> sagt, wie schnell sich der Bestand ändert, nicht, wie viel da ist. Und den Anfangsbestand vergessen: Die Fläche liefert nur die <i>Änderung</i>.`,
    uebungen: [
      { niveau: 1, aufgabe: String.raw`In einem Tank sind \(30\) l. Es fließen 8 Minuten lang \(5\) l/min zu. Wie viel Wasser ist danach im Tank?`,
        loesung: String.raw`\(5\cdot 8 = 40\) l kommen dazu. Bestand: \(30 + 40 = 70\) l.` },
      { niveau: 1, aufgabe: String.raw`Ein Auto fährt 15 Sekunden lang mit der konstanten Geschwindigkeit \(20\) m/s. Welche Strecke legt es zurück? Welche Fläche im \(t\)-\(v\)-Diagramm gehört dazu?`,
        loesung: String.raw`\(20\cdot 15 = 300\) m. Es ist der Flächeninhalt des Rechtecks mit Breite \(15\) s und Höhe \(20\) m/s.` },
      { niveau: 2, aufgabe: String.raw`Die Zuflussrate steigt von \(t = 0\) bis \(t = 6\) (min) gleichmäßig von \(0\) auf \(6\) l/min an. Wie viel Wasser fließt in dieser Zeit zu?`,
        loesung: String.raw`Dreieck: \(\frac12\cdot 6\cdot 6 = 18\) l.` },
      { niveau: 2, aufgabe: String.raw`Ein Becken enthält \(12\) l. Von \(t = 0\) bis \(2\) min ist die Rate \(+3\) l/min, von \(t = 2\) bis \(5\) min ist sie \(-2\) l/min. Wann ist der Bestand am größten, wie groß ist er dann und wie viel ist nach 5 Minuten im Becken?`,
        loesung: String.raw`Bis \(t = 2\) nimmt der Bestand zu: \(12 + 3\cdot 2 = 18\) l. Danach nimmt er ab. Maximum bei \(t = 2\): \(18\) l.<br>
          Nach 5 min: \(18 + (-2)\cdot 3 = 12\) l.` },
      { niveau: 3, aufgabe: String.raw`Die Zuflussrate ist \(r(t) = t^2\) (l/min). Schätze die Zunahme in den ersten 3 Minuten mit Rechtecken der Breite 1 nach unten und nach oben ab.`,
        loesung: String.raw`Unten: \(1\cdot 0 + 1\cdot 1 + 1\cdot 4 = 5\). Oben: \(1\cdot 1 + 1\cdot 4 + 1\cdot 9 = 14\).<br>
          Die Zunahme liegt zwischen \(5\) l und \(14\) l.` },
      { niveau: 3, aufgabe: String.raw`Ein Tank enthält \(60\) l. Es fließen konstant \(5\) l/min ab. Ab \(t = 4\) min fließen zusätzlich \(3\) l/min zu. Zu welchem Zeitpunkt ist der Tank leer?`,
        loesung: String.raw`Bis \(t = 4\): \(60 - 5\cdot 4 = 40\) l. Danach beträgt die Gesamtrate \(-5 + 3 = -2\) l/min, der Tank braucht noch \(40 : 2 = 20\) min.<br>
          Der Tank ist bei \(t = 24\) min leer.` },
    ],
    generator: {
      1: () => {
        const b0 = zuf(10, 60), r = zuf(2, 9), t = zuf(3, 12), B = b0 + r * t;
        return { aufgabe: `\\text{Anfangs } ${b0}\\text{ l. Konstante Zuflussrate } ${r}\\text{ l/min über } ${t}\\text{ min. Bestand danach?}`,
          schritte: [`\\text{Zunahme: } ${r}\\cdot ${t} = ${r * t}\\text{ l}`, `B = ${b0} + ${r * t} = ${B}\\text{ l}`],
          pruef: [[B, b0 + flaecheZahl(() => r, 0, t)]] };
      },
      2: () => {
        const b0 = zuf(5, 40), T = zuf(2, 8), k = zuf(1, 4), zu = k * T * T / 2, B = b0 + zu;
        return { aufgabe: `\\text{Anfangs } ${b0}\\text{ l. Die Rate steigt von } t=0 \\text{ bis } t=${T}\\text{ min gleichmäßig von 0 auf } ${k * T}\\text{ l/min. Bestand bei } t=${T}\\text{?}`,
          schritte: [`\\text{Dreieck: } \\tfrac12\\cdot ${T}\\cdot ${k * T} = ${bruch(k * T * T, 2)}\\text{ l}`, `B = ${b0} + ${bruch(k * T * T, 2)} = ${bruch(2 * b0 + k * T * T, 2)}\\text{ l}`],
          pruef: [[B, b0 + flaecheZahl(t => k * t, 0, T)]] };
      },
      3: () => {
        const p = zuf(2, 6), q = zuf(1, 5), t1 = zuf(2, 5), t2 = zuf(2, 5), b0 = zuf(Math.max(4, q * t2 - p * t1 + 4), q * t2 + 20), B = b0 + p * t1 - q * t2;
        const r = t => t < t1 ? p : -q;
        return { aufgabe: `\\text{Anfangs } ${b0}\\text{ l. } ${t1}\\text{ min lang Zufluss } ${p}\\text{ l/min, dann } ${t2}\\text{ min lang Abfluss } ${q}\\text{ l/min. Bestand am Ende?}`,
          schritte: [`\\text{Zufluss: } ${p}\\cdot ${t1} = ${p * t1}\\text{ l,\\quad Abfluss: } ${q}\\cdot ${t2} = ${q * t2}\\text{ l}`, `B = ${b0} + ${p * t1} - ${q * t2} = ${B}\\text{ l}`],
          pruef: [[B, b0 + flaecheZahl(r, 0, t1) + flaecheZahl(r, t1, t1 + t2)]] };
      },
    },
    test: [
      { frage: String.raw`Die Zuflussrate ist \(4\) l/min, 5 Minuten lang. Um wie viel ändert sich der Bestand?`,
        optionen: [String.raw`\(9\) l`, String.raw`\(20\) l`, String.raw`\(0{,}8\) l`],
        richtig: 1, erklaerung: String.raw`Rate mal Zeit: \(4\cdot 5 = 20\) l (Fläche eines Rechtecks).` },
      { frage: 'Der Graph der Rate verläuft in einem Zeitabschnitt unterhalb der t-Achse. Was bedeutet das für den Bestand?',
        optionen: ['Der Bestand ist negativ.', 'Der Bestand nimmt ab.', 'Der Bestand bleibt gleich.'],
        richtig: 1, erklaerung: 'Eine negative Rate heißt Abnahme. Der Bestand selbst kann dabei trotzdem positiv sein.' },
      { frage: String.raw`Zwischen Graph und \(t\)-Achse liegen 6 Flächeneinheiten oberhalb und 2 unterhalb der Achse. Um wie viel ändert sich der Bestand insgesamt?`,
        optionen: [String.raw`\(8\)`, String.raw`\(4\)`, String.raw`\(-4\)`],
        richtig: 1, erklaerung: String.raw`Oberhalb zählt positiv, unterhalb negativ: \(6 - 2 = 4\).` },
    ],
  },

});
