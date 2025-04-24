import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import { MatchesByLeague } from "../types.ts";
import MatchesByLeagueList from "../components/MatchesByLeagueList.tsx";

export const Route = createFileRoute('/')({
  component: IndexRouteComponent,
})

function IndexRouteComponent() {
  // http://localhost:7100/api/users/1/my-matchdays
  const result = useSuspenseQuery({
    queryKey: ["users", "1", "settings"],
    async queryFn() {
      const response = await ky.get("http://localhost:7100/api/users/1/my-matchdays")
        .json();
      return MatchesByLeague.array().parse(response)
    }
  })
  return <>
    <Link to={"/settings"}>Settings</Link>
    <Link to={"/user/$name"} params={{
      name: "Susi"
    }}>Hello User!</Link>
    <MatchesByLeagueList matchesByLeagueList={result.data} />
    </>
}
