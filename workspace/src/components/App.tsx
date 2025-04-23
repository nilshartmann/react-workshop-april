import MatchRow from "./MatchRow.tsx";
import { Match, MatchesByLeague } from "../types.ts";
import { Matches } from "@tanstack/react-router";
import MatchesByLeagueList from "./MatchesByLeagueList.tsx";
import { generateDummyMatchItems } from "../dummy-data.ts";
import SettingsForm from "./SettingsForm.tsx";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";

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

  // http://localhost:7100/api/users/1/my-matchdays
  const result = useSuspenseQuery({
    queryKey: ["users", "1", "settings"],
    async queryFn() {
      const response = await ky.get<MatchesByLeague[]>("http://localhost:7100/api/users/1/my-matchdays")
        .json();
      return response;
    }
  })

  return (
    <div className={"container mx-auto pt-8"}>
      {/*<MatchRow match={ersterSpielTag}/>*/}
      {/*<MatchRow match={zweiterSpielTag}/>*/}
      <MatchesByLeagueList matchesByLeagueList={result.data} />
      <SettingsForm />

    </div>
  );
}
