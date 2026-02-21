// Navigation state
let currentLevel = 'home';
let expandedCard = null;
let navigationHistory = [];
let searchMatches = [];

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
        showDetailContent(topic, subtopic, detail);
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

    // Seite beim Laden aus URL-Hash wiederherstellen
    const wasRestored = restoreFromHash();
    if (!wasRestored) {
        navigateTo('home');
    }

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
