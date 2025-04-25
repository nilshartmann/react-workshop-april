import { z } from "zod";

// export type Match = {
//   id: string;
//
//   matchDay: string;
//
//   homeTeam: string;
//   awayTeam: string;
//
//   homeGoals: number;
//   awayGoals: number;
// };

const Match = z.object({
  id: z.string(),
  matchDay: z.string(),
  homeTeam: z.string(),
  awayTeam: z.string(),
  homeGoals: z.number().min(0),
  awayGoals: z.number().min(0),
});
export type Match = z.infer<typeof Match>

// export type League = {
//   id: string;
//   name: string;
// };

export const League = z.object({
  id: z.string(),
  name: z.string()
});

export type League = z.infer<typeof League>
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

// export type MatchesByLeague = {
//   league: League,
//   matches: Match[]
// }

export const MatchesByLeague = z.object({
  league: League,
  matches: Match.array()
})

export type MatchesByLeague = z.infer<typeof MatchesByLeague>

