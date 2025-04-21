const { writeFileSync } = require("node:fs");

const __ALL_MATCHDAYS = [];
const __ALL_EVENTS = [];

const IDS = new Set();

const cleanLeagueName = (n) =>
  n.replaceAll("2024/25", "").replaceAll("2024/2025", "").trim();

async function downloadMatchday(path) {
  const url = `https://api.openligadb.de/getmatchdata/${path}`;
  console.log("Downloading ", url);
  const response = await fetch(url);
  const matches = await response.json();
  const id = String(matches[0].matchID);
  if (IDS.has(id)) {
    throw new Error(`ID '${id} already found`);
  }
  IDS.add(id);

  let matchDayDateTime = null;

  const matchDay = {
    id,
    leagueName: cleanLeagueName(matches[0].leagueName),
    leagueId: matches[0].leagueShortcut,

    title: matches[0].group.groupName,

    matches: matches.map((m) => {
      let endergebnis = m.matchResults.find(
        (r) => r.resultName === "Endergebnis",
      );
      if (!endergebnis) {
        console.warn(
          "Kein Endergebnis in path, Match ",
          m.matchID,
          m.team1.teamName,
          m.team2.teamName,
        );
        endergebnis = {
          pointsTeam1: 0,
          pointsTeam2: 0,
        };
      }

      const match = {
        id: String(m.matchID),
        matchDateTime: m.matchDateTime,
        homeTeam: m.team1.teamName,
        awayTeam: m.team2.teamName,
        homeGoals: endergebnis.pointsTeam1,
        awayGoals: endergebnis.pointsTeam2,
      };

      if (matchDayDateTime === null || matchDayDateTime > m.matchDateTime) {
        // assuming, "oldest" match is the "dateTime" of this matchday
        matchDayDateTime = m.matchDateTime;
      }

      return match;
    }),
  };
  matchDay.dateTime = matchDayDateTime;
  __ALL_MATCHDAYS.push(matchDay);

  matches.forEach((match) => {
    match.goals.forEach((g) => {
      if (!g.matchMinute || !g.goalGetterName) {
        return;
      }
      const runningMatch = {
        homeTeam: match.team1.teamName,
        awayTeam: match.team2.teamName,
        id: String(match.matchID),
        matchDay: match.group.groupName,
      };
      const goal = {
        id: String(g.goalID),

        homeGoals: g.scoreTeam1,
        awayGoals: g.scoreTeam2,
        matchMinute: g.matchMinute,
        goalGetterName: g.goalGetterName,
      };
      const event = {
        league: {
          name: cleanLeagueName(match.leagueName),
          id: match.leagueShortcut,
        },
        runningMatch,
        goal,
      };
      __ALL_EVENTS.push(event);
    });
  });
}

async function downloadMatchdays(league, days) {
  for (let i = 1; i <= days; i++) {
    console.log("Download ", league, i);
    await downloadMatchday(`${league}/${i}`);
  }
}

(async function main() {
  // https://api.openligadb.de/getmatchdata/ucl24/2024/13
  await downloadMatchdays("bl1/2024", 29);
  await downloadMatchdays("bl2/2024", 29);
  await downloadMatchdays("bl3/2024", 33);
  await downloadMatchdays("dfb/2024", 5);
  await downloadMatchdays("ucl24/2024", 13);
  await downloadMatchdays("uel24/2024", 13);
  writeFileSync(
    "matchdays.json",
    JSON.stringify(__ALL_MATCHDAYS, null, 2),
    "utf8",
  );
  writeFileSync("events.json", JSON.stringify(__ALL_EVENTS, null, 2), "utf8");
})();

// /bl1/2024/29

// https://api.openligadb.de/getmatchdata/bl1/2024/29
