# Baue eine Liste mit Artikeln

# Dateien

- src/types.ts
- src/components/MatchesByLeagueList.tsx (anlegen)
- src/components/App.tsx

# Beschreibung

- **Baue eine neue Komponente `MatchesByLeagueList`, die eine Liste von Spielpaarungen pro Liga anzeigt**
  - Die Komponente soll eine Liste bekommen. Ein Eintrag in der Liste (`MatchesByLeague`) enthält jeweils die 
    Liga (neu: `League`)und die Liste der zugehörigen Spielpaarungen (`Match`)
  - Die Komponente soll eine Überschrift sowie die übergebenen Paarungen gruppiert nach Liga anzeigen:
    - ```text  
         Meine Ligen <-- title
      
         Liga Name 1
             Spielpaarung 1  <-- MatchRow!
             Spielpaarung 2
         Liga Name 2
      
             Spielpaarung 1
             Spielpaarung 2
      ```
# Schritte

1. Erzeuge einen TypeScript-Typen für die Beschreibung einer Liga
  - Der Typ soll `League` heißen und in `src/types.ts` beschrieben und exportiert werden
    - Eine `League` hat zwei Attribute: `id` (String) und `name` (String) 
2. Definiere die Properties für die `MatchesByLeagueList`
  - Die Komponente `MatchesByLeagueList` soll zwei Properties entgegennehmen:
    - `matchesByLeagueList`: eine Liste von Objekten, die jeweils eine Liga (`League`) und den dazugehörigen Spielpaarungen bestehen
      - Dafür kannst dir (internen) ein "Hilfstypen" bauen: 
          - (`type MatchesByLeague = { league: League, matches: Match[] }` )
    - Einen - optionalen - Titel (`title`). Wenn dieser nicht gesetzt ist, soll der Titel auf "My Matches" gesetzt werden.
3. Implementiere die Komponente
  - Die Komponente soll den `title` anzeigen und darunter die Liste mit dem Ligen und Spielpaarungen. 
  - Für die "äußere" Liste (Ligen), iterierst du über die `matchesByLeagueList`. Jeder Eintrag darin soll dargestellt werden:
    - Den Namen der jeweiligen Liga (`league.name`)
    - Die Spielpaarungen (matches). Render hierzu jeweils eine Liste mit `MatchRow`-Komponenten
    - Denk' dran, dass du bei den Einträgen in den Listen das `key`-Property setzen musst.
      - Das `key`-Property ist automatisch an jeder React-Komponente vorhanden, du kannst es setzen und musst nichts weiter dafür tun.
      - Der Wert für das `key`-Property muss innerhalb der Liste eindeutig sein.
  - Wenn deine Komponente kein einzelnes Root-Element (z.B. ein `div` oder `section`) hat, kannst du ein React-Fragment verwenden
    - `return <><h1>Hallo</h1><h2>Welt</h2></>`
    - Doku zu Fragmenten s.u.
4. Aktualisiere die `App`-Komponente
    - In der `App`-Komponente sollen nicht mehr zwei `MatchRow`-Komponenten gerendert werden (kannst du entfernen)
    - Verwende stattdessen deine `MatchesByLeagueList`-Komponente
    - Damit du die Testdaten nicht selbst erzeugen musst, kannst du die Hilfsfunktion `generateDummyMatchItems` verwenden (`src/dummy-data.ts`). Dieser übergibst du eine Liste von Liga-Ids (gültige Werte: `bl1`, `bl2`, `bl3`, `dfb`, `ucl24` und `uel24`) und die Anzahl, wieviele Spielpaarungen pro Liga erzeugt werden sollen.
      - Die Funktion liefert dir dann eine Datenstruktur zurück, die du an `MatchesByLeagueList` übergeben kannst.
      - In der "echten" Anwendung würden wir diese Informationen vom einer API vom Server lesen.

# Material

- Rendering Lists in React: https://react.dev/learn/rendering-lists
- `key` property: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
- JavaScript `map`-Funktion an einem Array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- Single Root Element: https://react.dev/learn/writing-markup-with-jsx#1-return-a-single-root-element
    - Fragment Komponente: https://react.dev/reference/react/Fragment
