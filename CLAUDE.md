# CLAUDE.md

## Coding-Richtlinien (nach Karpathy)

Verhaltensregeln gegen typische LLM-Coding-Fehler, abgeleitet aus [Andrej Karpathys Beobachtungen](https://x.com/karpathy/status/2015883857489522876).

**Abwägung:** Die Regeln setzen auf Sorgfalt statt Tempo. Bei trivialen Aufgaben mit Augenmaß anwenden.

### 1. Erst denken, dann coden

**Nichts annehmen. Unklarheiten nicht verstecken. Abwägungen offenlegen.**

Vor der Umsetzung:
- Annahmen explizit nennen. Bei Unsicherheit nachfragen.
- Gibt es mehrere Deutungen, diese vorstellen – nicht stillschweigend eine wählen.
- Gibt es einen einfacheren Weg, ihn nennen. Wo angebracht, widersprechen.
- Ist etwas unklar: anhalten, benennen, was unklar ist, und fragen.

### 2. Einfachheit zuerst

**Minimaler Code, der das Problem löst. Nichts auf Vorrat.**

- Keine Features über die Anforderung hinaus.
- Keine Abstraktionen für einmalig genutzten Code.
- Keine nicht angefragte „Flexibilität“ oder Konfigurierbarkeit.
- Keine Fehlerbehandlung für unmögliche Fälle.
- Werden es 200 Zeilen, obwohl 50 reichen würden: neu schreiben.

Prüffrage: „Würde ein erfahrener Entwickler das überkompliziert finden?“ Wenn ja, vereinfachen.

### 3. Chirurgische Änderungen

**Nur anfassen, was nötig ist. Nur eigene Unordnung aufräumen.**

Beim Bearbeiten bestehenden Codes:
- Angrenzenden Code, Kommentare oder Formatierung nicht „verbessern“.
- Nichts refaktorieren, was nicht kaputt ist.
- Bestehenden Stil beibehalten, auch wenn man es anders machen würde.
- Nicht zugehörigen toten Code erwähnen, aber nicht löschen.

Wenn eigene Änderungen Waisen erzeugen:
- Imports/Variablen/Funktionen entfernen, die durch die EIGENEN Änderungen ungenutzt wurden.
- Bereits vorhandenen toten Code nur auf Nachfrage entfernen.

Test: Jede geänderte Zeile muss sich direkt auf die Anfrage zurückführen lassen.

### 4. Zielgerichtete Umsetzung

**Erfolgskriterien festlegen. Wiederholen, bis verifiziert.**

Aufgaben in überprüfbare Ziele übersetzen:
- „Validierung hinzufügen“ → „Tests für ungültige Eingaben schreiben, dann bestehen lassen“
- „Bug beheben“ → „Test schreiben, der ihn reproduziert, dann bestehen lassen“
- „X refaktorieren“ → „Tests bestehen vorher und nachher“

Bei mehrstufigen Aufgaben einen kurzen Plan angeben:
```
1. [Schritt] → prüfen: [Check]
2. [Schritt] → prüfen: [Check]
3. [Schritt] → prüfen: [Check]
```

Starke Erfolgskriterien erlauben selbstständiges Iterieren. Schwache Kriterien („mach, dass es geht“) erfordern ständiges Nachfragen.
