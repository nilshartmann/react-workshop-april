# Properties einer Komponente

# Dateien

- src/types.ts (anlegen!)
- src/components/MatchRow.tsx
- src/components/App.tsx

# Schritte

- **Mache deine `MatchRow`-Komponente mit Properties parametrisierbar**
  - Die entsprechenden Informationen sollen in einem Objekt als Property übergeben werden
    - Also nicht diverse "einzelne" Property, sondern ein Property, das ein Objekt enthält
- Beschreibe zunächst den TypeScript-Typen für ein `Match`
  - Lege dazu die neue Datei `src/types.ts` ein und beschreibe und exportiere dort den Typen `Match` (als `interface` oder `type`)
  - Der Type-Script enthält folgende Felder:
    - `id` (String - Eindeutige Id des Matches, benötigen wir später)
    - `matchDay` (String - Spieltag-Name ("1. Bundesliga"))
    - `homeTeam` und `awayTeam` (jeweils String - Name der Heim- bzw. Auswärtsmannschaft)
    - `homeGoals` und `awayTeam` (Zahl - Tore der beiden Mannschaften)
- Erweitere die `MatchOverview`-Komponente
  - Beschreibe die Properties für die Komponente in einem `interface` oder `type`
    - Als einziges Property wird `match` benötigt (TS-Typ `Match`, den du eben gebaut hast)
- Verwende die übergebenen Properties in deiner `MatchRow`-Komponente
    - Entferne die hardcodierten Werte aus der vorherigen Übung und ersetze sie durch die Werte aus den Properties
- **Passe den Aufruf in der `App`-Komponente an**
    - Hier musst du jetzt dein `match`-Property übergeben. 
- Optional: **Optimiere die Darstellung des Ergebnisses**
  - Hebe die Mannschaft hervor, die das Spiel gewonnen hat (z.B. mit CSS-Klasse `font-bold`)
  - Zum Testen kannst du in der `App`-Komponente die `MatchRow`-Komponente zweimal rendern lassen; jeweils mit unterschiedlichen Properties.

# Material

- Properties von Komponenten: https://react.dev/learn/passing-props-to-a-component
- TypeScript object type (zum Beschreiben des Property-Objektes): https://www.typescriptlang.org/docs/handbook/2/objects.html
- JavaScript in JSX: https://react.dev/learn/javascript-in-jsx-with-curly-braces
- Conditionally rendering: https://react.dev/learn/conditional-rendering#conditionally-including-jsx
- Single Root Element: https://react.dev/learn/writing-markup-with-jsx#1-return-a-single-root-element
    - Fragment Komponente: https://react.dev/reference/react/Fragment
