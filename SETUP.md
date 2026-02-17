# 🚀 Setup-Anleitung für GitHub

## 📁 Neue Dateistruktur

```
/
├── index.html           (Hauptdatei - 150 Zeilen)
├── css/
│   └── styles.css      (Alle Styles - 450 Zeilen)
├── js/
│   ├── app.js          (Hauptfunktionen - 300 Zeilen)
│   └── mathjax-config.js (MathJax Setup - 10 Zeilen)
└── SETUP.md            (Diese Anleitung)
```

## 📋 GitHub Upload-Anleitung

### Variante A: Über GitHub Website (einfacher)

1. **Gehe zu deinem Repository: github.com/rutschmann-hub/Mathe_OS**

2. **Lösche die alte index.html:**
   - Klick auf `index.html`
   - Klick auf 🗑️ (Delete this file)
   - Commit the change

3. **Lade die neuen Dateien hoch:**
   - **"Add file" → "Upload files"**
   - Ziehe alle 4 Dateien gleichzeitig rein:
     - `index.html`
     - `css/styles.css` 
     - `js/app.js`
     - `js/mathjax-config.js`
   - **"Commit changes"**

### Variante B: Mit Git (falls du es lokal hast)

```bash
# Repository klonen (falls noch nicht gemacht)
git clone https://github.com/rutschmann-hub/Mathe_OS.git
cd Mathe_OS

# Alte Datei löschen
rm index.html

# Neue Struktur erstellen
mkdir -p css js

# Dateien kopieren (von deinem Download-Ordner)
cp ~/Downloads/index.html .
cp ~/Downloads/styles.css css/
cp ~/Downloads/app.js js/
cp ~/Downloads/mathjax-config.js js/

# Hochladen
git add .
git commit -m "Refactor: Split into separate CSS/JS files"
git push origin main
```

## ✅ Vorteile der neuen Struktur

- **Übersichtlich:** Jede Datei hat einen klaren Zweck
- **Wartbar:** CSS und JS sind getrennt editierbar
- **Professionell:** Industriestandard für Webentwicklung
- **Erweiterbar:** Neue Dateien einfach hinzufügbar

## 🎯 Nach dem Upload

1. **Warte 2-3 Minuten** (GitHub Pages Build)
2. **Teste:** https://rutschmann-hub.github.io/Mathe_OS
3. **Funktioniert genauso** wie vorher, nur sauberer!

## 🔧 Für zukünftige Änderungen

- **Design ändern:** Nur `css/styles.css` bearbeiten
- **Funktionen hinzufügen:** Nur `js/app.js` bearbeiten  
- **Inhalte ändern:** Nur `index.html` bearbeiten
- **Mathe-Formeln:** MathJax ist bereits konfiguriert

Viel einfacher zu verwalten! 🎉