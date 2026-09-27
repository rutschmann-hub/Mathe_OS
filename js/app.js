// Navigation state
let currentLevel = 'home';
let expandedCard = null;
let navigationHistory = [];
let searchMatches = [];
let _isRestoringHistory = false; // verhindert pushState beim Browser-Zurück

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
                        icon: 'fas fa-square-root-variable'
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
                        icon: 'fas fa-square-root-variable'
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
                    },
                    {
                        name: 'Bestimmen ganzrationaler Funktionen',
                        description: 'Bestimmung ganzrationaler Funktionen aus gegebenen Bedingungen',
                        icon: 'fas fa-chart-line'
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
                        icon: 'fas fa-arrows-left-right'
                    },
                    {
                        name: 'Winkel zwischen Vektoren',
                        description: 'Berechnung von Winkeln mit dem Skalarprodukt',
                        icon: 'fas fa-angle-up'
                    },
                    {
                        name: 'Schnittwinkel',
                        description: 'Winkel zwischen Geraden und Ebenen',
                        icon: 'fas fa-compress-arrows-alt'
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

const homeTopicCards = [
    {
        key: 'analysis',
        icon: 'fas fa-chart-line',
        title: 'Analysis',
        description: 'Differentialrechnung, Integralrechnung und Kurvendiskussion. Von Grenzwerten bis zu komplexen Funktionsuntersuchungen.',
        countLabel: '4 Bereiche'
    },
    {
        key: 'geometrie',
        icon: 'fas fa-cube',
        title: 'Analytische Geometrie',
        description: 'Vektoren, Geraden und Ebenen im Raum. Mathematische Beschreibung geometrischer Strukturen.',
        countLabel: '3 Bereiche'
    },
    {
        key: 'stochastik',
        icon: 'fas fa-dice',
        title: 'Stochastik',
        description: 'Wahrscheinlichkeitsrechnung, Verteilungen und Hypothesentests. Vom Zufall zur statistischen Sicherheit.',
        countLabel: '3 Bereiche'
    }
];

function renderHomeTopicCards() {
    const topicsGrid = document.getElementById('topics-grid');
    if (!topicsGrid) return;

    topicsGrid.innerHTML = homeTopicCards.map((card) => `
        <div class="topic-card" onclick="expandTopic('${card.key}', this)">
            <div class="topic-icon">
                <i class="${card.icon}"></i>
            </div>
            <h3>${card.title}</h3>
            <p>${card.description}</p>
            <div class="topic-meta">
                <span class="topic-count">
                    <i class="fas fa-layer-group"></i>
                    ${card.countLabel}
                </span>
                <span class="explore-arrow">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>
    `).join('');
}

function buildSearchIndex() {
    const index = [];

    Object.entries(topicData).forEach(([topicKey, topic]) => {
        index.push({
            title: topic.title,
            label: topic.title,
            hashPath: topicKey,
            searchText: `${topic.title} ${topic.subtitle} ${topic.description}`.toLowerCase()
        });

        topic.subtopics.forEach((subtopic) => {
            const subtopicPath = `${topicKey}/${encodeURIComponent(subtopic.name)}`;
            index.push({
                title: subtopic.name,
                label: `${topic.title} > ${subtopic.name}`,
                hashPath: subtopicPath,
                searchText: `${topic.title} ${subtopic.name} ${subtopic.description}`.toLowerCase()
            });

            if (Array.isArray(subtopic.subtopics)) {
                subtopic.subtopics.forEach((detailTopic) => {
                    index.push({
                        title: detailTopic.name,
                        label: `${topic.title} > ${subtopic.name} > ${detailTopic.name}`,
                        hashPath: `${subtopicPath}/${encodeURIComponent(detailTopic.name)}`,
                        searchText: `${topic.title} ${subtopic.name} ${detailTopic.name} ${detailTopic.description}`.toLowerCase()
                    });
                });
            }
        });
    });

    return index;
}

const searchIndex = buildSearchIndex();

function getSearchMatches(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return searchIndex
        .filter((entry) => entry.searchText.includes(normalized))
        .sort((a, b) => {
            const aStarts = a.title.toLowerCase().startsWith(normalized) ? 0 : 1;
            const bStarts = b.title.toLowerCase().startsWith(normalized) ? 0 : 1;
            if (aStarts !== bStarts) return aStarts - bStarts;
            return a.title.length - b.title.length;
        })
        .slice(0, 8);
}

function renderSearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    const normalized = query.trim();
    if (!normalized) {
        searchResults.hidden = true;
        searchResults.innerHTML = '';
        return;
    }

    if (results.length === 0) {
        searchResults.hidden = false;
        searchResults.innerHTML = '<div class="search-result-empty">Keine Treffer</div>';
        return;
    }

    searchResults.hidden = false;
    searchResults.innerHTML = results.map((result) => `
        <button type="button" class="search-result-item" data-hash-path="${result.hashPath}">
            <span class="search-result-title">${result.title}</span>
            <span class="search-result-path">${result.label}</span>
        </button>
    `).join('');
}

function hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    searchResults.hidden = true;
    searchResults.innerHTML = '';
}

function navigateByHashPath(hashPath) {
    if (!hashPath) return;

    const parts = decodeURIComponent(hashPath).split('/');
    if (parts[0] === 'mindmap' && parts[1]) {
        showMindmapPlaceholder(parts[1]);
        return;
    }

    if (parts[0] === 'formelsammlung' && parts[1]) {
        showFormulaCollectionPlaceholder(parts[1]);
        return;
    }

    const topic = parts[0];
    const subtopic = parts[1];
    const detail = parts[2];

    if (detail && topic && subtopic) {
        navigateTo('subtopic', topic, subtopic);
        // Detail ersetzt den Unterthema-Eintrag, damit nur ein Verlaufseintrag entsteht
        const wasRestoring = _isRestoringHistory;
        _isRestoringHistory = true;
        showDetailContent(topic, subtopic, detail);
        _isRestoringHistory = wasRestoring;
    } else if (subtopic && topic) {
        navigateTo('subtopic', topic, subtopic);
    } else if (topic && topicData[topic]) {
        navigateTo('topic', topic);
    }

    hideSearchResults();
}

function showMindmapPlaceholder(topicKey) {
    const topic = topicData[topicKey];
    if (!topic) return;

    history.replaceState(null, '', `#mindmap/${topicKey}`);
    currentLevel = 'mindmap';

    updateBreadcrumb([
        { name: 'Startseite', level: 'home' },
        { name: 'Mindmaps', level: 'home' },
        { name: topic.title, level: 'mindmap' }
    ]);
    updateTopicNav(topicKey);
    updateSidebars('topic', topicKey);

    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    topicsGrid.innerHTML = '';

    document.getElementById('expanded-title').textContent = `Mindmap ${topic.title}`;
    document.getElementById('expanded-description').textContent =
        `Die Mindmap für ${topic.title} wird hier ergänzt. Du kannst später diese Seite mit deiner eigenen Mindmap füllen.`;
    expandedContent.classList.add('show');
}

function showFormulaCollectionPlaceholder(topicKey) {
    const topic = topicData[topicKey];
    if (!topic) return;

    history.replaceState(null, '', `#formelsammlung/${topicKey}`);
    currentLevel = 'formula';

    updateBreadcrumb([
        { name: 'Startseite', level: 'home' },
        { name: 'Formelsammlung', level: 'home' },
        { name: topic.title, level: 'formula' }
    ]);
    updateTopicNav(topicKey);

    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    topicsGrid.innerHTML = '';

    document.getElementById('expanded-title').textContent = `Formelsammlung ${topic.title}`;
    document.getElementById('expanded-description').textContent =
        `Die Formelsammlung für ${topic.title} wird hier ergänzt. Du kannst später diese Seite mit deinen eigenen Inhalten füllen.`;
    expandedContent.classList.add('show');
}

function updateSidebars(level, topic = null, subtopic = null) {
    updateFormulaCheatsheet(level, topic, subtopic);
}

function updateFormulaCheatsheet(level, topic, subtopic) {
    const cheatsheetContainer = document.querySelector('.formula-cheatsheet');
    if (!cheatsheetContainer) return;

    const activeTopic = ['analysis', 'geometrie', 'stochastik'].includes(topic) ? topic : null;
    let cheatsheetHTML = '<h3>Formelsammlungen</h3>';
    cheatsheetHTML += `
        <div class="formula-link-list">
            <button class="formula-link-btn ${activeTopic === 'analysis' ? 'active' : ''}" onclick="showFormulaCollectionPlaceholder('analysis')">
                <i class="fas fa-chart-line"></i>
                <span>Analysis</span>
            </button>
            <button class="formula-link-btn ${activeTopic === 'geometrie' ? 'active' : ''}" onclick="showFormulaCollectionPlaceholder('geometrie')">
                <i class="fas fa-cube"></i>
                <span>Analytische Geometrie</span>
            </button>
            <button class="formula-link-btn ${activeTopic === 'stochastik' ? 'active' : ''}" onclick="showFormulaCollectionPlaceholder('stochastik')">
                <i class="fas fa-dice"></i>
                <span>Stochastik</span>
            </button>
            <p class="formula-link-note">Inhalte fügst du später ein.</p>
        </div>
    `;
    cheatsheetContainer.innerHTML = cheatsheetHTML;
}
// Navigation functions
function navigateTo(level, topic = null, subtopic = null, detail = null) {
    currentLevel = level;

    // URL-Hash setzen (pushState für Vorwärts-Navigation, replaceState beim Browser-Zurück)
    const setHash = _isRestoringHistory ? history.replaceState.bind(history) : history.pushState.bind(history);
    if (level === 'home') {
        setHash(null, '', '#');
    } else if (level === 'topic' && topic) {
        setHash(null, '', `#${topic}`);
    } else if (level === 'subtopic' && topic && subtopic) {
        setHash(null, '', `#${topic}/${encodeURIComponent(subtopic)}`);
    } else if (level === 'detail' && topic && subtopic && detail) {
        setHash(null, '', `#${topic}/${encodeURIComponent(subtopic)}/${encodeURIComponent(detail)}`);
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
    if (!hash) return false;
    navigateByHashPath(hash);
    return true;
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

    renderHomeTopicCards();
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
                    ${Array.isArray(subtopic.subtopics) ? `${subtopic.subtopics.length} Unterthemen` : '1 Unterthema'}
                </span>
                <span class="explore-arrow">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>
    `).join('');

    // Kein blauer Erklärungskasten auf der Themenebene
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');
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
                        Lerninhalt
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
    const _setHash = _isRestoringHistory ? history.replaceState.bind(history) : history.pushState.bind(history);
    _setHash(null, '', `#${topic}/${encodeURIComponent(subtopic)}/${encodeURIComponent(detailTopic)}`);

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

    if (topic === 'analysis' && detailTopic === 'Verkettung von Funktionen') {
        showVerkettungseite();
        updateFormulaCheatsheet('detail', 'verkettung');
        return;
    }
    if (topic === 'analysis' && detailTopic === 'Kettenregel') {
        showKettenregelseite();
        updateFormulaCheatsheet('detail', 'kettenregel');
        return;
    }
    if (topic === 'analysis' && detailTopic === 'Produktregel') {
        showProduktregelseite();
        updateFormulaCheatsheet('detail', 'produktregel');
        return;
    }
    if (topic === 'analysis' && detailTopic === 'Monotonie und Krümmung') {
        showMonotonienseite();
        updateFormulaCheatsheet('detail', 'monotonie');
        return;
    }
    if (topic === 'analysis' && detailTopic === 'Extrem- und Wendepunkte') {
        showExtremWendepunktseite();
        updateFormulaCheatsheet('detail', 'extremwendepunkte');
        return;
    }
    if (topic === 'analysis' && detailTopic === 'Tangente und Normale') {
        showTangenteNormalseite();
        updateFormulaCheatsheet('detail', 'tangentenormale');
        return;
    }
    if (topic === 'analysis' && detailTopic === 'Extremwertprobleme mit Nebenbedingung') {
        showExtremwertproblemseite();
        updateFormulaCheatsheet('detail', 'extremwertprobleme');
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

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([topicsGrid]);
    }
}

function showVerkettungseite() {
    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');

    topicsGrid.innerHTML = `
    <div class="detail-page">

        <!-- Einführung -->
        <section class="detail-section">
            <h2 class="detail-heading">Verkettung von Funktionen</h2>
            <p class="detail-intro">
                Viele Funktionen lassen sich als Zusammensetzung einfacherer Funktionen verstehen.
                Die Verkettung (Komposition) von Funktionen beschreibt, wie der Ausgabewert einer Funktion
                direkt als Eingabewert einer anderen Funktion verwendet wird – ein fundamentales Konzept,
                das besonders für die Kettenregel in der Differentialrechnung unverzichtbar ist.
            </p>
        </section>

        <!-- Definition als Tabelle -->
        <section class="detail-section">
            <h3 class="detail-subheading">Definition</h3>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Schaubild</div>
                    <div class="concept-cell">Definition</div>
                    <div class="concept-cell">Bedeutung im Kontext</div>
                </div>

                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 220 100" width="100%" style="max-height:130px;">
                            <defs>
                                <marker id="arr1" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
                                    <path d="M0,0 L0,7 L7,3.5 z" fill="#888"/>
                                </marker>
                            </defs>
                            <rect x="5" y="35" width="38" height="28" rx="6" fill="#f0f4ff" stroke="#2c3e7a" stroke-width="1.5"/>
                            <text x="24" y="54" text-anchor="middle" font-size="13" fill="#2c3e7a" font-family="monospace" font-weight="bold">x</text>
                            <line x1="43" y1="49" x2="65" y2="49" stroke="#888" stroke-width="1.5" marker-end="url(#arr1)"/>
                            <rect x="66" y="29" width="52" height="40" rx="6" fill="#fff8e7" stroke="#c8972a" stroke-width="1.8"/>
                            <text x="92" y="47" text-anchor="middle" font-size="12" fill="#c8972a" font-family="monospace" font-weight="bold">g(x)</text>
                            <text x="92" y="61" text-anchor="middle" font-size="9" fill="#c8972a">Innen</text>
                            <line x1="118" y1="49" x2="140" y2="49" stroke="#888" stroke-width="1.5" marker-end="url(#arr1)"/>
                            <rect x="141" y="29" width="72" height="40" rx="6" fill="#eaf7f0" stroke="#2a7a5c" stroke-width="1.8"/>
                            <text x="177" y="47" text-anchor="middle" font-size="11" fill="#2a7a5c" font-family="monospace" font-weight="bold">f(g(x))</text>
                            <text x="177" y="61" text-anchor="middle" font-size="9" fill="#2a7a5c">Außen</text>
                            <text x="24" y="88" text-anchor="middle" font-size="9" fill="#999">Eingabe</text>
                            <text x="177" y="88" text-anchor="middle" font-size="9" fill="#999">Ausgabe</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Verkettung \\((f \\circ g)\\)</div>
                        <div class="concept-formula">
                            \\((f \\circ g)(x) = f(g(x))\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        <strong>Hintereinanderausführung</strong> der Funktionen \\(g\\) und \\(f\\)
                        <br><br>
                        <span class="concept-note">Zuerst wird \\(g(x)\\) berechnet, dann wird das Ergebnis als Argument in \\(f\\) eingesetzt.</span>
                    </div>
                </div>

                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 220 105" width="100%" style="max-height:130px;">
                            <defs>
                                <marker id="arr2" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
                                    <path d="M0,0 L0,7 L7,3.5 z" fill="#888"/>
                                </marker>
                            </defs>
                            <text x="110" y="22" text-anchor="middle" font-size="16" fill="#2c3e7a" font-family="monospace" font-weight="bold">f( g(x) )</text>
                            <path d="M 72 26 Q 55 50 68 68" fill="none" stroke="#2a7a5c" stroke-width="1.5" marker-end="url(#arr2)"/>
                            <text x="42" y="80" text-anchor="middle" font-size="10" fill="#2a7a5c" font-weight="600">Außen-</text>
                            <text x="42" y="93" text-anchor="middle" font-size="10" fill="#2a7a5c" font-weight="600">funktion</text>
                            <path d="M 143 26 Q 160 50 147 68" fill="none" stroke="#c8972a" stroke-width="1.5" marker-end="url(#arr2)"/>
                            <text x="175" y="80" text-anchor="middle" font-size="10" fill="#c8972a" font-weight="600">Innen-</text>
                            <text x="175" y="93" text-anchor="middle" font-size="10" fill="#c8972a" font-weight="600">funktion</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Innen- &amp; Außenfunktion</div>
                        <div class="concept-formula" style="font-size:0.88rem;">
                            \\(h(x) = f(\\underbrace{g(x)}_{\\text{Innen}})\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        <strong>Innenfunktion</strong> \\(u = g(x)\\): wird zuerst ausgewertet
                        <br><br>
                        <strong>Außenfunktion</strong> \\(f(u)\\): erhält den Wert von \\(g\\) als Argument
                        <br><br>
                        <span class="concept-note">Achtung: \\(f \\circ g \\neq g \\circ f\\) — die Verkettung ist <em>nicht</em> kommutativ!</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Definitionsbereich -->
        <section class="detail-section">
            <h3 class="detail-subheading">Definitionsbereich der Verkettung</h3>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Bedingung</div>
                    <div class="concept-cell">Formel</div>
                    <div class="concept-cell">Hinweis</div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell">
                        <strong>Definitionsbereich</strong> von \\(f \\circ g\\)
                    </div>
                    <div class="concept-cell">
                        <div class="concept-formula" style="font-size:0.88rem;">
                            \\(D_{f \\circ g} = \\{\\, x \\in D_g \\mid g(x) \\in D_f \\,\\}\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        <span class="concept-note">Der Wertebereich von \\(g\\) muss im Definitionsbereich von \\(f\\) liegen — sonst ist die Verkettung an dieser Stelle nicht definiert.</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Beispiele -->
        <section class="detail-section">
            <h3 class="detail-subheading">Beispiele</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-star"></i> Einfaches Beispiel</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">
                        \\(f(x) = x^2,\\quad g(x) = 3x+1\\)
                    </div>
                    <div class="rule-card-example">
                        \\((f \\circ g)(x) = f(g(x))\\)<br>
                        \\(= f(3x+1) = (3x+1)^2\\)<br>
                        \\(= 9x^2 + 6x + 1\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-link"></i> Mit Trigonometrie</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">
                        \\(f(x) = \\sin(x),\\quad g(x) = x^2\\)
                    </div>
                    <div class="rule-card-example">
                        \\((f \\circ g)(x) = \\sin(x^2)\\)
                        <br><br>
                        <span class="example-label">Innen: \\(x^2\\) &ensp;|&ensp; Außen: \\(\\sin\\)</span>
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-exchange-alt"></i> Reihenfolge beachten</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">
                        \\(f(x) = \\sqrt{x},\\quad g(x) = x^2+1\\)
                    </div>
                    <div class="rule-card-example">
                        \\((f \\circ g)(x) = \\sqrt{x^2+1}\\)<br>
                        \\((g \\circ f)(x) = (\\sqrt{x})^2+1 = x+1\\)
                        <br><br>
                        <span class="example-label">\\(\\Rightarrow\\; f\\circ g \\neq g\\circ f\\)</span>
                    </div>
                </div>
            </div>
        </section>

    </div>
    `;

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([topicsGrid]);
    }
}

function showKettenregelseite() {
    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');

    topicsGrid.innerHTML = `
    <div class="detail-page">

        <section class="detail-section">
            <h2 class="detail-heading">Kettenregel</h2>
            <p class="detail-intro">
                Die Kettenregel ermöglicht die Ableitung zusammengesetzter (verketteter) Funktionen.
                Immer wenn eine Funktion aus einer Innen- und einer Außenfunktion besteht,
                kommt die Kettenregel zum Einsatz – sie ist eine der meistgenutzten Ableitungsregeln.
            </p>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Formel</h3>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Schaubild</div>
                    <div class="concept-cell">Definition</div>
                    <div class="concept-cell">Bedeutung</div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 220 110" width="100%" style="max-height:130px;">
                            <defs>
                                <marker id="arrk1" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
                                    <path d="M0,0 L0,7 L7,3.5 z" fill="#888"/>
                                </marker>
                            </defs>
                            <rect x="5" y="35" width="38" height="28" rx="6" fill="#f0f4ff" stroke="#2c3e7a" stroke-width="1.5"/>
                            <text x="24" y="54" text-anchor="middle" font-size="13" fill="#2c3e7a" font-family="monospace" font-weight="bold">x</text>
                            <line x1="43" y1="49" x2="65" y2="49" stroke="#888" stroke-width="1.5" marker-end="url(#arrk1)"/>
                            <rect x="66" y="29" width="52" height="40" rx="6" fill="#fff8e7" stroke="#c8972a" stroke-width="1.8"/>
                            <text x="92" y="44" text-anchor="middle" font-size="11" fill="#c8972a" font-family="monospace">u=g(x)</text>
                            <text x="92" y="59" text-anchor="middle" font-size="9" fill="#c8972a">·g'(x)</text>
                            <line x1="118" y1="49" x2="140" y2="49" stroke="#888" stroke-width="1.5" marker-end="url(#arrk1)"/>
                            <rect x="141" y="29" width="74" height="40" rx="6" fill="#eaf7f0" stroke="#2a7a5c" stroke-width="1.8"/>
                            <text x="178" y="44" text-anchor="middle" font-size="10" fill="#2a7a5c" font-family="monospace">f'(u)·g'(x)</text>
                            <text x="178" y="59" text-anchor="middle" font-size="9" fill="#2a7a5c">Ergebnis</text>
                            <text x="92" y="88" text-anchor="middle" font-size="9" fill="#c8972a">Innenfkt.</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Kettenregel</div>
                        <div class="concept-formula" style="font-size:0.9rem;">
                            \\(h(x) = f(g(x))\\)
                            <br><br>
                            \\(h'(x) = f'(g(x)) \\cdot g'(x)\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        <strong>Außen ableiten</strong> (Innenfunktion stehen lassen) × <strong>Innen ableiten</strong>
                        <br><br>
                        <span class="concept-note">Die äußere Funktion wird abgeleitet (Innenfunktion bleibt erhalten), multipliziert mit der Ableitung der Innenfunktion.</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Vorgehen</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-search"></i> 1. Funktionen bestimmen</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">Innen- und Außenfunktion identifizieren</div>
                    <div class="rule-card-example">
                        \\(h(x) = \\sin(x^2)\\)<br>
                        Innen: \\(g(x) = x^2\\)<br>
                        Außen: \\(f(u) = \\sin(u)\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-calculator"></i> 2. Ableitungen bilden</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">Beide Funktionen separat ableiten</div>
                    <div class="rule-card-example">
                        \\(g'(x) = 2x\\)<br>
                        \\(f'(u) = \\cos(u)\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-times"></i> 3. Multiplizieren</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(h'(x) = f'(g(x)) \\cdot g'(x)\\)</div>
                    <div class="rule-card-example">
                        \\(h'(x) = \\cos(x^2) \\cdot 2x\\)
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Beispiele</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-superscript"></i> Potenz</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(h(x) = (2x+1)^5\\)</div>
                    <div class="rule-card-example">
                        Innen: \\(2x+1\\), Außen: \\(u^5\\)<br>
                        \\(h'(x) = 5(2x+1)^4 \\cdot 2\\)<br>
                        \\(= 10(2x+1)^4\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-wave-square"></i> Trigonometrie</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(h(x) = \\cos(3x)\\)</div>
                    <div class="rule-card-example">
                        Innen: \\(3x\\), Außen: \\(\\cos(u)\\)<br>
                        \\(h'(x) = -\\sin(3x) \\cdot 3\\)<br>
                        \\(= -3\\sin(3x)\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-chart-line"></i> Exponential</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(h(x) = e^{x^2}\\)</div>
                    <div class="rule-card-example">
                        Innen: \\(x^2\\), Außen: \\(e^u\\)<br>
                        \\(h'(x) = e^{x^2} \\cdot 2x\\)
                    </div>
                </div>
            </div>
        </section>

    </div>
    `;

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([topicsGrid]);
    }
}

function showProduktregelseite() {
    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');

    topicsGrid.innerHTML = `
    <div class="detail-page">

        <section class="detail-section">
            <h2 class="detail-heading">Produktregel</h2>
            <p class="detail-intro">
                Die Produktregel wird angewendet, wenn zwei Funktionen miteinander multipliziert werden.
                Anders als bei einfachen Potenzfunktionen lässt sich ein Produkt zweier Funktionen
                nicht gliedweise ableiten – hier ist die Produktregel unverzichtbar.
            </p>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Formel</h3>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Schema</div>
                    <div class="concept-cell">Definition</div>
                    <div class="concept-cell">Bedeutung</div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 220 100" width="100%" style="max-height:120px;">
                            <defs>
                                <marker id="arrp1" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
                                    <path d="M0,0 L0,7 L7,3.5 z" fill="#888"/>
                                </marker>
                            </defs>
                            <text x="110" y="22" text-anchor="middle" font-size="14" fill="#2c3e7a" font-family="monospace" font-weight="bold">f = u · v</text>
                            <text x="55" y="58" text-anchor="middle" font-size="12" fill="#c8972a" font-family="monospace">u' · v</text>
                            <text x="110" y="58" text-anchor="middle" font-size="16" fill="#888">+</text>
                            <text x="165" y="58" text-anchor="middle" font-size="12" fill="#2a7a5c" font-family="monospace">u · v'</text>
                            <line x1="82" y1="26" x2="62" y2="48" stroke="#c8972a" stroke-width="1.2" marker-end="url(#arrp1)"/>
                            <line x1="138" y1="26" x2="158" y2="48" stroke="#2a7a5c" stroke-width="1.2" marker-end="url(#arrp1)"/>
                            <text x="110" y="82" text-anchor="middle" font-size="11" fill="#2c3e7a" font-family="monospace">f'(x) = u'v + uv'</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Produktregel</div>
                        <div class="concept-formula">
                            \\(f(x) = u(x) \\cdot v(x)\\)
                            <br><br>
                            \\(f'(x) = u'(x) \\cdot v(x) + u(x) \\cdot v'(x)\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        <strong>Merkregel:</strong> „Erste abgeleitet mal Zweite, plus Erste mal Zweite abgeleitet"
                        <br><br>
                        <span class="concept-note">Kurzform: \\((u \\cdot v)' = u'v + uv'\\)</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 220 90" width="100%" style="max-height:110px;">
                            <rect x="15" y="10" width="85" height="55" rx="4" fill="#fff8e7" stroke="#c8972a" stroke-width="1.5"/>
                            <text x="57" y="42" text-anchor="middle" font-size="11" fill="#c8972a" font-family="monospace">u · v</text>
                            <rect x="100" y="10" width="30" height="55" rx="4" fill="#eaf7f0" stroke="#2a7a5c" stroke-width="1.5"/>
                            <text x="115" y="42" text-anchor="middle" font-size="10" fill="#2a7a5c" font-family="monospace">u·Δv</text>
                            <rect x="15" y="65" width="85" height="18" rx="4" fill="#f0f4ff" stroke="#2c3e7a" stroke-width="1.5"/>
                            <text x="57" y="78" text-anchor="middle" font-size="9" fill="#2c3e7a" font-family="monospace">Δu · v</text>
                            <text x="178" y="42" text-anchor="middle" font-size="10" fill="#888">→ u'v + uv'</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Geometrische Idee</div>
                        <div class="concept-formula" style="font-size:0.88rem;">
                            \\(\\Delta(u \\cdot v) \\approx \\Delta u \\cdot v + u \\cdot \\Delta v\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        <span class="concept-note">Die Flächenänderung eines Rechtecks mit Seiten \\(u\\) und \\(v\\) veranschaulicht die Produktregel anschaulich.</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Beispiele</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-wave-square"></i> Mit Trigonometrie</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(f(x) = x^2 \\cdot \\sin(x)\\)</div>
                    <div class="rule-card-example">
                        \\(u = x^2,\\quad v = \\sin(x)\\)<br>
                        \\(u' = 2x,\\quad v' = \\cos(x)\\)<br>
                        \\(f'(x) = 2x\\sin(x) + x^2\\cos(x)\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-chart-line"></i> Mit Exponential</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(f(x) = x \\cdot e^x\\)</div>
                    <div class="rule-card-example">
                        \\(u = x,\\quad v = e^x\\)<br>
                        \\(u' = 1,\\quad v' = e^x\\)<br>
                        \\(f'(x) = e^x + x \\cdot e^x = e^x(1+x)\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-superscript"></i> Mit Logarithmus</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(f(x) = x^2 \\cdot \\ln(x)\\)</div>
                    <div class="rule-card-example">
                        \\(u = x^2,\\quad v = \\ln(x)\\)<br>
                        \\(u' = 2x,\\quad v' = \\tfrac{1}{x}\\)<br>
                        \\(f'(x) = 2x\\ln(x) + x\\)
                    </div>
                </div>
            </div>
        </section>

    </div>
    `;

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([topicsGrid]);
    }
}

function showMonotonienseite() {
    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');

    topicsGrid.innerHTML = `
    <div class="detail-page">

        <section class="detail-section">
            <h2 class="detail-heading">Monotonie und Krümmung</h2>
            <p class="detail-intro">
                Das Verhalten einer Funktion lässt sich mithilfe ihrer Ableitungen präzise beschreiben.
                Die erste Ableitung gibt Auskunft über das Steigungsverhalten (Monotonie),
                die zweite Ableitung über das Krümmungsverhalten des Graphen.
            </p>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Monotonie</h3>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Graph</div>
                    <div class="concept-cell">Bedingung</div>
                    <div class="concept-cell">Bedeutung</div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 200 120" width="100%" style="max-height:140px;">
                            <defs>
                                <linearGradient id="sg_grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="#2a7a5c" stop-opacity="0.22"/>
                                    <stop offset="100%" stop-color="#2a7a5c" stop-opacity="0.03"/>
                                </linearGradient>
                            </defs>
                            <!-- Grid -->
                            <line x1="30" y1="20" x2="30" y2="92" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="80" y1="20" x2="80" y2="92" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="130" y1="20" x2="130" y2="92" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="180" y1="20" x2="180" y2="92" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="22" y1="35" x2="192" y2="35" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="22" y1="63" x2="192" y2="63" stroke="#f0f0f0" stroke-width="1"/>
                            <!-- Fill under curve -->
                            <path d="M 42 88 C 70 82, 96 66, 120 52 C 145 39, 165 26, 188 18 L 188 92 L 42 92 Z" fill="url(#sg_grad)"/>
                            <!-- Axes -->
                            <line x1="18" y1="92" x2="192" y2="92" stroke="#aaa" stroke-width="1.5"/>
                            <polygon points="192,89 200,92 192,95" fill="#aaa"/>
                            <line x1="30" y1="106" x2="30" y2="10" stroke="#aaa" stroke-width="1.5"/>
                            <polygon points="27,10 30,3 33,10" fill="#aaa"/>
                            <!-- Axis labels -->
                            <text x="196" y="96" font-size="10" fill="#aaa" font-style="italic">x</text>
                            <text x="23" y="9" font-size="10" fill="#aaa" font-style="italic">y</text>
                            <!-- Tick marks -->
                            <line x1="80" y1="89" x2="80" y2="95" stroke="#ccc" stroke-width="1"/>
                            <line x1="130" y1="89" x2="130" y2="95" stroke="#ccc" stroke-width="1"/>
                            <line x1="27" y1="63" x2="33" y2="63" stroke="#ccc" stroke-width="1"/>
                            <line x1="27" y1="35" x2="33" y2="35" stroke="#ccc" stroke-width="1"/>
                            <!-- Curve -->
                            <path d="M 42 88 C 70 82, 96 66, 120 52 C 145 39, 165 26, 188 18" fill="none" stroke="#2a7a5c" stroke-width="2.5" stroke-linecap="round"/>
                            <!-- Tangent points with slope indicators -->
                            <line x1="62" y1="87" x2="82" y2="78" stroke="#2a7a5c" stroke-width="1.5" stroke-linecap="round" opacity="0.55"/>
                            <circle cx="72" cy="82.5" r="3" fill="white" stroke="#2a7a5c" stroke-width="1.5"/>
                            <line x1="110" y1="58" x2="130" y2="46" stroke="#2a7a5c" stroke-width="1.5" stroke-linecap="round" opacity="0.55"/>
                            <circle cx="120" cy="52" r="3" fill="white" stroke="#2a7a5c" stroke-width="1.5"/>
                            <line x1="161" y1="31" x2="179" y2="21" stroke="#2a7a5c" stroke-width="1.5" stroke-linecap="round" opacity="0.55"/>
                            <circle cx="170" cy="26" r="3" fill="white" stroke="#2a7a5c" stroke-width="1.5"/>
                            <!-- Label -->
                            <text x="148" y="26" font-size="14" fill="#2a7a5c">↗</text>
                            <text x="70" y="110" font-size="10" fill="#2a7a5c" font-weight="bold">f'(x) &gt; 0</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Streng monoton steigend</div>
                        <div class="concept-formula">\\(f'(x) > 0\\)</div>
                    </div>
                    <div class="concept-cell">
                        Der Graph verläuft von links nach rechts <strong>aufwärts</strong>.
                        <br><br>
                        <span class="concept-note">Mit zunehmendem \\(x\\) nimmt \\(f(x)\\) zu.</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 200 120" width="100%" style="max-height:140px;">
                            <defs>
                                <linearGradient id="sf_grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="#c0392b" stop-opacity="0.04"/>
                                    <stop offset="100%" stop-color="#c0392b" stop-opacity="0.20"/>
                                </linearGradient>
                            </defs>
                            <!-- Grid -->
                            <line x1="30" y1="20" x2="30" y2="92" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="80" y1="20" x2="80" y2="92" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="130" y1="20" x2="130" y2="92" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="180" y1="20" x2="180" y2="92" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="22" y1="35" x2="192" y2="35" stroke="#f0f0f0" stroke-width="1"/>
                            <line x1="22" y1="63" x2="192" y2="63" stroke="#f0f0f0" stroke-width="1"/>
                            <!-- Fill under curve -->
                            <path d="M 42 18 C 70 26, 96 42, 120 56 C 145 69, 165 82, 188 88 L 188 92 L 42 92 Z" fill="url(#sf_grad)"/>
                            <!-- Axes -->
                            <line x1="18" y1="92" x2="192" y2="92" stroke="#aaa" stroke-width="1.5"/>
                            <polygon points="192,89 200,92 192,95" fill="#aaa"/>
                            <line x1="30" y1="106" x2="30" y2="10" stroke="#aaa" stroke-width="1.5"/>
                            <polygon points="27,10 30,3 33,10" fill="#aaa"/>
                            <!-- Axis labels -->
                            <text x="196" y="96" font-size="10" fill="#aaa" font-style="italic">x</text>
                            <text x="23" y="9" font-size="10" fill="#aaa" font-style="italic">y</text>
                            <!-- Tick marks -->
                            <line x1="80" y1="89" x2="80" y2="95" stroke="#ccc" stroke-width="1"/>
                            <line x1="130" y1="89" x2="130" y2="95" stroke="#ccc" stroke-width="1"/>
                            <line x1="27" y1="63" x2="33" y2="63" stroke="#ccc" stroke-width="1"/>
                            <line x1="27" y1="35" x2="33" y2="35" stroke="#ccc" stroke-width="1"/>
                            <!-- Curve -->
                            <path d="M 42 18 C 70 26, 96 42, 120 56 C 145 69, 165 82, 188 88" fill="none" stroke="#c0392b" stroke-width="2.5" stroke-linecap="round"/>
                            <!-- Tangent points with slope indicators -->
                            <line x1="62" y1="21" x2="82" y2="31" stroke="#c0392b" stroke-width="1.5" stroke-linecap="round" opacity="0.55"/>
                            <circle cx="72" cy="26" r="3" fill="white" stroke="#c0392b" stroke-width="1.5"/>
                            <line x1="110" y1="50" x2="130" y2="62" stroke="#c0392b" stroke-width="1.5" stroke-linecap="round" opacity="0.55"/>
                            <circle cx="120" cy="56" r="3" fill="white" stroke="#c0392b" stroke-width="1.5"/>
                            <line x1="161" y1="77" x2="179" y2="86" stroke="#c0392b" stroke-width="1.5" stroke-linecap="round" opacity="0.55"/>
                            <circle cx="170" cy="81.5" r="3" fill="white" stroke="#c0392b" stroke-width="1.5"/>
                            <!-- Label -->
                            <text x="130" y="22" font-size="14" fill="#c0392b">↘</text>
                            <text x="70" y="110" font-size="10" fill="#c0392b" font-weight="bold">f'(x) &lt; 0</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Streng monoton fallend</div>
                        <div class="concept-formula">\\(f'(x) < 0\\)</div>
                    </div>
                    <div class="concept-cell">
                        Der Graph verläuft von links nach rechts <strong>abwärts</strong>.
                        <br><br>
                        <span class="concept-note">Mit zunehmendem \\(x\\) nimmt \\(f(x)\\) ab.</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Krümmung</h3>
            <div style="border-left:3px solid var(--primary-mustard);background:var(--soft-gray);border-radius:var(--radius-small);padding:0.9rem 1.2rem;margin-bottom:1.2rem;font-size:0.95rem;color:var(--text-secondary);line-height:1.7;">
                <strong style="color:var(--primary-navy);">Satz:</strong>
                Ist eine Funktion \\(f\\) auf einem Intervall \\(I\\) definiert und zweimal differenzierbar, so gilt:
                <br>
                – Wenn \\(f''(x) > 0\\) für alle \\(x \\in I\\) gilt, dann ist der Graph von \\(f\\) <strong>linksgekrümmt</strong> in \\(I\\).
                <br>
                – Wenn \\(f''(x) < 0\\) für alle \\(x \\in I\\) gilt, dann ist der Graph von \\(f\\) <strong>rechtsgekrümmt</strong> in \\(I\\).
            </div>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Anschauung</div>
                    <div class="concept-cell">Bedingung</div>
                    <div class="concept-cell">Bedeutung</div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <img src="img/Kruemmung_links.png" alt="Linksgekrümmt – Fahrrad bergauf" class="concept-img">
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Linksgekrümmt (konvex)</div>
                        <div class="concept-formula">\\(f''(x) > 0\\)</div>
                    </div>
                    <div class="concept-cell">
                        Die Steigung <strong>nimmt zu</strong> – der Graph ist nach oben geöffnet.
                        <br><br>
                        <span class="concept-note">Tangenten verlaufen <em>unterhalb</em> des Graphen.</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <img src="img/Kruemmung_rechts.png" alt="Rechtsgekrümmt – Fahrrad S-Kurve" class="concept-img">
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Rechtsgekrümmt (konkav)</div>
                        <div class="concept-formula">\\(f''(x) < 0\\)</div>
                    </div>
                    <div class="concept-cell">
                        Die Steigung <strong>nimmt ab</strong> – der Graph ist nach unten geöffnet.
                        <br><br>
                        <span class="concept-note">Tangenten verlaufen <em>oberhalb</em> des Graphen.</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Beispiel: Vorzeichentabelle</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-table"></i> Monotonie bestimmen</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(f(x) = x^3 - 3x\\)</div>
                    <div class="rule-card-example">
                        \\(f'(x) = 3x^2 - 3 = 3(x-1)(x+1)\\)<br>
                        Nullstellen: \\(x = \\pm 1\\)<br><br>
                        \\(x &lt; -1\\): \\(f' &gt; 0\\) → steigend<br>
                        \\(-1 &lt; x &lt; 1\\): \\(f' &lt; 0\\) → fallend<br>
                        \\(x &gt; 1\\): \\(f' &gt; 0\\) → steigend
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-chart-line"></i> Krümmung bestimmen</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(f''(x) = 6x\\)</div>
                    <div class="rule-card-example">
                        Nullstelle: \\(x = 0\\)<br><br>
                        \\(x &lt; 0\\): \\(f'' &lt; 0\\) → rechtsgekrümmt<br>
                        \\(x &gt; 0\\): \\(f'' &gt; 0\\) → linksgekrümmt<br><br>
                        <span class="example-label">Wendepunkt bei \\(x = 0\\)</span>
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-info-circle"></i> Zusammenhang</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">Merksatz</div>
                    <div class="rule-card-example">
                        \\(f'\\) = Steigung von \\(f\\)<br>
                        \\(f''\\) = Steigung von \\(f'\\)<br><br>
                        <span class="example-label">\\(f'' &gt; 0\\) ⟺ \\(f'\\) wächst ⟺ \\(f\\) linksgekrümmt</span>
                    </div>
                </div>
            </div>
        </section>

    </div>
    `;

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([topicsGrid]);
    }
}

function showExtremWendepunktseite() {
    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');

    topicsGrid.innerHTML = `
    <div class="detail-page">

        <section class="detail-section">
            <h2 class="detail-heading">Extrem- und Wendepunkte</h2>
            <p class="detail-intro">
                Extrempunkte (Hoch- und Tiefpunkte) und Wendepunkte sind charakteristische Punkte
                des Graphen einer Funktion. Ihre Bestimmung ist ein zentrales Thema der Kurvendiskussion
                und erfordert das gezielte Auswerten von erster und zweiter Ableitung.
            </p>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Übersicht</h3>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Graph</div>
                    <div class="concept-cell">Notw. Bedingung</div>
                    <div class="concept-cell">Hinr. Bedingung</div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 200 90" width="100%" style="max-height:110px;">
                            <line x1="20" y1="80" x2="185" y2="80" stroke="#ccc" stroke-width="1"/>
                            <path d="M 30 62 Q 100 5 170 62" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                            <line x1="68" y1="16" x2="132" y2="16" stroke="#c0392b" stroke-width="1.2" stroke-dasharray="4,3"/>
                            <circle cx="100" cy="12" r="4" fill="#c0392b"/>
                            <text x="100" y="38" text-anchor="middle" font-size="10" fill="#c0392b">Hochpunkt</text>
                            <text x="100" y="52" text-anchor="middle" font-size="9" fill="#888">f'(x₀) = 0</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Hochpunkt</div>
                        <div class="concept-formula" style="font-size:0.88rem;">\\(f'(x_0) = 0\\)</div>
                    </div>
                    <div class="concept-cell">
                        \\(f''(x_0) < 0\\)
                        <br><br>
                        <span class="concept-note">Vorzeichenwechsel von \\(f'\\): \\(+\\to-\\)</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 200 90" width="100%" style="max-height:110px;">
                            <line x1="20" y1="80" x2="185" y2="80" stroke="#ccc" stroke-width="1"/>
                            <path d="M 30 20 Q 100 75 170 20" fill="none" stroke="#2a7a5c" stroke-width="2.5"/>
                            <line x1="68" y1="70" x2="132" y2="70" stroke="#2a7a5c" stroke-width="1.2" stroke-dasharray="4,3"/>
                            <circle cx="100" cy="73" r="4" fill="#2a7a5c"/>
                            <text x="100" y="44" text-anchor="middle" font-size="10" fill="#2a7a5c">Tiefpunkt</text>
                            <text x="100" y="58" text-anchor="middle" font-size="9" fill="#888">f'(x₀) = 0</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Tiefpunkt</div>
                        <div class="concept-formula" style="font-size:0.88rem;">\\(f'(x_0) = 0\\)</div>
                    </div>
                    <div class="concept-cell">
                        \\(f''(x_0) > 0\\)
                        <br><br>
                        <span class="concept-note">Vorzeichenwechsel von \\(f'\\): \\(-\\to+\\)</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 200 90" width="100%" style="max-height:110px;">
                            <line x1="20" y1="80" x2="185" y2="80" stroke="#ccc" stroke-width="1"/>
                            <path d="M 25 65 Q 65 65 100 45 Q 135 25 175 22" fill="none" stroke="#2c3e7a" stroke-width="2.5"/>
                            <line x1="72" y1="62" x2="128" y2="28" stroke="#2c3e7a" stroke-width="1.2" stroke-dasharray="4,3"/>
                            <circle cx="100" cy="45" r="4" fill="#2c3e7a"/>
                            <text x="148" y="38" font-size="10" fill="#2c3e7a">Wende-</text>
                            <text x="148" y="50" font-size="10" fill="#2c3e7a">punkt</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Wendepunkt</div>
                        <div class="concept-formula" style="font-size:0.88rem;">\\(f''(x_0) = 0\\)</div>
                    </div>
                    <div class="concept-cell">
                        \\(f'''(x_0) \\neq 0\\)
                        <br><br>
                        <span class="concept-note">Vorzeichenwechsel von \\(f''\\); Krümmungsverhalten wechselt</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Vorgehen &amp; Beispiel</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-search"></i> Extrempunkte finden</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">Notwendige &amp; hinreichende Bedingung</div>
                    <div class="rule-card-example">
                        1. \\(f'(x) = 0\\) lösen → Kandidaten \\(x_0\\)<br>
                        2. \\(f''(x_0)\\) berechnen:<br>
                        &nbsp;&nbsp;• \\(f'' &lt; 0\\): Hochpunkt<br>
                        &nbsp;&nbsp;• \\(f'' &gt; 0\\): Tiefpunkt<br>
                        &nbsp;&nbsp;• \\(f'' = 0\\): VZW von \\(f'\\) prüfen<br>
                        3. \\(y_0 = f(x_0)\\) berechnen
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-wave-square"></i> Wendepunkte finden</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">Krümmungswechsel</div>
                    <div class="rule-card-example">
                        1. \\(f''(x) = 0\\) lösen → Kandidaten \\(x_0\\)<br>
                        2. \\(f'''(x_0) \\neq 0\\) prüfen<br>
                        &nbsp;&nbsp;<em>oder:</em> VZW von \\(f''\\) nachweisen<br>
                        3. \\(y_0 = f(x_0)\\) berechnen
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-pen"></i> Beispiel</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(f(x) = x^3 - 3x\\)</div>
                    <div class="rule-card-example">
                        \\(f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1\\)<br>
                        \\(f''(x) = 6x\\)<br>
                        \\(f''(-1) = -6 &lt; 0\\) → HP \\((-1,\\, 2)\\)<br>
                        \\(f''(1) = 6 &gt; 0\\) → TP \\((1,\\, -2)\\)<br><br>
                        \\(f''(x) = 0 \\Rightarrow x = 0\\)<br>
                        \\(f'''(0) = 6 \\neq 0\\) → WP \\((0,\\, 0)\\)
                    </div>
                </div>
            </div>
        </section>

    </div>
    `;

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([topicsGrid]);
    }
}

function showTangenteNormalseite() {
    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');

    topicsGrid.innerHTML = `
    <div class="detail-page">

        <section class="detail-section">
            <h2 class="detail-heading">Tangente und Normale</h2>
            <p class="detail-intro">
                Die Tangente an einen Graphen beschreibt die momentane Änderungsrate an einem Punkt
                geometrisch als Berührgerade. Die Normale steht senkrecht auf der Tangente im selben Berührpunkt.
                Beide Geraden sind zentral für die geometrische Interpretation der Ableitung.
            </p>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Definition</h3>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Graph</div>
                    <div class="concept-cell">Formel</div>
                    <div class="concept-cell">Bedeutung</div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 200 100" width="100%" style="max-height:120px;">
                            <line x1="15" y1="85" x2="188" y2="85" stroke="#ccc" stroke-width="1"/>
                            <line x1="20" y1="10" x2="20" y2="90" stroke="#ccc" stroke-width="1"/>
                            <path d="M 28 78 Q 78 72 110 48 Q 142 22 178 16" fill="none" stroke="#888" stroke-width="2"/>
                            <line x1="58" y1="70" x2="168" y2="24" stroke="#c0392b" stroke-width="2"/>
                            <circle cx="110" cy="46" r="4" fill="#c0392b"/>
                            <text x="120" y="43" font-size="9" fill="#c0392b">P(x₀|y₀)</text>
                            <text x="158" y="20" font-size="9" fill="#c0392b">Tangente t</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Tangente</div>
                        <div class="concept-formula" style="font-size:0.85rem;">
                            \\(t:\\; y = f'(x_0)\\cdot(x-x_0) + f(x_0)\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        Steigung: \\(m_t = f'(x_0)\\)
                        <br><br>
                        <span class="concept-note">Die Tangente berührt den Graphen in \\(P(x_0 \\mid f(x_0))\\) und hat dort dieselbe Steigung wie der Graph.</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell concept-cell-img">
                        <svg viewBox="0 0 200 100" width="100%" style="max-height:120px;">
                            <line x1="15" y1="85" x2="188" y2="85" stroke="#ccc" stroke-width="1"/>
                            <line x1="20" y1="10" x2="20" y2="90" stroke="#ccc" stroke-width="1"/>
                            <path d="M 28 78 Q 78 72 110 48 Q 142 22 178 16" fill="none" stroke="#888" stroke-width="2"/>
                            <line x1="58" y1="70" x2="168" y2="24" stroke="#2c3e7a" stroke-width="1.5" stroke-dasharray="5,3"/>
                            <line x1="94" y1="12" x2="128" y2="82" stroke="#2a7a5c" stroke-width="2"/>
                            <circle cx="110" cy="46" r="4" fill="#2a7a5c"/>
                            <path d="M 106 40 L 100 43 L 103 49" fill="none" stroke="#888" stroke-width="1"/>
                            <text x="131" y="78" font-size="9" fill="#2a7a5c">Normale n</text>
                            <text x="56" y="20" font-size="9" fill="#2c3e7a">Tangente t</text>
                        </svg>
                    </div>
                    <div class="concept-cell">
                        <div class="concept-label">Normale</div>
                        <div class="concept-formula" style="font-size:0.82rem;">
                            \\(n:\\; y = -\\dfrac{1}{f'(x_0)}\\cdot(x-x_0) + f(x_0)\\)
                        </div>
                    </div>
                    <div class="concept-cell">
                        Steigung: \\(m_n = -\\dfrac{1}{f'(x_0)}\\)
                        <br><br>
                        <span class="concept-note">Tangente ⊥ Normale: \\(\\;m_t \\cdot m_n = -1\\)</span>
                        <br><br>
                        <span class="concept-note">Nur für \\(f'(x_0) \\neq 0\\). Bei \\(f'(x_0) = 0\\) ist die Normale die senkrechte Gerade \\(x = x_0\\).</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Beispiel</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-pen"></i> Gegebene Funktion</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(f(x) = x^2\\) an \\(x_0 = 1\\)</div>
                    <div class="rule-card-example">
                        \\(f(1) = 1\\) → Berührpunkt \\(P(1 \\mid 1)\\)<br>
                        \\(f'(x) = 2x\\)<br>
                        \\(f'(1) = 2\\) → Steigung der Tangente
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-slash"></i> Tangentengleichung</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(m_t = 2\\)</div>
                    <div class="rule-card-example">
                        \\(t:\\; y = 2(x-1)+1\\)<br>
                        \\(\\phantom{t:}\\; y = 2x - 1\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-arrows-alt-v"></i> Normalengleichung</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">\\(m_n = -\\tfrac{1}{2}\\)</div>
                    <div class="rule-card-example">
                        \\(n:\\; y = -\\tfrac{1}{2}(x-1)+1\\)<br>
                        \\(\\phantom{n:}\\; y = -\\tfrac{1}{2}x + \\tfrac{3}{2}\\)
                    </div>
                </div>
            </div>
        </section>

    </div>
    `;

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([topicsGrid]);
    }
}

function showExtremwertproblemseite() {
    const topicsGrid = document.getElementById('topics-grid');
    const expandedContent = document.getElementById('expanded-content');
    expandedContent.classList.remove('show');

    topicsGrid.innerHTML = `
    <div class="detail-page">

        <section class="detail-section">
            <h2 class="detail-heading">Extremwertprobleme mit Nebenbedingung</h2>
            <p class="detail-intro">
                Bei Extremwertproblemen mit Nebenbedingung soll eine Größe maximiert oder minimiert werden,
                während eine zusätzliche Einschränkung eingehalten werden muss.
                Typische Aufgaben: maximaler Flächeninhalt bei gegebenem Umfang,
                minimaler Materialverbrauch bei vorgegebenem Volumen.
            </p>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Lösungsstrategie</h3>
            <div class="concept-table">
                <div class="concept-row concept-header">
                    <div class="concept-cell">Schritt</div>
                    <div class="concept-cell">Vorgehen</div>
                    <div class="concept-cell">Hinweis</div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell">
                        <strong>1. Skizze &amp; Variablen</strong>
                    </div>
                    <div class="concept-cell">
                        Situation zeichnen und alle relevanten Größen mit Variablen benennen.
                    </div>
                    <div class="concept-cell">
                        <span class="concept-note">Gutes Benennen (z. B. \\(x, y, r, h\\)) erleichtert den gesamten Lösungsweg erheblich.</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell">
                        <strong>2. Zielfunktion</strong>
                    </div>
                    <div class="concept-cell">
                        Die zu optimierende Größe als Funktion aufstellen:
                        <div class="concept-formula" style="font-size:0.88rem;">\\(Z = Z(x, y, \\ldots)\\)</div>
                    </div>
                    <div class="concept-cell">
                        <span class="concept-note">Die Zielfunktion hat zunächst oft zwei Variablen – wird durch die Nebenbedingung auf eine reduziert.</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell">
                        <strong>3. Nebenbedingung</strong>
                    </div>
                    <div class="concept-cell">
                        Einschränkung als Gleichung formulieren und nach einer Variablen auflösen:
                        <div class="concept-formula" style="font-size:0.88rem;">\\(N(x,y) = c \\;\\Rightarrow\\; y = y(x)\\)</div>
                    </div>
                    <div class="concept-cell">
                        <span class="concept-note">Einsetzen in die Zielfunktion ergibt eine Funktion in <em>einer</em> Variablen.</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell">
                        <strong>4. Ableiten &amp; Lösen</strong>
                    </div>
                    <div class="concept-cell">
                        \\(Z'(x) = 0\\) lösen, Art des Extremums durch \\(Z''(x)\\) bestätigen.
                    </div>
                    <div class="concept-cell">
                        <span class="concept-note">Randwerte des Definitionsbereichs nicht vergessen!</span>
                    </div>
                </div>
                <div class="concept-row">
                    <div class="concept-cell">
                        <strong>5. Antwort</strong>
                    </div>
                    <div class="concept-cell">
                        Alle gesuchten Größen berechnen und das Ergebnis vollständig formulieren.
                    </div>
                    <div class="concept-cell">
                        <span class="concept-note">Einheiten angeben und prüfen, ob das Ergebnis im Kontext sinnvoll ist.</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-section">
            <h3 class="detail-subheading">Beispiel</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-vector-square"></i> Aufgabe</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">Rechteck mit maximalem Flächeninhalt</div>
                    <div class="rule-card-example">
                        Gegeben: Umfang \\(U = 20\\) cm<br>
                        Gesucht: Abmessungen für maximale Fläche \\(A\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-pencil-ruler"></i> Aufstellung</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">Zielfunktion &amp; Nebenbedingung</div>
                    <div class="rule-card-example">
                        Zielfunktion: \\(A = x \\cdot y\\)<br>
                        Nebenbedingung: \\(2x + 2y = 20\\)<br>
                        \\(\\Rightarrow y = 10 - x\\)<br>
                        \\(A(x) = x(10-x) = 10x - x^2\\)
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-card-title"><i class="fas fa-check-circle"></i> Lösung</div>
                    <div class="rule-card-formula" style="font-size:0.85rem;">Extremum bestimmen</div>
                    <div class="rule-card-example">
                        \\(A'(x) = 10 - 2x = 0 \\Rightarrow x = 5\\)<br>
                        \\(A''(x) = -2 &lt; 0\\) → Maximum<br>
                        \\(y = 10 - 5 = 5\\)<br><br>
                        <span class="example-label">Das Quadrat \\(5\\times 5\\) cm hat maximale Fläche \\(A = 25\\) cm²</span>
                    </div>
                </div>
            </div>
        </section>

    </div>
    `;

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([topicsGrid]);
    }
}

// Search and initial page setup
document.addEventListener('DOMContentLoaded', function() {
    const topicSearchInput = document.getElementById('topic-search');
    const searchResults = document.getElementById('search-results');
    const breadcrumbSearchForm = document.getElementById('breadcrumb-search-form');

    if (topicSearchInput) {
        topicSearchInput.addEventListener('input', (event) => {
            const query = event.target.value || '';
            searchMatches = getSearchMatches(query);
            renderSearchResults(searchMatches, query);
        });

        topicSearchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (searchMatches.length > 0) {
                    navigateByHashPath(searchMatches[0].hashPath);
                }
            } else if (event.key === 'Escape') {
                hideSearchResults();
                topicSearchInput.blur();
            }
        });
    }

    if (breadcrumbSearchForm) {
        breadcrumbSearchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (searchMatches.length > 0) {
                navigateByHashPath(searchMatches[0].hashPath);
            }
        });
    }

    if (searchResults) {
        searchResults.addEventListener('click', (event) => {
            const button = event.target.closest('.search-result-item');
            if (!button) return;
            navigateByHashPath(button.dataset.hashPath || '');
        });
    }

    // Seite beim Laden aus URL-Hash wiederherstellen (ohne neuen Verlaufseintrag)
    _isRestoringHistory = true;
    const wasRestored = restoreFromHash();
    if (!wasRestored) {
        navigateTo('home');
    }
    _isRestoringHistory = false;

    // Browser-Zurück/Vor-Navigation unterstützen
    window.addEventListener('popstate', () => {
        _isRestoringHistory = true;
        const restored = restoreFromHash();
        if (!restored) {
            navigateTo('home');
        }
        _isRestoringHistory = false;
    });

    document.addEventListener('click', (event) => {
        const insideSearch = event.target.closest('.breadcrumb-search') || event.target.closest('#search-results');
        if (!insideSearch) {
            hideSearchResults();
        }
    });

    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
