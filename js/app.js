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
                icon: 'fas fa-chart-line'
            },
            {
                name: 'Integralrechnung',
                description: 'Stammfunktionen, bestimmte Integrale und Flächenberechnungen',
                icon: 'fas fa-area-chart'
            },
            {
                name: 'Funktionen und ihre Graphen',
                description: 'Kurvendiskussion, Extremwerte und vollständige Funktionsuntersuchung',
                icon: 'fas fa-project-diagram'
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

// Navigation functions
function navigateTo(level, topic = null, subtopic = null) {
    currentLevel = level;
    
    if (level === 'home') {
        updateBreadcrumb([{ name: 'Startseite', level: 'home' }]);
        updateTopicNav(null);
        showMainTopics();
    } else if (level === 'topic' && topic) {
        updateBreadcrumb([
            { name: 'Startseite', level: 'home' },
            { name: topicData[topic].title, level: 'topic', topic: topic }
        ]);
        updateTopicNav(topic);
        showTopicDetails(topic);
    } else if (level === 'subtopic' && topic && subtopic) {
        updateBreadcrumb([
            { name: 'Startseite', level: 'home' },
            { name: topicData[topic].title, level: 'topic', topic: topic },
            { name: subtopic, level: 'subtopic', topic: topic, subtopic: subtopic }
        ]);
        updateTopicNav(topic);
        showSubtopicDetails(topic, subtopic);
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
    if (currentLevel === 'home') {
        // Navigate to topic details
        navigateTo('topic', topicKey);
    } else {
        // Show expanded content for subtopic
        const expandedContent = document.getElementById('expanded-content');
        
        if (expandedCard === cardElement) {
            expandedContent.classList.remove('show');
            expandedCard = null;
            return;
        }
        
        expandedCard = cardElement;
        
        const data = topicData[topicKey];
        document.getElementById('expanded-title').textContent = data.title;
        document.getElementById('expanded-description').textContent = data.description;
        expandedContent.classList.add('show');
    }
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
    // Show expanded content for the detailed topic
    const expandedContent = document.getElementById('expanded-content');
    document.getElementById('expanded-title').textContent = detailTopic;
    document.getElementById('expanded-description').textContent = `Hier werden die detaillierten Inhalte zu "${detailTopic}" entwickelt. Interaktive Erklärungen, Beispiele, Übungsaufgaben und Lösungswege werden hier entstehen.`;
    expandedContent.classList.add('show');
}

// Progress dots functionality
document.addEventListener('DOMContentLoaded', function() {
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
