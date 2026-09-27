# 🚀 Setup & Arbeitsablauf

Live-Seite: https://rutschmann-hub.github.io/Mathe_OS/ (GitHub Pages, Branch `main`)

## 📁 Dateistruktur

```
/
├── index.html                  Hauptseite (Layout, Navigation, Sidebars)
├── css/
│   └── styles.css              Alle Styles (inkl. Responsive/iPad)
├── js/
│   ├── app.js                  Themenstruktur (topicData), Navigation, Suche, Detailseiten
│   └── mathjax-config.js       MathJax-Einstellungen
├── img/                        Abbildungen für Detailseiten
├── mindmaps/
│   ├── analysis.html           Interaktive Mindmaps (eigenständige Seiten)
│   ├── geometrie.html
│   ├── stochastik.html
│   └── gesamt.html
├── kurztests/
│   └── geraden-im-raum.html    Kurztest Analytische Geometrie
├── CLAUDE.md                   Coding-Richtlinien für Claude Code
└── SETUP.md                    Diese Anleitung
```

## 💻 Lokal ansehen

Im Projektordner einen einfachen Webserver starten und im Browser öffnen:

```bash
python3 -m http.server 8080
```

Dann http://localhost:8080 aufrufen. (Direktes Öffnen der `index.html` per Doppelklick kann bei Bildern/MathJax Probleme machen.)

## 📤 Änderungen veröffentlichen

```bash
git add .
git commit -m "Kurze Beschreibung der Änderung"
git push origin main
```

GitHub Pages baut die Seite danach automatisch neu – nach **1–3 Minuten** ist die Änderung online.

## 🔧 Wo ändere ich was?

- **Neues Thema / Unterthema:** Eintrag in `topicData` in `js/app.js`
- **Eigene Detailseite:** Funktion `show…seite()` in `js/app.js` anlegen und in `showDetailContent()` einhängen
- **Bilder:** in `img/` ablegen, im HTML mit `img/Dateiname.png` einbinden
- **Design:** `css/styles.css`
- **Mindmaps / Kurztests:** jeweilige HTML-Datei in `mindmaps/` bzw. `kurztests/`; Verlinkung in `index.html`
- **Formeln:** LaTeX mit `\( … \)` (inline) oder `\[ … \]` (abgesetzt) – in JS-Template-Strings Backslashes verdoppeln: `\\( … \\)`

## 🔗 URLs & Navigation

Jede Seite hat eine eigene Adresse im Hash, z. B. `#analysis/Grundlagen%20der%20Differenzialrechnung/Kettenregel`. Links lassen sich so direkt teilen, und die Zurück-/Vor-Tasten des Browsers funktionieren.
