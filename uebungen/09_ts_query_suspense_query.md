# Laden von Daten mit TanStack Query

- Nächster Schritt beim Arbeiten mit serverseitigen Daten: Lesen von Daten!

# Dateien

- src/components/App.tsx
- src/components/SettingsForm.tsx

# Schritte

- **Lade in der `App`-Komponente die Daten für das "Dashboard" des Benutzers.**
    - Die Ligen und Spielpaarungen, die angezeigt werden sollen, werden auf dem Backend ermittelt
    - Sie sind abhängig von den Daten, die über die `SettingsForm` gespeichert werden
    - Wir werden Daten und Formular zunächst gemeinsam anzeigen, später teilen wir das auf verschiedene Ansichten auf
1. Verwende `useSuspenseQuery`, um die Daten für das "Dashboard" zu laden
    - Der Endpunkt ist `http://localhost:7100/api/users/1/my-matchdays`
    - Setze einen passenden `queryKey`
    - Verwende `fetch` oder `ky.get()` um die Daten in der `queryFn` zu lesen
    - Der Endpunkt liefert im JSON-Format eine Liste zurück.
      - Jeder Eintrag in der Liste ist ein Objekt mit zwei Eigenschaften:
        - `league` (TS Type `League`)
        - `matches` (TS Type `Match[]`)
      - Die gelieferten Daten kannst du also direkt an die `MatchesByLeagueList`-Komponente übergeben 🙂
2. Reaktivere in der `App`-Komponente die `MatchesByLeagueList`-Komponente, um die Daten anzuzeigen
   - Die `App`-Komponente soll jetzt beide Komponenten (`MatchesByLeagueList` und `SettingsForm`) untereinander darstellen
   - Wenn du die Settings änderst und speicherst, müsste sich die Darstellung in der `MatchesByLeagueList`-Komponente aktualisieren... oder nicht? 🤔
3. Refreshe die `my-matchdays`-Daten in der `SettingsForm`
    - Wenn die Daten in der `SettingsForm` gespeichert werden, weiß der Query Cache nicht, dass die Daten darin nun veraltet sind
    - Deswegen wird die Ansicht `MatchesByLeagueList` auch nicht angepasst
    - In der `onSuccess`-Callback-Funktion von `useMutation`, verwende `refetchQueries` vom `queryClient` um die Daten zu invalidieren
    - Du kannst `useQueryClient()` verwenden, um an die Instanz vom `queryClient` zu kommen.
      - Achtung! Wie alle Funktionen, die mit `use` anfangen (`useState`, `useMutation` etc.) ist auch `useQueryClient` eine Hook-Funktion. Dabei gibt es bestimmte Regeln bei der Verwendung (mehr dazu siehe in der Doku, die ich unten verlinkt habe)
    - Wenn das Invalideren korrekt funktioniert, sollte die Darstellung von `MatchesByLeagueList` nun automatisch aktualisiert werden, sobald du im Formular Änderungen vornimmst und speicherst.

# Material

- TanStack Query:
  - Suspense support: https://tanstack.com/query/latest/docs/framework/react/guides/suspense
  - useSuspenseQuery: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery#usesuspensequery
  - Query Function: https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
  - Query Key: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
  - Refetch Queries: https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientrefetchqueries
  - Invalidate Queries: https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation#query-matching-with-invalidatequeries
    - Dieser Ansatz würde alternativ zu "refetchQueries" funktionieren, dazu muss aber der Query Client anders konfiguriert werden. Können wir gerne besprechen.
  - useQueryClient: https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient#usequeryclient
- React:
  - "Rules of Hooks": https://react.dev/reference/rules/rules-of-hooks
  - Hintergrund: Hooks für wiederverwendbaren Code: https://react.dev/learn/reusing-logic-with-custom-hooks
    - Bei Interesse können wir uns das Thema (Custom Hooks) noch genauer ansehen



