// Gliederung exakt nach den Inhaltsverzeichnissen:
//   Lambacher Schweizer Kursstufe Basisfach BW (Klett) und Kursstufe Leistungsfach BW (Klett).
// Je Kapitel: Lerneinheiten (u). Check-in, Training, Rückblick, Test und GFS-Themen sind
// Klett-eigene Bausteine und hier bewusst weggelassen – eigene Entsprechungen kommen als Material dazu.
// bereich: nur zur farblichen Gruppierung auf der Website (eigene Einteilung, nicht aus dem Buch).

const KURSE = {
  bf: {
    name: 'Basisfach',
    kapitel: [
      { nr: 'I', titel: 'Grundlagen der Differenzialrechnung', bereich: 'analysis',
        u: ['Ableitung und Tangente', 'Ableitungsregeln und höhere Ableitungen', 'Lineare Verkettung von Funktionen und deren Ableitung', 'Produktregel', 'Monotonie und Krümmung', 'Extrem- und Wendepunkte', 'Differenzialrechnung in Sachsituationen'] },
      { nr: 'II', titel: 'Exponentialfunktionen', bereich: 'analysis',
        u: ['Die natürliche Exponentialfunktion und die Euler’sche Zahl e', 'Exponentialgleichungen und natürlicher Logarithmus', 'Exponentialfunktionen und ihre Graphen', 'Wirkung von Parametern bei Exponentialfunktionen', 'Anwendungen von Exponentialfunktionen'] },
      { nr: 'III', titel: 'Integralrechnung', bereich: 'analysis',
        u: ['Rekonstruieren einer Größe', 'Das Integral als orientierter Flächeninhalt', 'Der Hauptsatz der Differenzial- und Integralrechnung', 'Bestimmen von Stammfunktionen', 'Stammfunktionen und ihre Graphen', 'Integral und Flächeninhalt'] },
      { nr: 'IV', titel: 'Funktionen und ihre Graphen', bereich: 'analysis',
        u: ['Strecken, Verschieben und Spiegeln von Graphen', 'Trigonometrische Funktionen', 'Lösen von Gleichungen', 'Graphen von Funktionen untersuchen', 'Vom Funktionsterm zum Graphen', 'Anwendungen von Graphen und Funktionen'] },
      { nr: 'V', titel: 'Lineare Gleichungssysteme', bereich: 'geometrie',
        u: ['Das Gauß-Verfahren', 'Anzahl der Lösungen linearer Gleichungssysteme', 'Bestimmen ganzrationaler Funktionen'] },
      { nr: 'VI', titel: 'Geraden und Ebenen', bereich: 'geometrie',
        u: ['Vektoren im Raum', 'Geraden im Raum', 'Ebenen im Raum – Parameterform', 'Zueinander orthogonale Vektoren', 'Koordinatengleichung einer Ebene', 'Ebenengleichungen umformen – das Vektorprodukt', 'Ebenen veranschaulichen', 'Gegenseitige Lage von Ebenen und Geraden', 'Gegenseitige Lage von Ebenen'] },
      { nr: 'VII', titel: 'Abstände und Winkel', bereich: 'geometrie',
        u: ['Abstand eines Punktes von einer Ebene', 'Spiegelung und Symmetrie', 'Winkel zwischen Vektoren', 'Schnittwinkel', 'Anwendungen des Vektorprodukts'] },
      { nr: 'VIII', titel: 'Wahrscheinlichkeit und Statistik', bereich: 'stochastik',
        u: ['Pfadregeln und Erwartungswert', 'Bedingte Wahrscheinlichkeit – stochastische Unabhängigkeit', 'Formel von Bernoulli und Binomialverteilung', 'Erwartungswert und Histogramm', 'Problemlösen mit der Binomialverteilung', 'Normalverteilung'] },
    ],
  },
  lk: {
    name: 'Leistungsfach',
    kapitel: [
      { nr: 'I', titel: 'Grundlagen der Differenzialrechnung', bereich: 'analysis',
        u: ['Ableitung und Ableitungsregeln', 'Verkettung von Funktionen', 'Kettenregel', 'Produktregel', 'Monotonie und Krümmung', 'Extrem- und Wendepunkte', 'Tangente und Normale', 'Extremwertprobleme mit Nebenbedingungen'] },
      { nr: 'II', titel: 'Exponential- und Logarithmusfunktionen', bereich: 'analysis',
        u: ['Die natürliche Exponentialfunktion und die Euler’sche Zahl e', 'Exponentialgleichungen und natürlicher Logarithmus', 'Exponentialfunktionen und ihre Graphen', 'Exponentialfunktionen mit Parameter', 'Die Umkehrfunktion', 'Die Logarithmusfunktion und ihre Ableitung', 'Anwendungen von Exponentialfunktionen'] },
      { nr: 'III', titel: 'Integralrechnung', bereich: 'analysis',
        u: ['Rekonstruieren einer Größe', 'Das Integral als orientierter Flächeninhalt', 'Der Hauptsatz der Differenzial- und Integralrechnung', 'Bestimmen von Stammfunktionen', 'Stammfunktionen und ihre Graphen', 'Integral und Flächeninhalt', 'Rotationskörper und ihr Volumen', 'Uneigentliche Integrale', 'Mittelwerte von Funktionen'] },
      { nr: 'IV', titel: 'Funktionen und ihre Graphen', bereich: 'analysis',
        u: ['Strecken, Verschieben und Spiegeln von Graphen', 'Linearfaktordarstellung – mehrfache Nullstellen', 'Lösen von Gleichungen', 'Trigonometrische Funktionen', 'Waagerechte und senkrechte Asymptoten', 'Graph und Funktionsterm', 'Untersuchen von Funktionenscharen', 'Näherungsweises Berechnen von Nullstellen'] },
      { nr: 'V', titel: 'Lineare Gleichungssysteme', bereich: 'geometrie',
        u: ['Das Gauß-Verfahren', 'Lösungsmengen linearer Gleichungssysteme', 'Lineare Gleichungssysteme mit Parametern auf der rechten Seite', 'Bestimmen ganzrationaler Funktionen'] },
      { nr: 'VI', titel: 'Geraden und Ebenen', bereich: 'geometrie',
        u: ['Vektoren im Raum', 'Geraden im Raum', 'Ebenen im Raum – Parameterform', 'Zueinander orthogonale Vektoren – Skalarprodukt', 'Normalen- und Koordinatenform einer Ebene', 'Ebenengleichungen umformen – das Vektorprodukt', 'Ebenen veranschaulichen', 'Gegenseitige Lage von Ebenen und Geraden', 'Gegenseitige Lage von Ebenen'] },
      { nr: 'VII', titel: 'Abstände und Winkel', bereich: 'geometrie',
        u: ['Abstand eines Punktes von einer Ebene – HNF', 'Abstand eines Punktes von einer Geraden', 'Abstand zueinander windschiefer Geraden', 'Spiegelung und Symmetrie', 'Winkel zwischen Vektoren', 'Schnittwinkel', 'Anwendungen des Vektorprodukts', 'Modellieren von geradlinigen Bewegungen', 'Vektorielle Beweise'] },
      { nr: 'VIII', titel: 'Grundlagen der Wahrscheinlichkeitsrechnung', bereich: 'stochastik',
        u: ['Elementare Kombinatorik', 'Pfadregeln und Erwartungswert', 'Bedingte Wahrscheinlichkeit', 'Stochastische Unabhängigkeit', 'Formel von Bernoulli und Binomialverteilung', 'Erwartungswert und Histogramm', 'Problemlösen mit der Binomialverteilung'] },
      { nr: 'IX', titel: 'Testen mit der Binomialverteilung', bereich: 'stochastik',
        u: ['Einseitiger Hypothesentest', 'Fehler beim Testen von Hypothesen', 'Wahl der Nullhypothese', 'Zweiseitiger Hypothesentest'] },
      { nr: 'X', titel: 'Normalverteilung', bereich: 'stochastik',
        u: ['Die Normalverteilung', 'Die Gauß’sche Glockenfunktion', 'Sigma-Regeln', 'Umkehraufgaben zur Normalverteilung', 'Stetige Zufallsgrößen'] },
    ],
  },
};

const BEREICHE = {
  analysis:   { name: 'Analysis',              farbe: '#3b6cf6' },
  geometrie:  { name: 'Analytische Geometrie', farbe: '#11a37f' },
  stochastik: { name: 'Stochastik',            farbe: '#ec7a2c' },
};

// Gleichnamiges Thema im anderen Kurs finden (nur bei exakt gleichem Titel – keine eigene Zuordnung)
function gegenstueck(kurs, titel) {
  const anders = kurs === 'bf' ? 'lk' : 'bf';
  for (const k of KURSE[anders].kapitel) {
    const i = k.u.indexOf(titel);
    if (i >= 0) return { kurs: anders, kap: k.nr, nr: i + 1 };
  }
  return null;
}
