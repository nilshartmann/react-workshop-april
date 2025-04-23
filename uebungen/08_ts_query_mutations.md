# Speichern von Daten mit TanStack Query

- Wir sehen uns das Thema "Server Zugriffe" aus React-Anwendungen in mehreren Teilen an. Los geht's hier mit dem Speichern der User Settings in der `UserSettingsForm`-Komponente

# Dateien

- src/main.tsx
- src/components/SettingsForm.tsx

# Vorbereitung: Starte das Backend

- Für die folgenden Übungen muss das REST Backend gestartet werden.
- Falls du es noch nicht gestartet hast:
    - Gehe in das `backend` Verzeichnis
    - Führe dort `pnpm install` aus
    - Führe dort `npm start` aus
- Das Backend läuft auf Port 7100
    - Die verfügbaren Endpunkte werden beim Starten auf der Konsole ausgegeben.
    - Zum Testen kannst du einen der GET-Endpunkte z.B. im Browser öffnen (oder per curl, wget etc.)

# Schritte

1. Binde zunächst den `QueryClient` von TanStack Query ein (`src/main.tsx`)
    - Der Client muss beim Starten der Anwendung erzeugt und gesetzt werden. Er enthält unter anderem den zentralen Cache
    - Die Konfiguration des Clients ist bereits in der DAtei
      `create-query-client.ts` fertig (optimiert für unseren Workshop nicht 1:1 ins "echte" Projekt übernehmen)
    - Rufe in `src/main.tsx` die Funktion `createQueryClient` aus `create-query-client.ts` auf
        - Baue um die `App`-Komponente den `QueryClientProvider` von TanStack Query und übergib den erzeugten
          `QueryClient`:
            - ```tsx
              const queryClient = createQueryClient();
              createRoot(rootElement).render(
                  <div className={"container mx-auto pt-8"}>
                      <QueryClientProvider client={queryClient}>
                        <App />
                      </QueryClientProvider>
                    </div>,
                );
            ```
2. Implementiere in der `SettingsForm` die Mutation zum Speichern der Settings
    - Der Endpunkt lautet "http://localhost:7100/api/users/1"
        - Wir verwenden der einfachheithalber immer User-Id
          `1`. In einer echten Anwendung würde man das natürlich anders lösen
    - Da der Benutzer im Backend schon vorhanden ist, musst du einen `PUT` Request absetzen
      - Dazu kannst du `fetch` oder die Bibliothek `ky` verwenden (im Workspace installiert)
    - Als JSON-Payload musst du ein Objekt übertragen, das die folgenden Felder enthält:
        - `name` (string)
        - `matchesPerLeague` (number)
        - `leagueIds` (string[])
        - ...also genau die Werte, wie sie in unserem Formular im State stehen 🙂
3. Führe die Mutation beim Speichern aus
    - Wenn auf den Speichern-Button gedrückt wird, soll die Mutation ausgeführt werden
    - Solange wir die gespeicherten Daten noch nicht in der Anwendung anzeigen, hast du zwei Möglichkeiten, zu prüfen, ob der Request funktioniert hat:
      - Im Netzwerk-Tab des Browsers. Der Request gibt als Antwort die gespeicherten Settings zurück
      - Die Backend API im Browser/im Terminal mit GET-Request aufrufen: "http://localhost:7100/api/users/1"
4. **Optional**: Baue Feedback ein, z.B.
    - Wenn die Mutation fehlschlägt, zeige eine Fehlermeldung an (wenn du das `name`-Feld leer lässt, gibt das Backend einen Fehler zurück)
    - Wenn die Mutation erfolgreich war, zeige eine entsprechende Meldung an
    - Während die Mutation läuft, zeige an, dass die Mutation ausgeführt wird. Disable in dieser Zeit den Speichern-Button. Um den Request künstlich zu verzögern, kannst du den `slowdown=TIME_IN_MS` Search Parameter an die Url hängen

# Material

- ky library for data fetching: https://github.com/sindresorhus/ky
- Tanstack Query: https://tanstack.com/query/latest/docs/framework/react/overview
  - Mutations: https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  - useMutation: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation#usemutation
  - Query Client: https://tanstack.com/query/latest/docs/reference/QueryClient
    - Auch wichtig: die Default-Einstellung des Query Clients: https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults
    - Achtung! Im Workspace sind andere Defaults gesetzt (s. `create-query-client.ts`)

