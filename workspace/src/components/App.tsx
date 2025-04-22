import MatchRow from "./MatchRow.tsx";
import { Match } from "../types.ts";
import { Matches } from "@tanstack/react-router";
import MatchesByLeagueList from "./MatchesByLeagueList.tsx";
import { generateDummyMatchItems } from "../dummy-data.ts";

const ersterSpielTag: Match = {
  id: "m1",
  matchDay: "1.",
  homeTeam: "altona", awayTeam: "Düsseldorf",
  homeGoals: 1, awayGoals: 0
}


const zweiterSpielTag: Match = {
  id: "m2",
  matchDay: "2.",
  homeTeam: "dortmund", awayTeam: "duisburg",
  homeGoals: 0, awayGoals: 2
}

const allMatches = [
  {league: {id: "1", name: "1. BL"}, matches: [ersterSpielTag, zweiterSpielTag]},
  {league: {id: "2", name: "2. BL"}, matches: []}
]

const leagues = generateDummyMatchItems(["bl1", "bl2"], 4);

export default function App() {
  return (
    <div className={"container mx-auto pt-8"}>
      {/*<MatchRow match={ersterSpielTag}/>*/}
      {/*<MatchRow match={zweiterSpielTag}/>*/}
      <MatchesByLeagueList matchesByLeagueList={leagues} />
    </div>
  );
}
