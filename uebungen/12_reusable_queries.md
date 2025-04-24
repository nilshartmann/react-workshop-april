# Wiederkehrende Queries

- Wir wollen sowohl auf der Dashboard als auch auf der Seite mit den Settings die User-Daten laden
- Dabei wollen wir zwei TS Query Features nutzen:
  - zur Laufzeit den Cache, damit die Daten nicht mehrfach geladen werden
  - zur Entwicklungszeit wollen wir Code wiederverwenden, damit wir den Query nicht mehrfach beschreiben müssen

# Dateien

- src/types.ts
- src/user-queries.ts (neu!)
- src/components/SettingsForm.tsx
- src/routes/index.tsx
- src/routes/settings.tsx

# Schritte

1. Definiere ein zod-Schema für das Ergebnis des User API-Calls
    - Der Endpunkt ist http://localhost:7100/api/users/1
      - Im "echten" Leben wäre die "1" z.B. die Id des eingeloggten Benutzers
    - Der Endpunkt liefert ein Objekt zurück, das aus vier Eigenschaften besteht:
      - `id` (string)
      - `name` (string)
      - `leagueIds` (string array)
      - `matchesPerLeage` (number)
      - Definiere dafür ein zod-Schema in `src/types.ts`
2. Implementiere die Query-Options zum Laden der User-Daten
    - Lege eine neue Datei `src/user-queries.ts` an
    - Lege darin die Funktion `getUserSettingsOptions`-Funktion an
    - Beschreibe darin mit der Funktion `queryOptions` die Informationen des Queries und gib diese zurück
      - `queryOptions` nimmt (fast) dieselben Parameter wie `useSuspenseQuery` entgegen
      - In unserem Fall musst du `queryKey` und `queryFn` angeben (wie bei `useSuspenseQuery`)
        - Der `queryKey` sollte mit `users`beginnen, z.B. `['users', '1', 'settings' ]
        - In der `queryFn` musst die Daten vom o.g. Endpunkt laden, mit Zod validieren und zurückgeben
3. Lade die User-Daten auf der Root-Seite ("Dashboard")
    - Lade mit `useSuspenseQuery` in `routes/index.tsx` die Daten für den Benutzer
      - Du kannst an `useSuspenseQuery` den Rückgabewert deiner `getUserSettingsOptions`-Funktion übergeben:
        - `useSuspenseQuery(getUserSettingsOptions("1"))`
    - Zeige auf der Root-Seite den `name` aus den geladenen Daten an
4. Erweitere die `SettingsForm`
    - Das Formular soll mit den geladenen Daten vorbelegbar sein
    - Beschreibe ein Properties-Objekt für die `SettingsForm`. Du brauchst für jeden State ein eigenes Property mit dem jeweiligen initial Wert (z.b. `initialName`, `initialMatchesPerLeague` und initialLeagueIds`).
    - Initialisiere den State mit den Werten aus den Properties vor
      - z.B. `const [name, setName] = useState(initialName)` statt `const [name, setName] = useState("")`
5. Lade die User-Daten in der `settings`-Route
    - Verwende dazu analog wie in Schritt 3 auf dem Dashboard einen `useSuspenseQuery` mit den Query-Options für User-Id "1".
    - Übergib die geladenen Daten als Properties an die `SettingsForm`
6. Du kannst jetzt zwischen `/` und `/settings` navigieren und die Daten sollten jeweils aktuell sein
    - Analysiere im Netzwerk-Tab deines Browsers wann welche Requests ausgeführt werden
    - Was passiert, wenn du die Queries mit `?slowdown=3000` verlangsamst?
 
# Material
- `queryOptions`-Funktion: https://tanstack.com/query/latest/docs/framework/react/guides/query-options
- 