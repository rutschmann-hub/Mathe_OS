// Navigation state
let currentLevel = 'home';
let expandedCard = null;
let navigationHistory = [];

// Topic data structure
const topicData = {
    analysis: {
        title: 'Analysis',
        subtitle: 'Differentialrechnung, Integralrechnung und Kurvendiskussion',
        description: 'Die Analysis bildet das Herzstück der höheren Mathematik. Hier lernst du, wie Funktionen sich verhalten, wie man Flächen berechnet und komplexe mathematische Modelle aufstellt.',
        subtopics: [
            {
                name: 'Grundlagen der Differenzialrechnung',
                description: 'Grenzwerte, Stetigkeit, Differenzierbarkeit und erste Ableitungen',
                icon: 'fas fa-book',
                subtopics: [
                    {
                        name: 'Ableitung und Ableitungsregeln',
                        description: 'Definition der Ableitung und grundlegende Ableitungsregeln',
                        icon: 'fas fa-calculator'
                    },
                    {
                        name: 'Verkettung von Funktionen',
                        description: 'Zusammengesetzte Funktionen und ihre Eigenschaften',
                        icon: 'fas fa-link'
                    },
                    {
                        name: 'Kettenregel',
                        description: 'Ableitung verketteter Funktionen mit der Kettenregel',
                        icon: 'fas fa-chain'
                    },
                    {
                        name: 'Produktregel',
                        description: 'Ableitung von Produkten zweier Funktionen',
                        icon: 'fas fa-times'
                    },
                    {
                        name: 'Monotonie und Krümmung',
                        description: 'Steigungsverhalten und Krümmungsverhalten von Funktionen',
                        icon: 'fas fa-chart-line'
                    },
                    {
                        name: 'Extrem- und Wendepunkte',
                        description: 'Bestimmung lokaler Maxima, Minima und Wendepunkte',
                        icon: 'fas fa-mountain'
                    },
                    {
                        name: 'Tangente und Normale',
                        description: 'Tangenten- und Normalengleichungen an Kurven',
                        icon: 'fas fa-drafting-compass'
                    },
                    {
                        name: 'Extremwertprobleme mit Nebenbedingung',
                        description: 'Optimierungsaufgaben unter gegebenen Bedingungen',
                        icon: 'fas fa-bullseye'
                    }
                ]
            },
            {
                name: 'Exponential- und Logarithmusfunktionen',
                description: 'e-Funktionen, natürlicher Logarithmus und ihre Anwendungen',
                icon: 'fas fa-chart-line',
                subtopics: [
                    {
                        name: 'Die natürliche Exponentialfunktion & Zahl e',
                        description: 'Grundlagen der e-Funktion und die Eulersche Zahl',
                        icon: 'fas fa-superscript'
                    },
                    {
                        name: 'Exponentialgleichungen & natürlicher Logarithmus',
                        description: 'Lösen von Exponentialgleichungen mit dem natürlichen Logarithmus',
                        icon: 'fas fa-equals'
                    },
                    {
                        name: 'Exponentialfunktionen & ihre Graphen',
                        description: 'Graphische Darstellung und Eigenschaften von e-Funktionen',
                        icon: 'fas fa-chart-area'
                    },
                    {
                        name: 'Exponentialfunktionen mit Parametern',
                        description: 'Parametervariation und ihre Auswirkungen auf den Graphen',
                        icon: 'fas fa-sliders-h'
                    },
                    {
                        name: 'Die Umkehrfunktion',
                        description: 'Zusammenhang zwischen Exponential- und Logarithmusfunktion',
                        icon: 'fas fa-exchange-alt'
                    },
                    {
                        name: 'Logarithmusfunktion & Ableitung',
                        description: 'Eigenschaften der Logarithmusfunktion und ihre Ableitung',
                        icon: 'fas fa-function'
                    },
                    {
                        name: 'Anwendungen von Exponentialfunktionen',
                        description: 'Praktische Anwendungen in Wachstums- und Zerfallsprozessen',
                        icon: 'fas fa-seedling'
                    }
                ]
            },
            {
                name: 'Integralrechnung',
                description: 'Stammfunktionen, bestimmte Integrale und Flächenberechnungen',
                icon: 'fas fa-area-chart',
                subtopics: [
                    {
                        name: 'Rekonstruktion einer Größe',
                        description: 'Aufbau von Größen aus ihren Änderungsraten',
                        icon: 'fas fa-puzzle-piece'
                    },
                    {
                        name: 'Integral als Flächeninhalt',
                        description: 'Geometrische Interpretation des bestimmten Integrals',
                        icon: 'fas fa-square'
                    },
                    {
                        name: 'Hauptsatz',
                        description: 'Hauptsatz der Differential- und Integralrechnung',
                        icon: 'fas fa-key'
                    },
                    {
                        name: 'Stammfunktionen',
                        description: 'Bestimmung von Stammfunktionen und Integrationsregeln',
                        icon: 'fas fa-function'
                    },
                    {
                        name: 'Graphen von Stammfunktionen',
                        description: 'Grafische Beziehung zwischen Funktionen und Stammfunktionen',
                        icon: 'fas fa-chart-line'
                    },
                    {
                        name: 'Integral und Flächeninhalt',
                        description: 'Berechnung von Flächeninhalten mit bestimmten Integralen',
                        icon: 'fas fa-vector-square'
                    },
                    {
                        name: 'Rotationskörper',
                        description: 'Volumenberechnung von Rotationskörpern',
                        icon: 'fas fa-globe'
                    }
                ]
            },
            {
                name: 'Funktionen und ihre Graphen',
                description: 'Kurvendiskussion, Extremwerte und vollständige Funktionsuntersuchung',
                icon: 'fas fa-project-diagram',
                subtopics: [
                    {
                        name: 'Strecken, Verschieben, Spiegeln',
                        description: 'Transformationen von Funktionsgraphen',
                        icon: 'fas fa-arrows-alt'
                    },
                    {
                        name: 'Linearfaktorzerlegung',
                        description: 'Zerlegung von Polynomen in Linearfaktoren',
                        icon: 'fas fa-cut'
                    },
                    {
                        name: 'Gleichungen lösen',
                        description: 'Algebraische und graphische Lösungsverfahren',
                        icon: 'fas fa-equals'
                    },
                    {
                        name: 'Trigonometrische Funktionen',
                        description: 'Sinus-, Kosinus- und Tangensfunktion und ihre Eigenschaften',
                        icon: 'fas fa-wave-square'
                    },
                    {
                        name: 'Asymptoten',
                        description: 'Senkrechte, waagerechte und schiefe Asymptoten',
                        icon: 'fas fa-long-arrow-alt-right'
                    },
                    {
                        name: 'Funktionsterm und Graph',
                        description: 'Zusammenhang zwischen algebraischer und grafischer Darstellung',
                        icon: 'fas fa-chart-area'
                    },
                    {
                        name: 'Funktionenscharen',
                        description: 'Parameterabhängige Funktionen und ihre Eigenschaften',
                        icon: 'fas fa-layer-group'
                    },
                    {
                        name: 'Näherungsverfahren',
                        description: 'Numerische Verfahren zur Nullstellenbestimmung',
                        icon: 'fas fa-crosshairs'
                    }
                ]
            }
        ]
    },
    stochastik: {
        title: 'Stochastik',
        subtitle: 'Wahrscheinlichkeitsrechnung und Statistik',
        description: 'Die Stochastik hilft uns dabei, Unsicherheit und Zufall mathematisch zu beschreiben. Von einfachen Wahrscheinlichkeiten bis hin zu komplexen statistischen Tests.',
        subtopics: [
            {
                name: 'Grundlagen der Wahrscheinlichkeitsrechnung',
                description: 'Wahrscheinlichkeitsbegriff, Axiome und kombinatorische Grundlagen',
                icon: 'fas fa-dice',
                subtopics: [
                    {
                        name: 'Kombinatorik',
                        description: 'Abzählverfahren und kombinatorische Grundlagen',
                        icon: 'fas fa-sort-numeric-up'
                    },
                    {
                        name: 'Pfadregeln & Erwartungswert',
                        description: 'Baumdiagramme und Berechnung von Erwartungswerten',
                        icon: 'fas fa-sitemap'
                    },
                    {
                        name: 'Bedingte Wahrscheinlichkeit',
                        description: 'Wahrscheinlichkeiten unter gegebenen Bedingungen',
                        icon: 'fas fa-filter'
                    },
                    {
                        name: 'Stochastische Unabhängigkeit',
                        description: 'Unabhängige Ereignisse und ihre Eigenschaften',
                        icon: 'fas fa-unlink'
                    },
                    {
                        name: 'Bernoulli & Binomialverteilung',
                        description: 'Bernoulli-Experimente und Binomialverteilung',
                        icon: 'fas fa-coins'
                    },
                    {
                        name: 'Histogramm & Erwartungswert',
                        description: 'Graphische Darstellung und statistische Kennwerte',
                        icon: 'fas fa-chart-bar'
                    },
                    {
                        name: 'Probleme bearbeiten',
                        description: 'Anwendung der Wahrscheinlichkeitsrechnung auf komplexe Probleme',
                        icon: 'fas fa-puzzle-piece'
                    }
                ]
            },
            {
                name: 'Testen mit der Binomialverteilung',
                description: 'Binomialverteilung und ihre Anwendung in Signifikanztests',
                icon: 'fas fa-chart-bar',
                subtopics: [
                    {
                        name: 'Einseitiger Hypothesentest',
                        description: 'Tests mit einer gerichteten Alternativhypothese',
                        icon: 'fas fa-arrow-right'
                    },
                    {
                        name: 'Fehlerquellen beim Testen',
                        description: 'Alpha- und Beta-Fehler in der statistischen Testtheorie',
                        icon: 'fas fa-exclamation-triangle'
                    },
                    {
                        name: 'Nullhypothese',
                        description: 'Formulierung und Überprüfung von Nullhypothesen',
                        icon: 'fas fa-balance-scale'
                    },
                    {
                        name: 'Zweiseitiger Hypothesentest',
                        description: 'Tests mit ungerichteten Alternativhypothesen',
                        icon: 'fas fa-arrows-alt-h'
                    }
                ]
            },
            {
                name: 'Normalverteilung',
                description: 'Eigenschaften und Anwendungen der Normalverteilung',
                icon: 'fas fa-chart-line',
                subtopics: [
                    {
                        name: 'Die Normalverteilung',
                        description: 'Grundlagen und Eigenschaften der Normalverteilung',
                        icon: 'fas fa-chart-area'
                    },
                    {
                        name: 'Die Gauß\'sche Glocke',
                        description: 'Form und Parameter der Glockenkurve',
                        icon: 'fas fa-bell'
                    },
                    {
                        name: 'Sigma-Regeln',
                        description: 'Ein-, Zwei- und Drei-Sigma-Regeln für Wahrscheinlichkeiten',
                        icon: 'fas fa-ruler-horizontal'
                    },
                    {
                        name: 'Umkehraufgaben zur Normalverteilung',
                        description: 'Bestimmung von Parametern bei gegebenen Wahrscheinlichkeiten',
                        icon: 'fas fa-undo'
                    },
                    {
                        name: 'Stetige Zufallsgrößen',
                        description: 'Eigenschaften stetiger Verteilungen und Dichte',
                        icon: 'fas fa-wave-square'
                    }
                ]
            }
        ]
    },
    geometrie: {
        title: 'Analytische Geometrie',
        subtitle: 'Vektoren, Geraden und Ebenen im Raum',
        description: 'Die analytische Geometrie verbindet Geometrie mit Algebra. Mit Vektoren beschreiben wir Objekte im Raum und lösen geometrische Probleme rechnerisch.',
        subtopics: [
            {
                name: 'Lineare Gleichungssysteme (LGS)',
                description: 'Lösung linearer Gleichungssysteme und Anwendungen',
                icon: 'fas fa-calculator',
                subtopics: [
                    {
                        name: 'Gauß-Verfahren',
                        description: 'Systematisches Lösen von LGS durch Eliminationsverfahren',
                        icon: 'fas fa-list-ol'
                    },
                    {
                        name: 'Lösungsmenge',
                        description: 'Eindeutige, unendlich viele oder keine Lösungen',
                        icon: 'fas fa-check-circle'
                    },
                    {
                        name: 'LGS mit Parametern rechts',
                        description: 'Gleichungssysteme mit Parametern auf der rechten Seite',
                        icon: 'fas fa-equals'
                    }
                ]
            },
            {
                name: 'Geraden und Ebenen',
                description: 'Parameterformen und Schnittberechnungen im Raum',
                icon: 'fas fa-cube',
                subtopics: [
                    {
                        name: 'Vektoren im Raum',
                        description: 'Grundlagen der Vektorrechnung im dreidimensionalen Raum',
                        icon: 'fas fa-arrows-alt'
                    },
                    {
                        name: 'Geraden',
                        description: 'Parameterform von Geraden und ihre Eigenschaften',
                        icon: 'fas fa-minus'
                    },
                    {
                        name: 'Ebenen - Parameterform',
                        description: 'Darstellung von Ebenen durch Parametergleichungen',
                        icon: 'fas fa-square'
                    },
                    {
                        name: 'Skalarprodukt / Orthogonalität',
                        description: 'Berechnung des Skalarprodukts und orthogonale Vektoren',
                        icon: 'fas fa-times'
                    },
                    {
                        name: 'Normalenform / Koordinatenform',
                        description: 'Alternative Darstellungen von Ebenen',
                        icon: 'fas fa-compass'
                    },
                    {
                        name: 'Ebenengleichungen umformen',
                        description: 'Umrechnung zwischen verschiedenen Ebenenformen',
                        icon: 'fas fa-exchange-alt'
                    },
                    {
                        name: 'Ebenen visualisieren',
                        description: 'Grafische Darstellung und Interpretation von Ebenen',
                        icon: 'fas fa-eye'
                    },
                    {
                        name: 'Lage: Ebene-Gerade',
                        description: 'Lagebeziehungen zwischen Ebenen und Geraden',
                        icon: 'fas fa-project-diagram'
                    },
                    {
                        name: 'Lage: Ebene-Ebene',
                        description: 'Lagebeziehungen zwischen zwei Ebenen',
                        icon: 'fas fa-layer-group'
                    }
                ]
            },
            {
                name: 'Abstände und Winkel',
                description: 'Metrische Eigenschaften und Berechnungen im Raum',
                icon: 'fas fa-ruler',
                subtopics: [
                    {
                        name: 'Abstand Punkt - Ebene',
                        description: 'Berechnung des kürzesten Abstands zwischen Punkt und Ebene',
                        icon: 'fas fa-bullseye'
                    },
                    {
                        name: 'Abstand Punkt - Gerade',
                        description: 'Abstandsberechnung zwischen einem Punkt und einer Geraden',
                        icon: 'fas fa-crosshairs'
                    },
                    {
                        name: 'Abstand windschiefer Geraden',
                        description: 'Abstand zwischen sich nicht schneidenden Geraden im Raum',
                        icon: 'fas fa-expand-arrows-alt'
                    },
                    {
                        name: 'Spiegelung & Symmetrie',
                        description: 'Spiegelungen an Ebenen und Symmetrieeigenschaften',
                        icon: 'fas fa-reflect'
                    },
                    {
                        name: 'Winkel zwischen Vektoren',
                        description: 'Berechnung von Winkeln mit dem Skalarprodukt',
                        icon: 'fas fa-angle-up'
                    },
                    {
                        name: 'Schnittwinkel',
                        description: 'Winkel zwischen Geraden und Ebenen',
                        icon: 'fas fa-intersection'
                    },
                    {
                        name: 'Anwendungen Vektorprodukt',
                        description: 'Kreuzprodukt und seine geometrischen Anwendungen',
                        icon: 'fas fa-star'
                    },
                    {
                        name: 'Gerade Bewegungen modellieren',
                        description: 'Praktische Anwendungen in der Bewegungsmodellierung',
                        icon: 'fas fa-route'
                    }
                ]
            }
        ]
    }
};

function updateSidebars(level, topic = null, subtopic = null) {
    updateFormulaCheatsheet(level, topic, subtopic);
}

function updateFormulaCheatsheet(level, topic, subtopic) {
    const cheatsheetContainer = document.querySelector('.formula-cheatsheet');
    if (!cheatsheetContainer) return;

    let cheatsheetHTML = '<h3>Wichtige Formeln</h3>';

    // Hilfsfunktion: Hint-Box für Ebenen 1–3
    function sidebarHint(iconClass, title, hints) {
        return `
            <div class="sidebar-info-header">
                <i class="fas ${iconClass}"></i>
                <span>${title}</span>
            </div>
            <p class="sidebar-info-hint">Öffne eine Unterseite,<br>um die Formeln zu sehen.</p>
            <div class="sidebar-divider"></div>
            <p class="sidebar-info-label">Wichtige Konzepte</p>
            ${hints.map(h => `<div class="sidebar-hint-item"><i class="fas ${h.icon}"></i><span>${h.text}</span></div>`).join('')}
        `;
    }

    if (topic === 'ableitungsregeln') {
        cheatsheetHTML += `
            <div class="important-note">
                <h4><i class="fas fa-calculator"></i> Ableitungsregeln</h4>
                <p>Alle Regeln zur Differentiation auf einen Blick</p>
            </div>

            <div class="formula-item">
                <div class="formula-title">Potenzregel</div>
                <div class="formula-content">\\(\\left(x^n\\right)' = n \\cdot x^{n-1}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Faktorregel</div>
                <div class="formula-content">\\((c \\cdot f)' = c \\cdot f'\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Summenregel</div>
                <div class="formula-content">\\((f + g)' = f' + g'\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Produktregel</div>
                <div class="formula-content">\\((u \\cdot v)' = u'v + uv'\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Quotientenregel</div>
                <div class="formula-content">\\(f(x)=\\dfrac{u(x)}{v(x)},\\quad f'(x) = \\dfrac{u'(x)\\cdot v(x) - u(x)\\cdot v'(x)}{[v(x)]^2}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Kettenregel</div>
                <div class="formula-content">\\((f(g(x)))' = f'(g(x)) \\cdot g'(x)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">\\(e^x\\) und \\(\\ln(x)\\)</div>
                <div class="formula-content">\\((e^x)' = e^x\\)<br>\\((\\ln x)' = \\tfrac{1}{x}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">\\(\\sin\\) und \\(\\cos\\)</div>
                <div class="formula-content">\\((\\sin x)' = \\cos x\\)<br>\\((\\cos x)' = -\\sin x\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Differenzenquotient</div>
                <div class="formula-content">\\(\\dfrac{f(a+h)-f(a)}{h}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Ableitung (Grenzwert)</div>
                <div class="formula-content">\\(f'(a) = \\lim_{h \\to 0} \\dfrac{f(a+h)-f(a)}{h}\\)</div>
            </div>
        `;
    } else if (topic === 'analysis' && level !== 'detail') {
        cheatsheetHTML += sidebarHint('fa-chart-line', 'Analysis', [
            { icon: 'fa-chart-line', text: 'Ableitungen beschreiben Steigungen' },
            { icon: 'fa-infinity',   text: 'Integrale berechnen Flächeninhalte' },
            { icon: 'fa-mountain',   text: 'Extrema → f\'(x) = 0 prüfen' },
            { icon: 'fa-seedling',   text: 'e-Funktion: f\'(x) = f(x)' },
        ]);
    } else if (topic === 'analysis_formeln') {
        cheatsheetHTML += `
            <div class="important-note">
                <h4><i class="fas fa-function"></i> Analysis</h4>
                <p>Alle wichtigen Formeln zur Differential- und Integralrechnung (BW Kursstufe)</p>
            </div>

            <div class="formula-item">
                <div class="formula-title">Differenzenquotient</div>
                <div class="formula-content">\\(\\dfrac{\\Delta f}{\\Delta x} = \\dfrac{f(x_0+h)-f(x_0)}{h}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Ableitung (Grenzwert)</div>
                <div class="formula-content">\\(f'(x_0) = \\lim_{h \\to 0} \\dfrac{f(x_0+h)-f(x_0)}{h}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Potenzregel</div>
                <div class="formula-content">\\(f(x)=x^n \\Rightarrow f'(x)=n\\cdot x^{n-1}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Faktorregel</div>
                <div class="formula-content">\\((c\\cdot f)' = c\\cdot f'\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Summenregel</div>
                <div class="formula-content">\\((f+g)' = f'+g'\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Produktregel</div>
                <div class="formula-content">\\((u\\cdot v)' = u'\\cdot v + u\\cdot v'\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Quotientenregel</div>
                <div class="formula-content">\\(f(x)=\\dfrac{u(x)}{v(x)},\\quad f'(x) = \\dfrac{u'(x)\\cdot v(x) - u(x)\\cdot v'(x)}{[v(x)]^2}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Kettenregel</div>
                <div class="formula-content">\\((f(g(x)))' = f'(g(x))\\cdot g'(x)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Tangentengleichung</div>
                <div class="formula-content">\\(t(x) = f'(x_0)\\cdot(x-x_0)+f(x_0)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Normalengleichung</div>
                <div class="formula-content">\\(n(x) = -\\dfrac{1}{f'(x_0)}\\cdot(x-x_0)+f(x_0)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Notwendige Bed. Extremum</div>
                <div class="formula-content">\\(f'(x_0)=0\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Hinreichende Bed. Extremum</div>
                <div class="formula-content">\\(f'(x_0)=0\\) und \\(f''(x_0)\\neq 0\\):<br>
                    \\(f''(x_0)>0\\Rightarrow\\) Minimum<br>
                    \\(f''(x_0)<0\\Rightarrow\\) Maximum</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Wendepunkt</div>
                <div class="formula-content">\\(f''(x_0)=0\\) und \\(f'''(x_0)\\neq 0\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Monotonie</div>
                <div class="formula-content">\\(f'(x)>0\\Rightarrow\\) streng monoton steigend<br>
                    \\(f'(x)<0\\Rightarrow\\) streng monoton fallend</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Krümmung</div>
                <div class="formula-content">\\(f''(x)>0\\Rightarrow\\) linksgekrümmt<br>
                    \\(f''(x)<0\\Rightarrow\\) rechtsgekrümmt</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Nat. Exponentialfunktion</div>
                <div class="formula-content">\\(f(x)=e^x \\Rightarrow f'(x)=e^x\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Allg. Exponentialfunktion</div>
                <div class="formula-content">\\(f(x)=a^x \\Rightarrow f'(x)=a^x\\cdot\\ln(a)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Nat. Logarithmus</div>
                <div class="formula-content">\\(f(x)=\\ln(x) \\Rightarrow f'(x)=\\dfrac{1}{x}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Logarithmusgesetze</div>
                <div class="formula-content">\\(\\ln(a\\cdot b)=\\ln a+\\ln b\\)<br>
                    \\(\\ln\\left(\\dfrac{a}{b}\\right)=\\ln a-\\ln b\\)<br>
                    \\(\\ln(a^n)=n\\cdot\\ln a\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Umkehrfunktion e / ln</div>
                <div class="formula-content">\\(e^{\\ln(x)}=x\\quad\\text{und}\\quad\\ln(e^x)=x\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Stammfunktion (Potenz)</div>
                <div class="formula-content">\\(\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C\\quad(n\\neq -1)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Stammfunktion (e-Funkt.)</div>
                <div class="formula-content">\\(\\int e^x\\,dx = e^x+C\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Stammfunktion (1/x)</div>
                <div class="formula-content">\\(\\int \\dfrac{1}{x}\\,dx = \\ln|x|+C\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Hauptsatz der Integralrechnung</div>
                <div class="formula-content">\\(\\int_a^b f(x)\\,dx = F(b)-F(a)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Linearität des Integrals</div>
                <div class="formula-content">\\(\\int_a^b c\\cdot f(x)\\,dx = c\\cdot\\int_a^b f(x)\\,dx\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Additivität des Integrals</div>
                <div class="formula-content">\\(\\int_a^c f\\,dx = \\int_a^b f\\,dx + \\int_b^c f\\,dx\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Flächeninhalt (x-Achse)</div>
                <div class="formula-content">\\(A = \\int_a^b |f(x)|\\,dx\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Fläche zwischen zwei Kurven</div>
                <div class="formula-content">\\(A = \\int_a^b |f(x)-g(x)|\\,dx\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Rotationsvolumen (x-Achse)</div>
                <div class="formula-content">\\(V = \\pi\\cdot\\int_a^b [f(x)]^2\\,dx\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Mittelwert einer Funktion</div>
                <div class="formula-content">\\(\\bar{f} = \\dfrac{1}{b-a}\\int_a^b f(x)\\,dx\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Sinus &amp; Kosinus (Ableitung)</div>
                <div class="formula-content">\\(\\sin'(x)=\\cos(x)\\quad\\cos'(x)=-\\sin(x)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Pythagoreischer Lehrsatz</div>
                <div class="formula-content">\\(\\sin^2(x)+\\cos^2(x)=1\\)</div>
            </div>
        `;
    } else if (topic === 'geometrie' && level !== 'detail') {
        cheatsheetHTML += sidebarHint('fa-cube', 'Analytische Geometrie', [
            { icon: 'fa-arrows-alt',  text: 'Vektoren beschreiben Richtungen im Raum' },
            { icon: 'fa-dot-circle',  text: 'Skalarprodukt = 0 → orthogonal' },
            { icon: 'fa-layer-group', text: '3 Ebenenformen: Parameter, Normal, Koordinaten' },
            { icon: 'fa-ruler',       text: 'Abstand via Hessescher Normalform' },
        ]);
    } else if (topic === 'geometrie_formeln') {
        cheatsheetHTML += `
            <div class="important-note">
                <h4><i class="fas fa-cube"></i> Analytische Geometrie</h4>
                <p>Alle wichtigen Formeln für Vektoren, Geraden und Ebenen (BW Kursstufe)</p>
            </div>

            <div class="formula-item">
                <div class="formula-title">Vektor zwischen zwei Punkten</div>
                <div class="formula-content">\\(\\vec{AB} = B - A = \\begin{pmatrix}b_1-a_1\\\\b_2-a_2\\\\b_3-a_3\\end{pmatrix}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Betrag eines Vektors</div>
                <div class="formula-content">\\(|\\vec{a}| = \\sqrt{a_1^2+a_2^2+a_3^2}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Einheitsvektor</div>
                <div class="formula-content">\\(\\vec{e}_a = \\dfrac{\\vec{a}}{|\\vec{a}|}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Skalarprodukt</div>
                <div class="formula-content">\\(\\vec{a}\\cdot\\vec{b} = a_1 b_1+a_2 b_2+a_3 b_3\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Skalarprodukt (geometrisch)</div>
                <div class="formula-content">\\(\\vec{a}\\cdot\\vec{b} = |\\vec{a}|\\cdot|\\vec{b}|\\cdot\\cos\\alpha\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Winkel zwischen Vektoren</div>
                <div class="formula-content">\\(\\cos\\alpha = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|\\cdot|\\vec{b}|}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Orthogonalität</div>
                <div class="formula-content">\\(\\vec{a}\\perp\\vec{b} \\Leftrightarrow \\vec{a}\\cdot\\vec{b}=0\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Kreuzprodukt (Normalenvektor)</div>
                <div class="formula-content">\\(\\vec{a}\\times\\vec{b} = \\begin{pmatrix}a_2 b_3-a_3 b_2\\\\a_3 b_1-a_1 b_3\\\\a_1 b_2-a_2 b_1\\end{pmatrix}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Geradengleichung (Parameterform)</div>
                <div class="formula-content">\\(g\\colon\\vec{x} = \\vec{p}+t\\cdot\\vec{u}\\quad t\\in\\mathbb{R}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Ebene (Parameterform)</div>
                <div class="formula-content">\\(E\\colon\\vec{x} = \\vec{p}+s\\cdot\\vec{u}+t\\cdot\\vec{v}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Ebene (Normalenform)</div>
                <div class="formula-content">\\(E\\colon\\vec{n}\\cdot(\\vec{x}-\\vec{p})=0\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Ebene (Koordinatenform)</div>
                <div class="formula-content">\\(E\\colon ax_1+bx_2+cx_3=d\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Hessesche Normalform</div>
                <div class="formula-content">\\(E\\colon\\vec{n}_0\\cdot\\vec{x}=d_0\\quad\\text{mit }\\vec{n}_0=\\dfrac{\\vec{n}}{|\\vec{n}|}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Abstand Punkt–Ebene (HNF)</div>
                <div class="formula-content">\\(d(P,E) = |\\vec{n}_0\\cdot\\vec{p}-d_0|\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Abstand Punkt–Ebene (Koordinatenform)</div>
                <div class="formula-content">\\(d = \\dfrac{|ax_0+by_0+cz_0-d|}{\\sqrt{a^2+b^2+c^2}}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Abstand Punkt–Gerade</div>
                <div class="formula-content">\\(d(P,g) = \\dfrac{|\\vec{AP}\\times\\vec{u}|}{|\\vec{u}|}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Abstand windschiefer Geraden</div>
                <div class="formula-content">\\(d = \\dfrac{|\\vec{AB}\\cdot(\\vec{u}\\times\\vec{v})|}{|\\vec{u}\\times\\vec{v}|}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Schnittwinkel Gerade–Ebene</div>
                <div class="formula-content">\\(\\sin\\varphi = \\dfrac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\cdot|\\vec{n}|}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Schnittwinkel Ebene–Ebene</div>
                <div class="formula-content">\\(\\cos\\varphi = \\dfrac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}|\\cdot|\\vec{n_2}|}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Spurpunkte einer Ebene</div>
                <div class="formula-content">Jeweils zwei Koordinaten \\(=0\\) setzen und lösen.</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Gaußsches Eliminationsverfahren</div>
                <div class="formula-content">LGS auf Stufenform bringen durch<br>Addition/Subtraktion der Gleichungen.</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Spiegelung Punkt an Ebene</div>
                <div class="formula-content">\\(P' = P + 2d\\cdot\\vec{n}_0\\)<br>\\(d = d(P,E)\\) mit Vorzeichen (HNF)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Fläche eines Dreiecks</div>
                <div class="formula-content">\\(A = \\dfrac{1}{2}\\,|\\vec{AB}\\times\\vec{AC}|\\)</div>
            </div>
        `;
    } else if (topic === 'stochastik' && level !== 'detail') {
        cheatsheetHTML += sidebarHint('fa-dice', 'Stochastik', [
            { icon: 'fa-coins',         text: 'Bernoulli: nur Treffer oder kein Treffer' },
            { icon: 'fa-chart-bar',     text: 'Binomial: n unabh. Bernoulli-Experimente' },
            { icon: 'fa-bell',          text: 'Normalverteilung: symmetrisch um μ' },
            { icon: 'fa-balance-scale', text: 'Hypothesentest: H₀ annehmen oder ablehnen' },
        ]);
    } else if (topic === 'stochastik_formeln') {
        cheatsheetHTML += `
            <div class="important-note">
                <h4><i class="fas fa-dice"></i> Stochastik</h4>
                <p>Alle wichtigen Formeln zur Wahrscheinlichkeit &amp; Statistik (BW Kursstufe)</p>
            </div>

            <div class="formula-item">
                <div class="formula-title">Klassische Wahrscheinlichkeit</div>
                <div class="formula-content">\\(P(A) = \\dfrac{\\text{günstige Ergebnisse}}{\\text{mögliche Ergebnisse}}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Gegenwahrscheinlichkeit</div>
                <div class="formula-content">\\(P(\\bar{A}) = 1 - P(A)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Additionssatz</div>
                <div class="formula-content">\\(P(A\\cup B) = P(A)+P(B)-P(A\\cap B)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Bedingte Wahrscheinlichkeit</div>
                <div class="formula-content">\\(P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Multiplikationssatz</div>
                <div class="formula-content">\\(P(A\\cap B) = P(A)\\cdot P(B\\mid A)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Stochastische Unabhängigkeit</div>
                <div class="formula-content">\\(P(A\\cap B) = P(A)\\cdot P(B)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Satz der totalen Wahrscheinlichkeit</div>
                <div class="formula-content">\\(P(B) = \\sum_{i} P(B\\mid A_i)\\cdot P(A_i)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Satz von Bayes</div>
                <div class="formula-content">\\(P(A_i\\mid B) = \\dfrac{P(B\\mid A_i)\\cdot P(A_i)}{P(B)}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Permutationen</div>
                <div class="formula-content">\\(n!\\) (Anordnungen von \\(n\\) Elementen)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Kombinationen (ohne Whg., ohne Reihenf.)</div>
                <div class="formula-content">\\(\\binom{n}{k} = \\dfrac{n!}{k!\\cdot(n-k)!}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Bernoulli-Experiment</div>
                <div class="formula-content">\\(n\\) unabhängige Versuche, je Treffer mit \\(P=p\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Binomialverteilung \\(X\\sim B(n,p)\\)</div>
                <div class="formula-content">\\(P(X=k) = \\binom{n}{k}\\cdot p^k\\cdot(1-p)^{n-k}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Kumulierte Binomialwskt.</div>
                <div class="formula-content">\\(P(X\\leq k) = \\sum_{i=0}^{k}\\binom{n}{i}p^i(1-p)^{n-i}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Erwartungswert (Binomial)</div>
                <div class="formula-content">\\(E(X) = \\mu = n\\cdot p\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Varianz (Binomial)</div>
                <div class="formula-content">\\(\\text{Var}(X) = \\sigma^2 = n\\cdot p\\cdot(1-p)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Standardabweichung (Binomial)</div>
                <div class="formula-content">\\(\\sigma = \\sqrt{n\\cdot p\\cdot(1-p)}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Normalverteilung \\(X\\sim N(\\mu,\\sigma^2)\\)</div>
                <div class="formula-content">\\(\\varphi(x) = \\dfrac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Standardnormalverteilung</div>
                <div class="formula-content">\\(Z = \\dfrac{X-\\mu}{\\sigma}\\sim N(0,1)\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">\\(\\sigma\\)-Regeln (Normalverteilung)</div>
                <div class="formula-content">\\(P(\\mu-\\sigma\\leq X\\leq\\mu+\\sigma)\\approx 68{,}3\\%\\)<br>
                    \\(P(\\mu-2\\sigma\\leq X\\leq\\mu+2\\sigma)\\approx 95{,}4\\%\\)<br>
                    \\(P(\\mu-3\\sigma\\leq X\\leq\\mu+3\\sigma)\\approx 99{,}7\\%\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Lokaler Grenzwertsatz (Faustregel)</div>
                <div class="formula-content">Normalverteilung als Näherung für \\(B(n,p)\\) wenn \\(n\\cdot p\\cdot(1-p)\\geq 9\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Hypothesentest – Nullhypothese</div>
                <div class="formula-content">\\(H_0\\colon p = p_0\\qquad H_1\\colon p\\neq p_0\\) (oder \\(<, >\\))</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Signifikanzniveau</div>
                <div class="formula-content">\\(\\alpha\\) (meist \\(5\\%\\) oder \\(1\\%\\)) — maximale Irrtumswahrscheinlichkeit</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Ablehnungsbereich (einseitig rechts)</div>
                <div class="formula-content">\\(K = \\{k\\in\\mathbb{N}_0 : P(X\\geq k)\\leq\\alpha\\}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Ablehnungsbereich (einseitig links)</div>
                <div class="formula-content">\\(K = \\{k\\in\\mathbb{N}_0 : P(X\\leq k)\\leq\\alpha\\}\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Fehler 1. Art (\\(\\alpha\\)-Fehler)</div>
                <div class="formula-content">\\(H_0\\) wird abgelehnt, obwohl sie wahr ist.<br>\\(P(\\text{Fehler 1. Art})\\leq\\alpha\\)</div>
            </div>

            <div class="formula-item">
                <div class="formula-title">Fehler 2. Art (\\(\\beta\\)-Fehler)</div>
                <div class="formula-content">\\(H_0\\) wird angenommen, obwohl sie falsch ist.</div>
            </div>
        `;
    } else {
        // Startseite
        cheatsheetHTML += `
            <div class="sidebar-info-header">
                <i class="fas fa-book-open"></i>
                <span>Lernbereich</span>
            </div>
            <p class="sidebar-info-hint">Wähle ein Thema aus,<br>um loszulegen.</p>
            <div class="sidebar-divider"></div>
            <p class="sidebar-info-label">Themengebiete</p>
            <div class="sidebar-hint-item"><i class="fas fa-chart-line"></i><span>Analysis</span></div>
            <div class="sidebar-hint-item"><i class="fas fa-cube"></i><span>Analytische Geometrie</span></div>
            <div class="sidebar-hint-item"><i class="fas fa-dice"></i><span>Stochastik</span></div>
            <div class="sidebar-divider"></div>
            <p class="sidebar-info-label">Tipp</p>
            <div class="sidebar-hint-item"><i class="fas fa-mouse-pointer"></i><span>Klicke eine Kachel an, um Inhalte zu öffnen</span></div>
            <div class="sidebar-hint-item"><i class="fas fa-graduation-cap"></i><span>Formeln erscheinen auf den Unterseiten</span></div>
        `;
    }

    cheatsheetContainer.innerHTML = cheatsheetHTML;

    if (window.MathJax) {
        MathJax.typesetPromise([cheatsheetContainer]);
    }
}
// Navigation functions
function navigateTo(level, topic = null, subtopic = null, detail = null) {
    currentLevel = level;

    // URL-Hash setzen
    if (level === 'home') {
        history.replaceState(null, '', '#');
    } else if (level === 'topic' && topic) {
        history.replaceState(null, '', `#${topic}`);
    } else if (level === 'subtopic' && topic && subtopic) {
        history.replaceState(null, '', `#${topic}/${encodeURIComponent(subtopic)}`);
    } else if (level === 'detail' && topic && subtopic && detail) {
        history.replaceState(null, '', `#${topic}/${encodeURIComponent(subtopic)}/${encodeURIComponent(detail)}`);
    }

    if (level === 'home') {
        updateBreadcrumb([{ name: 'Startseite', level: 'home' }]);
        updateTopicNav(null);
        updateSidebars('home');
        showMainTopics();
    } else if (level === 'topic' && topic) {
        updateBreadcrumb([
            { name: 'Startseite', level: 'home' },
            { name: topicData[topic].title, level: 'topic', topic: topic }
        ]);
        updateTopicNav(topic);
        updateSidebars('topic', topic);
        showTopicDetails(topic);
    } else if (level === 'subtopic' && topic && subtopic) {
        updateBreadcrumb([
            { name: 'Startseite', level: 'home' },
            { name: topicData[topic].title, level: 'topic', topic: topic },
            { name: subtopic, level: 'subtopic', topic: topic, subtopic: subtopic }
        ]);
        updateTopicNav(topic);
        updateSidebars('subtopic_nav', topic, subtopic);
        showSubtopicDetails(topic, subtopic);
    }
}

function restoreFromHash() {
    const hash = decodeURIComponent(window.location.hash.replace('#', ''));
    if (!hash) return;

    const parts = hash.split('/');
    const topic = parts[0];
    const subtopic = parts[1];
    const detail = parts[2];

    if (detail && topic && subtopic) {
        navigateTo('subtopic', topic, subtopic);
        showDetailContent(topic, subtopic, detail);
    } else if (subtopic && topic) {
        navigateTo('subtopic', topic, subtopic);
    } else if (topic && topicData[topic]) {
        navigateTo('topic', topic);
    }
}

function updateTopicNav(activeTopic) {
    const topicNavItems = document.querySelectorAll('.topic-nav-item');
    topicNavItems.forEach(item => {
        item.classList.remove('active');
    });
    
    if (activeTopic) {
        const activeItem = document.querySelector(`.topic-nav-item[onclick*="${activeTopic}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }
}

function updateBreadcrumb(items) {
    const breadcrumb = document.getElementById('breadcrumb');
    breadcrumb.innerHTML = '';
    
    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = `breadcrumb-item ${isLast ? 'current' : ''}`;
        link.onclick = (e) => {
            e.preventDefault();
            if (item.level === 'home') {
                navigateTo('home');
            } else if (item.level === 'topic') {
                navigateTo('topic', item.topic);
            } else if (item.level === 'subtopic') {
                navigateTo('subtopic', item.topic, item.subtopic);
            } else if (item.level === 'detail') {
                showDetailContent(item.topic, item.subtopic, item.detail);
            }
        };
        
        if (item.name === 'Startseite') {
            link.innerHTML = '<i class="fas fa-home"></i> ' + item.name;
        } else {
            link.textContent = item.name;
        }
        
        breadcrumb.appendChild(link);
        
        if (!isLast) {
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = '›';
            breadcrumb.appendChild(separator);
        }
    });
}

function showMainTopics() {
    document.getElementById('page-title').textContent = 'Hauptthemen';
    document.getElementById('page-subtitle').textContent = 'Wähle einen Themenbereich aus, um tiefer in die Mathematik der Oberstufe einzusteigen.';
    
    // Reset expanded content
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');
    expandedCard = null;
    
    // Show main topic cards
    const topicsGrid = document.getElementById('topics-grid');
    topicsGrid.innerHTML = `
        <div class="topic-card" onclick="expandTopic('analysis', this)">
            <div class="topic-icon">
                <i class="fas fa-chart-line"></i>
            </div>
            <h3>Analysis</h3>
            <p>Differentialrechnung, Integralrechnung und Kurvendiskussion. Von Grenzwerten bis zu komplexen Funktionsuntersuchungen.</p>
            <div class="topic-meta">
                <span class="topic-count">
                    <i class="fas fa-layer-group"></i>
                    4 Bereiche
                </span>
                <span class="explore-arrow">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>

        <div class="topic-card" onclick="expandTopic('geometrie', this)">
            <div class="topic-icon">
                <i class="fas fa-cube"></i>
            </div>
            <h3>Analytische Geometrie</h3>
            <p>Vektoren, Geraden und Ebenen im Raum. Mathematische Beschreibung geometrischer Strukturen.</p>
            <div class="topic-meta">
                <span class="topic-count">
                    <i class="fas fa-layer-group"></i>
                    3 Bereiche
                </span>
                <span class="explore-arrow">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>

        <div class="topic-card" onclick="expandTopic('stochastik', this)">
            <div class="topic-icon">
                <i class="fas fa-dice"></i>
            </div>
            <h3>Stochastik</h3>
            <p>Wahrscheinlichkeitsrechnung, Verteilungen und Hypothesentests. Vom Zufall zur statistischen Sicherheit.</p>
            <div class="topic-meta">
                <span class="topic-count">
                    <i class="fas fa-layer-group"></i>
                    3 Bereiche
                </span>
                <span class="explore-arrow">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>
    `;
}

function showTopicDetails(topic) {
    const data = topicData[topic];
    document.getElementById('page-title').textContent = data.title;
    document.getElementById('page-subtitle').textContent = data.subtitle;
    
    // Create subtopic cards
    const topicsGrid = document.getElementById('topics-grid');
    topicsGrid.innerHTML = data.subtopics.map(subtopic => `
        <div class="topic-card" onclick="showSubtopicDetails('${topic}', '${subtopic.name}')">
            <div class="topic-icon">
                <i class="${subtopic.icon}"></i>
            </div>
            <h3>${subtopic.name}</h3>
            <p>${subtopic.description}</p>
            <div class="topic-meta">
                <span class="topic-count">
                    <i class="fas fa-book"></i>
                    Inhalte folgen
                </span>
                <span class="explore-arrow">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>
    `).join('');
    
    // Show topic description in expanded content
    const expandedContent = document.getElementById('expanded-content');
    document.getElementById('expanded-title').textContent = data.title;
    document.getElementById('expanded-description').textContent = data.description;
    expandedContent.classList.add('show');
}

function expandTopic(topicKey, cardElement) {
    // Navigate directly to topic details
    navigateTo('topic', topicKey);
}

function showSubtopicDetails(topic, subtopic) {
    const data = topicData[topic];
    const subtopicData = data.subtopics.find(s => s.name === subtopic);
    
    if (subtopicData && subtopicData.subtopics) {
        // Show nested subtopics as cards
        document.getElementById('page-title').textContent = subtopic;
        document.getElementById('page-subtitle').textContent = subtopicData.description;
        
        // Update breadcrumb
        updateBreadcrumb([
            { name: 'Startseite', level: 'home' },
            { name: data.title, level: 'topic', topic: topic },
            { name: subtopic, level: 'subtopic', topic: topic, subtopic: subtopic }
        ]);
        
        // Create subtopic cards
        const topicsGrid = document.getElementById('topics-grid');
        topicsGrid.innerHTML = subtopicData.subtopics.map(subsubtopic => `
            <div class="topic-card" onclick="showDetailContent('${topic}', '${subtopic}', '${subsubtopic.name}')">
                <div class="topic-icon">
                    <i class="${subsubtopic.icon}"></i>
                </div>
                <h3>${subsubtopic.name}</h3>
                <p>${subsubtopic.description}</p>
                <div class="topic-meta">
                    <span class="topic-count">
                        <i class="fas fa-book-open"></i>
                        Inhalte folgen
                    </span>
                    <span class="explore-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        `).join('');
        
        // Hide expanded content
        const expandedContent = document.getElementById('expanded-content');
        expandedContent.classList.remove('show');
    } else {
        // Show expanded content for subtopic without nested topics
        const expandedContent = document.getElementById('expanded-content');
        document.getElementById('expanded-title').textContent = subtopic;
        document.getElementById('expanded-description').textContent = `Detaillierte Inhalte zu "${subtopic}" werden hier entwickelt. Hier entstehen interaktive Erklärungen, Beispiele und Übungsaufgaben.`;
        expandedContent.classList.add('show');
    }
}

function showDetailContent(topic, subtopic, detailTopic) {
    // URL-Hash setzen
    history.replaceState(null, '', `#${topic}/${encodeURIComponent(subtopic)}/${encodeURIComponent(detailTopic)}`);

    // Breadcrumb aktualisieren
    updateBreadcrumb([
        { name: 'Startseite', level: 'home' },
        { name: topicData[topic].title, level: 'topic', topic: topic },
        { name: subtopic, level: 'subtopic', topic: topic, subtopic: subtopic },
        { name: detailTopic, level: 'detail', topic: topic, subtopic: subtopic, detail: detailTopic }
    ]);

    // Spezifische Unterseiten
    if (topic === 'analysis' && detailTopic === 'Ableitung und Ableitungsregeln') {
        showAbleitungsseite();
        updateFormulaCheatsheet('detail', 'ableitungsregeln');
        return;
    }

    // Standard-Fallback
    const topicsGrid = document.getElementById('topics-grid');
    topicsGrid.innerHTML = '';
    const expandedContent = document.getElementById('expanded-content');
    document.getElementById('expanded-title').textContent = detailTopic;
    document.getElementById('expanded-description').textContent = `Hier werden die detaillierten Inhalte zu "${detailTopic}" entwickelt. Interaktive Erklärungen, Beispiele, Übungsaufgaben und Lösungswege werden hier entstehen.`;
    expandedContent.classList.add('show');
}

function showAbleitungsseite() {
    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');

    topicsGrid.innerHTML = `
    <div class="detail-page">

        <!-- Einführung -->
        <section class="detail-section">
            <h2 class="detail-heading">Ableitung und Ableitungsregeln</h2>
            <p class="detail-intro">
                Die Bestimmung von Ableitungsfunktionen mithilfe des Grenzwertes von Differenzenquotienten
                ist aufwendig. Man kann damit aber die Ableitungen wichtiger Funktionen sowie Ableitungsregeln
                herleiten, mit denen sich zusammengesetzte, differenzierbare Funktionen viel einfacher ableiten lassen.
            </p>
        </section>

        <!-- Differenzenquotient & Ableitung als Tabelle -->
        <section class="detail-section">
            <h3 class="detail-subheading">Definition</h3>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Grafik</div>
                    <div class="concept-cell">Definition</div>
                    <div class="concept-cell">Bedeutung im Anwendungskontext</div>
                </div>

                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <img src="img/Differenzenquotient.png" alt="Grafik Differenzenquotient" class="concept-img">
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Differenzenquotient</div>
                        <div class="concept-formula">
                            \\(\\dfrac{f(a+h)-f(a)}{h} \\quad (h \\neq 0)\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        <strong>Mittlere Änderungsrate</strong> von \\(f\\) im Intervall \\(I = [a;\\ a+h]\\)
                        <br><br>
                        <span class="concept-note">= Steigung der Sekante durch \\(P(a\\mid f(a))\\) und \\(Q(a{+}h\\mid f(a{+}h))\\)</span>
                    </div>
                </div>

                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <img src="img/Ableitung.png" alt="Grafik Ableitung" class="concept-img">
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Ableitung</div>
                        <div class="concept-formula">
                            \\(f'(a) = \\lim_{\\substack{h \\to 0 \\\\ h \\neq 0}} \\dfrac{f(a+h)-f(a)}{h}\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        <strong>Momentane Änderungsrate</strong> von \\(f\\) an der Stelle \\(a\\)
                        <br><br>
                        <span class="concept-note">= Steigung der Tangente an den Graphen von \\(f\\) in \\(P(a\\mid f(a))\\)</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Ableitungstabelle -->
        <section class="detail-section">
            <h3 class="detail-subheading">Wichtige Ableitungen &amp; Ableitungsregeln</h3>
            <div class="deriv-table-wrapper">
                <table class="deriv-table">
                    <tbody>
                        <tr class="deriv-row-fx">
                            <td class="deriv-label">\\(f(x)\\)</td>
                            <td>\\(x^r\\)</td>
                            <td>\\(\\dfrac{u(x)}{v(x)}\\)</td>
                            <td>\\(g(x)+h(x)\\)</td>
                            <td>\\(c\\cdot g(x)\\)</td>
                            <td>\\(\\sqrt{x} = x^{\\frac{1}{2}}\\)</td>
                            <td>\\(\\dfrac{1}{x} = x^{-1}\\)</td>
                            <td>\\(\\sin(x)\\)</td>
                            <td>\\(\\cos(x)\\)</td>
                        </tr>
                        <tr class="deriv-row-dfx">
                            <td class="deriv-label">\\(f'(x)\\)</td>
                            <td>\\(r\\cdot x^{r-1}\\)</td>
                            <td>\\(\\dfrac{u'v - uv'}{v^2}\\)</td>
                            <td>\\(g'(x)+h'(x)\\)</td>
                            <td>\\(c\\cdot g'(x)\\)</td>
                            <td>\\(\\tfrac{1}{2}x^{-\\frac{1}{2}} = \\dfrac{1}{2\\sqrt{x}}\\)</td>
                            <td>\\(-x^{-2} = -\\dfrac{1}{x^2}\\)</td>
                            <td>\\(\\cos(x)\\)</td>
                            <td>\\(-\\sin(x)\\)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Produktregel, Quotientenregel, Kettenregel -->
        <section class="detail-section">
            <h3 class="detail-subheading">Zusammengesetzte Funktionen</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-times"></i> Produktregel</div>
                    <div class="rule-card-formula">\\((u \\cdot v)' = u' \\cdot v + u \\cdot v'\\)</div>
                    <div class="rule-card-example">
                        <span class="example-label">Beispiel:</span>
                        \\(f(x) = x^2 \\cdot \\sin(x)\\)<br>
                        \\(f'(x) = 2x \\cdot \\sin(x) + x^2 \\cdot \\cos(x)\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-divide"></i> Quotientenregel</div>
                    <div class="rule-card-formula" style="font-size:0.78rem;">\\(f(x)=\\dfrac{u(x)}{v(x)}\\)<br><br>\\(f'(x) = \\dfrac{u'(x)\\cdot v(x) - u(x)\\cdot v'(x)}{[v(x)]^2}\\)</div>
                    <div class="rule-card-example">
                        <span class="example-label">Beispiel:</span>
                        \\(f(x) = \\dfrac{\\sin(x)}{x}\\)<br>
                        \\(f'(x) = \\dfrac{\\cos(x)\\cdot x - \\sin(x)}{x^2}\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-link"></i> Kettenregel</div>
                    <div class="rule-card-formula">\\((f(g(x)))' = f'(g(x)) \\cdot g'(x)\\)</div>
                    <div class="rule-card-example">
                        <span class="example-label">Beispiel:</span>
                        \\(f(x) = \\sin(x^2)\\)<br>
                        \\(f'(x) = \\cos(x^2) \\cdot 2x\\)
                    </div>
                </div>
            </div>
        </section>

    </div>
    `;

    if (window.MathJax) {
        MathJax.typesetPromise([topicsGrid]);
    }
}

// Progress dots functionality
document.addEventListener('DOMContentLoaded', function() {
    // Seite beim Laden aus URL-Hash wiederherstellen
    restoreFromHash();

    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            document.querySelectorAll('.progress-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
