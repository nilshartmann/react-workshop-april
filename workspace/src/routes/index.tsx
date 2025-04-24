import { createFileRoute, Link } from "@tanstack/react-router";
import {useQueryErrorResetBoundary, useSuspenseQuery} from "@tanstack/react-query";
import ky from "ky";
import { MatchesByLeague } from "../types.ts";
import MatchesByLeagueList from "../components/MatchesByLeagueList.tsx";
import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import {Suspense} from "react";
import LoadingIndicator from "../components/LoadingIndicator.tsx";

export const Route = createFileRoute('/')({
  component: IndexRouteComponent,
  //  Fehlerbehandlung mit TS Router
  errorComponent: () => <h1>Fehler!</h1>,
  pendingComponent: () => <h1>Bitte warten</h1>,
  loader({context}) {
    console.log("LOADER!")
    // context.queryClient.ensureQueryData({
    //   queryKey: ["users", "1", "settings"],
    //   async queryFn() {
    //     const response = await ky.get("http://localhost:7100/api/users/" + 1  + "/my-matchdays?slowdown=" + 2000)
    //       .json();
    //     return MatchesByLeague.array().parse(response)
    //   }
    // })
    // context.queryClient.ensureQueryData({
    //   queryKey: ["users", "1", "settings"],
    //   async queryFn() {
    //     const response = await ky.get("http://localhost:7100/api/users/" + 1  + "/my-matchdays?slowdown=" + 2000)
    //       .json();
    //     return MatchesByLeague.array().parse(response)
    //   }
    // })
  }
})

function MyErrorFallback(props: FallbackProps) {
  return (
    <div>
      <h1>Error!</h1>
      {props.error.toString()}
      <button onClick={() => props.resetErrorBoundary()}>Retry!</button>
    </div>
  );
}



function IndexRouteComponent() {
  const { reset } = useQueryErrorResetBoundary();

  return <ErrorBoundary
    onReset={reset}
    FallbackComponent={MyErrorFallback}>
    <h1>ÜBERSCHRIFT !!!</h1>
    {/*Suspense-Boundary verschieben, um unterschiedliche Lade/Warte-Use-Cases*/}
    {/*umzusetzen*/}
    <Suspense fallback={<LoadingIndicator />}>
      <IndexRouteComponentInternal userId={"2"} />
      <IndexRouteComponentInternal userId={"1"} />
    </Suspense>

    <h1>ICH BIN UNTEN</h1>
  </ErrorBoundary>
}

type IndexRouteComponentInternalProps = {
  userId: string;
}

function IndexRouteComponentInternal({userId}: IndexRouteComponentInternalProps) {
  console.log("HALLO ROUTE!", userId)
  // http://localhost:7100/api/users/1/my-matchdays
  const result = useSuspenseQuery({
    queryKey: ["users", userId, "settings"],
    async queryFn() {
      const response = await ky.get("http://localhost:7100/api/users/" + userId  + "/my-matchdays?slowdown=" + parseInt(userId)*2000)
        .json();
      return MatchesByLeague.array().parse(response)
    }
  })

  console.log("NACH LOADING!", userId)


  return <>
    <Link to={"/settings"}>Settings</Link>
    <Link to={"/user/$name"} params={{
      name: "Susi"
    }}>Hello User!</Link>
    <MatchesByLeagueList matchesByLeagueList={result.data} />
    </>
}
