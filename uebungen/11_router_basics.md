# Erstelle einige Routen für unsere Anwendung

Im diesem Schritt wollen wir zwei Routen zur Anwendung hinzufügen:

- `/` soll auf das "Dashboard" zeigen (`MatchesByLeagueList`)
- `/settings` soll die `SettingsForm` öffnen

# Dateien

- src/main.tsx
- src/routes/index.tsx (anlegen)
- src/routes/settings.tsx (anlegen)

### Hinweise zum Datei-basierten Routing mit dem TanStack Router

- Wir arbeiten jetzt (auch) im Verzeichnis `routes`!
- _Alle_ Dateien im Verzeichnis
  `routes` (und darunter) werden vom TanStack Router als Routen-Dateien interpretiert. Wenn du dort eine Datei erstellst, ist sie automatisch eine Route!
    - Um Dateien oder Verzeichnisse von der Routen-Interpretation auszuschließen, wähle einen Namen, der mit
      `-` beginnt (`-Title.tsx` oder `-components/`)
- Wenn du eine neue (Routen-)Datei im Verzeichnis
  `routes` erstellst, generiert das Router-Plugin im Entwicklungsserver automatisch eine Grundkonfiguration für diese Route in der Datei.
    - Es kann ein paar Augenblicke dauern, bis deine IDE/Editor die Änderungen erkennt.
    - In IntelliJ kannst du die erstellte Datei neu laden, um sicherzustellen, dass die vom Plugin vorgenommenen Änderungen übernommen wurden. Verwende dazu das Kontextmenü im Projekt-Explorer und wähle
      `Reload from disc` (oder `File -> Reload all from disc`)
- Weitere Informationen zu den Konventionen der dateibasierten Navigation findest du in der Doku: https://tanstack.com/router/v1/docs/framework/react/routing/file-based-routing

# Schritte

1. Konfiguriere den Router
    - Beim Start der Anwendung müssen dem Router die Routen bekannt gemacht werden.
    - Die generierten Routen befinden sich in der Datei `src/routeTree.gen.ts` (diese Datei bitte
      _nicht_ manuell bearbeiten)
    - Um die Instanz unseres Routers zu erzeugen, füge folgenden Code in die `main.tsx`-Datei ein:
    - ```typescript
        
        import { createRouter, RouterProvider } from "@tanstack/react-router";
        import { routeTree } from "./routeTree.gen.ts";
      
        // ...
        
        const queryClient = createQueryClient();
        
        const router = createRouter({
          routeTree,
          context: {
            queryClient,
          },
        });
        
        // Register the router instance for type safety
        declare module "@tanstack/react-router" {
          interface Register {
            router: typeof router;
          }
        }
        
        createRoot(rootElement).render(
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>,
        );

      ```
2. Erstelle die "Root-Route" `/` mit dem "Dashboard"
    - Füge eine neue Datei für die Route hinzu (`/src/routes/index.tsx`)
        - Warte, bis der Code-Generator die Grundkonfiguration für die Route in dieser Datei erstellt hat
        - (Möglicherweise musst du die Datei in deiner IDE neu laden, falls die Änderungen nicht automatisch erkannt werden, siehe oben)
        - Die erzeugte `RouteComponent` soll den Code-Code aus der `App.tsx`-Datei enthalten:
          - zum Laden der Matches
          - zur Darstellung der Matches mit `MatchesByLeagueList`
3. Erzeuge die Route für den Settings-Editor (`/settings`)
    - Erzeuge die neue Datei `src/routes/settings.tsx`
    - Warte bis das Router Plug-in den Boilerplate-Code erzeugt hat
    - Die `RouteComponent` soll die  `SettingsForm`-Komponente zurückliefern
4. Füge Links zwischen den beiden Routen hinzu
    - Die beiden Routen `/` und `/settings` sollen jeweils (oben oder unten) einen `Link` auf die jeweils andere Seite bekommen, so dass du durch die Anwendung navigieren kannst
    - Die `SettingsForm` wird dabei immer geleert 😢, darum kümmern wir uns später
    - Aber wenn alles richtig ist, sollte die Darstellung des Dashboards immer aktuell sein. D.h. wenn du Änderungen im `SettingsForm` machst, die Änderungen speicherst und dann per Link auf das Dashboard wechselst, sollten dort die korrekten Ligen und Spielpaarungen angezeigt werden. 
5. Die `App.tsx`-Datei kannst du jetzt löschen

# Reference

- TanStack Router: https://tanstack.com/router/latest/docs/framework/react/overview
    - Filebased routing: https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing
    - Navigation:
        - Links: https://tanstack.com/router/latest/docs/framework/react/guide/navigation#link-component
        - Link Component API: https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent
    - (Background: Vite plugin for code generation https://tanstack.com/router/latest/docs/framework/react/routing/installation-with-vite)
