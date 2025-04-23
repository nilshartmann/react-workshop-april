# Daten Validieren mit zod

# Dateien

- src/types.ts
- src/components/App.tsx

# Schritte

- **Validiere die "MatchDays"-Daten mit `zod`
1. Definiere für `League` und `Match` entsprechende Schema-Objekte in zod
    - Kommentiere die bestehenden TypeScript-Typen von `League` und `Match` aus und beschreibe die identischen Strukturen mit zod
    - Erzeuge mit `type MeinType = z.infer<typeof MeinType>` die TypeScript-Typen aus dem Schema für `League` bzw. `Match`
      - Kannst du beim `Match` sicherstellen, dass die `homeGoals` und `awayGoals` jeweils eine Zahl ist, die größer gleich `0` ist (negative Tore gibt's nicht)
    - Exportiere die beiden Schema-Beschreibungen und die beiden TypeScript-Typen
    - Wenn die Typen korrekt sind, sollte die Anwendung weiterhin kompilieren 
      - Um das zu prüfen, am besten `App.tsx` und `MatchesByLeagueList.tsx` im Editor aufmachen und sicherstellen, das keine TypeScript-Fehler angezeigt werden
2. Definiere ein zod-Schema (`GetMyMatchDaysResponse`) für das Ergebnis des `my-matchdays` API-Aufrufs
    - Der Endpunkt liefert ein Array zurück
    - Jedes Element in dem Array ist ein Objekt bestehend aus: `league` und `matches`
3. Verwende das `GetMyMatchDaysResponse` um nach dem Lesen der Daten in der `queryFn` in `App.tsx` die gelesenen Daten zu validieren
    - Achtung! Wir zeigen mögliche Fehler zur Laufzeit (noch) nicht an. Öffne die Konsole und stelle sicher, dass dort nach einem Netzwerkrequest keine Fehler angezeigt werden
    - Um ein fehlerhaftes Ergebnis zu simulieren, kannst du an die Query-URL den Search Param `?fail` hinzufügen

# Material

- zod: https://zod.dev/
  - basic usage: https://zod.dev/?id=basic-usage
  - strings (with constraints): https://zod.dev/?id=strings
  - define objects: https://zod.dev/?id=objects
  - parse function: https://zod.dev/?id=parse