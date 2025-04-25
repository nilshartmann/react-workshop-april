import MatchesByLeagueList from "@/components/MatchesByLeagueList";
import ky from "ky";
import {MatchesByLeague} from "@/types";

export default async function Home() {

  const response = await ky
    .get("http://localhost:7100/api/users/1/my-matchdays?slowdown=2000")
    .json();
  const leagues = MatchesByLeague.array().parse(response)

  return (
    <div className={"container mx-auto pt-8"}>
      <MatchesByLeagueList matchesByLeagueList={leagues} />
    </div>
  );
}
