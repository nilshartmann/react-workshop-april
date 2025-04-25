// Können wir später vom Server lesen
export const __dummy_leagues: Array<{ id: string; name: string }> = [
  { id: "bl1", name: "1. Fußball-Bundesliga" },
  { id: "bl2", name: "2. Fußball-Bundesliga" },
  { id: "bl3", name: "3. Fußball-Bundesliga" },
  { id: "dfb", name: "DFB-Pokal" },
  { id: "ucl24", name: "UEFA Champions League" },
  { id: "uel24", name: "UEFA Europa League" },
];

const dummyMatchdayNames: Record<string, string> = {
  bl1: "21. Spieltag",
  bl2: "17. Spieltag",
  bl3: "9. Spieltag",
  dfb: "Achtelfinale",
  ucl24: "CL (Viertelfinale, Hinspiele)",
  uel24: "Europa League (Finale)",
};

/**
 * Erzeut ein paar "Dummy Matches" for die angegebenen Ligen.
 *
 * - Das Ergebnis entspricht dem API-Aufruf von "/api/my-matches"
 * - Wir verwenden diese Funktion um im Settings-Formular eine
 *   "Live Preview" der getätigten Einstellungen zu machen.
 * - Im "echten" Leben könnte man an der Stelle natürlich auch einen
 *   echten API-Call machen. Diese Funktion soll uns die Arbeit
 *   während der Schritt-für-Schritt-Entwicklung der Anwendung
 *   erleichtern, wenn wir uns noch nicht mit Server-Calls
 *   beschäftigt haben.
 */
export function generateDummyMatchItems(
  leagueIds: string[],
  matchesPerLeague: number,
) {
  return __dummy_leagues
    .filter((league) => leagueIds.includes(league.id))
    .map((l) => ({
      league: l,
      matches: Array(matchesPerLeague)
        .fill(null)
        .map((_, ix) => ({
          id: `m_${ix}`,
          matchDay: dummyMatchdayNames[l.id],
          matchDateTime: "25-04-13T17:30:00",
          homeTeam: "Altona 93",
          awayTeam: "Tura Harksheide",
          homeGoals: (ix + 1) % 2,
          awayGoals: (ix + 1) % 3,
        })),
    }));
}
