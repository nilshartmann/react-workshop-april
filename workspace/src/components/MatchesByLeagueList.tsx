import { League, Match } from "../types.ts";
import MatchRow from "./MatchRow.tsx";
import { Fragment } from "react";

// const beispiel = [
//   {league: "1. BL", matches: []},
//   {league: "2. BL", matches: []}
// ]

type MatchesByLeague = {
  league: League,
  matches: Match[]
}

type MatchesByLeagueListProps = {
  title?: string;
   matchesByLeagueList: MatchesByLeague[]
}

export default function MatchesByLeagueList(
  { title = "My Matches",
    matchesByLeagueList
  }: MatchesByLeagueListProps) {
  return <div>
    <h1 className={"PageTitle"}>{title}</h1>
    {matchesByLeagueList.map( ml => {
      return (
        <Fragment key={ml.league.id}>
          <h2 >{ml.league.name}</h2>
          {ml.matches.map(m => {
            return <MatchRow key={m.id} match={m} />
          })}
        </Fragment>
        )
    })}
  </div>
}

// function Titel() {
//   return <><h1>Hallo</h1><h2>Welt</h2></>
// }