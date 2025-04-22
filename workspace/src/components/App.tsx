import MatchRow from "./MatchRow.tsx";
import { Match } from "../types.ts";

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

export default function App() {
  return (
    <div className={"container mx-auto pt-8"}>
      <MatchRow match={ersterSpielTag}/>
      <MatchRow match={zweiterSpielTag}/>
    </div>
  );
}
