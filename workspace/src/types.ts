export type Match = {
  id: string;

  matchDay: string;

  homeTeam: string;
  awayTeam: string;

  homeGoals: number;
  awayGoals: number;
};

export type League = {
  id: string;
  name: string;
};

// interface IMatch {
//   id: string,
//
//   matchDay: string,
//
//   homeTeam: string,
//   awayTeam: string,
//
//   homeGoals: number,
//   awayGoals: number
// }


export type MatchesByLeague = {
  league: League,
  matches: Match[]
}