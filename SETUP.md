# Setup & Arbeitsablauf

Live-Seite: https://rutschmann-hub.github.io/Mathe_OS/ (GitHub Pages, Branch `main`)

## Dateistruktur

```
/
├── index.html              Seitengerüst (lädt CSS, MathJax und die Skripte)
├── labor.html              nur „Ausprobieren“, zum Einbetten (iframe)
├── css/
│   ├── base.css            Farben, Schrift, Hell/Dunkel
│   └── site.css            Layout und Bausteine (Merkkasten, Übungen, Selbsttest …)
├── js/
│   ├── buecher.js          Gliederung Basisfach / Leistungsfach (nach den Inhaltsverzeichnissen)
│   ├── inhalte.js          Hilfsfunktionen für Inhalte (Terme, Brüche, eigene Graphen)
│   ├── inhalte/            Eigene Inhalte, eine Datei pro Kapitel (kapitel-1.js …)
│   ├── labor.js            „Ausprobieren“: eigene Funktion, Steigung/Monotonie/Krümmung am Graphen
│   └── app.js              Navigation, Seitenaufbau, Zufallsaufgaben, Selbsttest
├── vendor/                 Lokale Kopien von MathJax, KaTeX, MathLive und Schriften (mit Lizenzen)
├── werkzeuge/              Eigenständige Werkzeuge (z. B. Funktionsmaschine)
├── kurztests/              Eigenständige Kurztests
└── tools/                  Prüfskript für Inhalte und Zufallsaufgaben
```

Die Seite lädt nichts von fremden Servern – alle Schriften und Bibliotheken liegen in `vendor/`.

## Lokal ansehen

```bash
python3 -m http.server 8080
```

Dann http://localhost:8080 öffnen.

## Adressen

- `#/` Start · `#/bf` bzw. `#/lk` Kurs · `#/lk/III` Kapitel aufgeklappt
- `#/lk/I/4` Thema (Kapitel I, Abschnitt 4)

Jede Adresse lässt sich direkt teilen oder in itslearning verlinken.

## Inhalte ergänzen

Inhalte stehen in `js/inhalte/kapitel-*.js` (neue Datei auch in `index.html` einbinden), Schlüssel ist der Thementitel aus `js/buecher.js`.
Gleichnamige Themen in Basisfach und Leistungsfach teilen sich das Material automatisch.
Bausteine mit `kurs: 'lk'` bzw. `kurs: 'bf'` erscheinen nur in diesem Kurs.
Mit `labor: { f: 'x^2' }` erscheint im Thema der interaktive Graph „Ausprobieren“ (Startfunktion f).

`labor.html` zeigt nur das „Ausprobieren“, z. B. zum Einbetten als iframe in itslearning. Startzustand über die Adresse (auch auf der Hauptseite), erzeugt vom Knopf „Link zu dieser Ansicht kopieren“:
`labor.html?f=x^3-3x&ansicht=ableitung&zusatz=f2&w=5&a=1&kurs=bf`
(`ansicht`: steigung, sekante, normale, nullstellen, monotonie, kruemmung, ableitung, ableiten – kommagetrennt; `zusatz`: f1, f2; `neben=1`: Graphen nebeneinander; `kurs`: Farbe bf oder lk). Für den Vollbild-Knopf im iframe `allow="fullscreen"` setzen.

Nach jeder Änderung prüfen (alle Themen vollständig, jede Zufallsaufgabe 300-mal numerisch nachgerechnet):

```bash
node tools/pruefe-inhalte.js
```

## Veröffentlichen

```bash
git add .
git commit -m "Kurze Beschreibung"
git push origin main
```

Nach 1–3 Minuten ist die Änderung online.
