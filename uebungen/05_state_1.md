# Zustand von React-Komponenten (Teil 1)

* **Baue die erste Version eines Editors für User-Settings**

# Dateien

- src/components/SettingsForm.tsx (anlegen)
- src/components/App.tsx

# Schritte

1. Lege eine neue Komponente `SettingsForm` in der neuen Datei `src/components/SettingsForm.tsx` an
    - Mit der Komponente sollen Benutzer-Settings bearbeitet werden.
        - Es gibt drei Daten, die wir bearbeiten:
            - Benutzername (`name`)
            - Anzahl Spiele pro Liga auf dem persönlichen "Dashboard" (`matchesPerLeague`)
            - *erst in der nächsten Version:* Ligen, die auf dem persönlichen Dashboard angezeigt werden sollen (
              `leagueIds`)
   - Render die `SettingsForm`-Komponente in der `App`-Komponente
     - Die bisherige `MatchesByLeaugeList`-Komponente kannst du dort entfernen oder auskommentieren
2. Erzeuge Zustand für `name` und `matchesPerLeague`
    - Der `name` soll initial leer String (leerer String)
    - `matchesPerLeague` soll initial `2` sein
3. Erstelle ein Formualr mit zwei `input`-Felder vom Typ `text` bzw. `number` für die beiden Daten
    - Verbinde die Eingabefelder mit deinem State durch den `onChange`-Event-Listener bzw. das
      `change`-Property für den aktuellen Wert
4. Füge einen Button zum Speichern hinzu
    - Wenn auf den Button geklickt wird, sollen die aktuellen Werte der Eingabefelder auf der Konsole (
      `console.log`) ausgegeben werden
        - Das "richtige" Speichern auf dem Server machen wir später
5. Baue die Vorschau
    - Unter dem Formular soll es eine Vorschau geben, mit der man sieht, wie sich die Änderungen auswirken
    - Render dazu unter dem Formular deine `MatchesByLeagueList`-Komponente
        - Verwende als `title`-Property einen String, in dem der aktuelle `name` aus dem Formular vorkommt
        - Wie in der vorherigen Übung kannst du dir Dummy-Daten mit `generateDummyMatchItems` erzeugen lassen
            - Verwende für den Paramter `matchesPerLeague` den aktuellen Wert aus dem State deines Formulars
            - Für
              `leagueIds` gib einen festen Wert an (z.B. `["bl1", "bl2"]). Richtig machen wir das im nächsten Schritt
6. **Optional**: Baue Validierung ein, zum Beispiel:
    - Wenn der Name küzer als fünf Zeichen ist, gib eine Fehlermeldung aus
    - Sorge dafür, dass keine negativen Werte für `matchesPerLeague` ausgewählt werden können
    - Stelle den Speichern-Button auf `disabled`, solange das Formular ungültige Werte enthält

# Material

* React State: https://react.dev/learn/state-a-components-memory
    * besonders:https://react.dev/learn/state-a-components-memory#adding-a-state-variable
* useState: https://react.dev/reference/react/useState
* Event Handler: https://react.dev/learn/responding-to-events#adding-event-handlers
* Properties von HTML-Elementen (eingebaute Browser Komponenten): https://react.dev/reference/react-dom/components/common
* Conditionally rendering: https://react.dev/learn/conditional-rendering#conditionally-including-jsx
    
