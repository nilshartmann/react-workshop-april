# Übung: Eine React-Komponente

# Vorbereitung

- Stelle sicher, dass der Development-Server läuft
- Starte dazu das Script `dev` aus dem Root-Verzeichnis des Workspaces
    - Zum Beispiel: `pnpm dev` oder `npm run dev`
- Der Server mit deiner Anwendung läuft dann auf Port 3000
- **Hinweis:** Wenn der Server läuft und du **Dateien speicherst**, sollte die Darstellung im Browser automatisch aktualisiert werden
    - Wenn das nicht klappt, Browser Refresh machen
    - In der Regel ist es aber nicht notwendig, den Server neuzustarten.

# Dateien

- src/components/App.tsx
- src/components/MatchRow.tsx (bitte anlegen!)

# Schritte

- Lege die neue Datei `src/components/MatchRow.tsx` an
    - Dateien, die TypeScript- und JSX-Code enthalten **müssen** mit `.tsx` enden
    - Dateien, die nur "normalen" TypeScript-Code enthalten, können auch die Endung `.ts` haben.
- Lege darin eine ganz einfache React Komponente an
- Sie soll `MatchRow` heißen
    - Fachliche Idee: damit kann man eine Spielpaarung (`3. Spieltag, HSV - St. Pauli 2:1`) darstellen
    - Damit alles möglichst einfach bleibt, zeige folgende (ausgedachte) Informationen (die wir später per Parameter an die Komponente übergeben) in einer Zeile an:
        - Bezeichnung des Spieltags (`1. Spieltag` oder `CL Halbfinale`) 
        - Name Heimmannschaft
        - Name Auswärtsmannschaft
        - Tore Auswärtsmannschaft
        - Tore Heimmannschaft
    - Styling etc. spielt in unserem Workshop keine Rolle, aber wenn du willst, kannst du natürlich CSS hinzufügen (s.u.)
- Denk dran, dass du die Komponente exportieren musst!
- **Baue deine Komponente in unsere `App`-Komponente ein**
    - Die `App`-Komponente ist die Root-Komponente in unserer Anwendung, die beim Starten von React gerendert wird
        - Diese Komponente ist unser "Spielplatz", den wir nur verwenden, um unsere gebauten Komponenten auszuprobieren
        - wir werden später die `App`-Komponente noch um weitere Komponenten ergänzen und später durch den Router ersetzen
    - Die `App`-Komponente gibt `Hello World` aus. Entferne das `return` Statement und liefere stattdessen deine `ArticleCard` zurück

# Material

- Komponenten: https://react.dev/learn/your-first-component
- Importieren und exportieren von Komponenten: https://react.dev/learn/importing-and-exporting-components
  - Achtung! Beim `import` brauchst du in unserem Setup keine Dateiendung anzugeben!

# Hintergrund: CSS in React
- Im Workspace ist Tailwind installiert, das kannst du out-of-the-box verwenden
    - Wenn du kein Tailwind verwenden willst, kannst du in `src/index.css` auch deine eigenen CSS-Klassen reinschreiben
      - Alternativ kannst du dein eigenes CSS auch auf einzelne Dateien aufteilen. Dazu legst du eine (oder mehrere) `.css`-Dateien an und importierst diese in einer (oder mehreren) Komponenten, z.B. `import './MatchRow.css';`
- Unabhängig davon, ob du Tailwind oder eigenes CSS benutzt: anstatt `class` verwendest du in React das Attribute `className`, um die CSS-Klassen zu setzen (https://react.dev/learn#adding-styles)
- Um inline styles anzugeben (`style`-Attribute), musst du in React ein Objekt angeben.
    - Siehe hier: https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx
    - 
