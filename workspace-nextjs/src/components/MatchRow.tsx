import { Match } from "../types.ts";
// Properties

// <MatchRow matchDay="1. Spieltag" homeTeam="Altona 93" />
//

// props:
// { matchDay: "1. Spieltag", homeTeam: "Altona 93" }

// <MatchRow
//  match={
//    {matchDay: "1. Spieltag", homeTeam: "Altona 93" }
//    }
//    />

// Co-Location

type MatchRowProps = {
  match: Match;
};

// export default function MatchRow(props: MatchRowProps) {
//                                    v Destrukurierung
// export default function MatchRow({ match }: {
//   match: Match;
// }) {
// export default function MatchRow({ match }: {
//   match: Match;
// }) {

// pure function

export default function MatchRow({ match }: MatchRowProps) {
  const homeTeamClassName =
    match.homeGoals > match.awayGoals ? "font-bold" : "";

  const awayTeamClassName =
    match.homeGoals < match.awayGoals ? "font-bold" : "";

  console.log(match);

  // class -> className
  // for -> htmlFor
  //

  return (
    <div className={"MatchRow"}>
      <div>{match.matchDay}</div>
      <div>
        <span className={homeTeamClassName}>{match.homeTeam}</span> -{" "}
        <span className={awayTeamClassName}>{match.awayTeam}</span>
      </div>
      <div>
        {match.homeGoals} - {match.awayGoals}
      </div>
    </div>
  );
}
