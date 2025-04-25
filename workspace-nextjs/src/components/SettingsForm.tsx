"use client";
import {useEffect, useState, useTransition} from "react";
import {useWindowTitle} from "@/components/use-window-title";
import MultiSelect from "@/components/MultiSelect";
import {__dummy_leagues, generateDummyMatchItems} from "@/dummy-data";
import MatchesByLeagueList from "@/components/MatchesByLeagueList";
import {saveUser} from "@/components/settings-form.actions";
import Link from "next/link";
import {useRouter} from "next/navigation";

// "Rules of React": https://react.dev/reference/rules
// "Rules of Hook": https://react.dev/reference/rules#rules-of-hooks

// Presentation Components
// Controller Components

// Virtual DOM
// 1. Render Phase => Virtual DOM, keine Seiteneffekt
// 2. Commit Phase => Virtual DOM => in den richtigem DOM überführt
//
// 1. "Susi Müller!"  |  setName
// 2. 2  | setMatchesPerLeague

type SettingsFormProps = {
  userId: string;
  initialName?: string;
  initialMatchesPerLeague?: number;
  initialLeagueIds?: string[];

}

export default function SettingsForm({
    userId,
     initialName = "",
     initialLeagueIds = [],
     initialMatchesPerLeague = 2,

   }: SettingsFormProps) {

  // console.log(new Date().toLocaleTimeString());

  // State / Zustand (Model)
  // const state = useState("");
  // const name = state[0];
  // const setName = state[1];

  // Hook-Funktionen
  //

  // DIESE KOMPONENTE VERWENDET ZUSTAND UND EVENT LISTENER
  // UND MUSS DESHALB EINE "CLIENT COMPONENT" SEIN
  // (s. "use client" am Beginn der Datei)

  const [name, setName] = useState<string>(initialName);
  const [ matchesPerLeague, setMatchesPerLeague ] = useState<number>(initialMatchesPerLeague);
  const [leagueIds, setLeagueIds] = useState<string[]>(initialLeagueIds);
  const [transition, startTransition] = useTransition();
  const router = useRouter();
  useWindowTitle(`${name}'s Settings`)

  const handleMatchesPerLeagueChange = (newValue: string) => {


    const nv = parseInt(newValue, 10);
    if (nv >= 0 && nv <= 20) {
      setMatchesPerLeague(nv);
    }
  }



  const handleSave = () => {
    // saveUser ist eine "Server Function" (oder auch "Server Action")
    //  von React.
    //
    //  Serverseitig stellt Next.js dazu einen "internen" HTTP
    //  Endpunkt zur Verfügung, den wir hier aufrufen können
    //  (s. settings-form.actions.ts)
    //  Das ist eine Art Remote-Procedure-Call (RPC)

    // Mit 'useTransition' (s.o.) können tracken und prüfen,
    //  ob der Server Request gerade ausgeführt wird, um
    //  z.B. den Save Button in der Zeit zu disablen
    //  'useTransition' könnt ihr auch ohne Next.js verwenden,
    //  das ist ein "reiner" React Hook

    startTransition( async () => {
      await saveUser(
        userId,
        name,
        matchesPerLeague,
        leagueIds
      );

      // Nach dem Speichern zur Home-Page
      router.push("/");
    })

    console.log(name, matchesPerLeague);
    // saveSettingsMutation.mutate();
  }

  const nameLength = name.length;

  const title = `${name}'s Leagues`;
  // const title = name + "' Leagues;"




  return (
    <div>
      {/*<title>Setting</title>*/}
      <form className={"SettingsForm"}>
        <label>Name</label>
        <input
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Matches per League</label>
        <input
          type={"number"}
          value={matchesPerLeague}
          onChange={(e) => handleMatchesPerLeagueChange(e.target.value)}
        />

        <MultiSelect
          options={__dummy_leagues}
          selectedIds={leagueIds}
          onSelectionChange={newLeagueIds => setLeagueIds(newLeagueIds)}
        />

      </form>
      <button
        onClick={() => handleSave()}
        type="button">
        Save
      </button>

      {transition && <p>Please Wait!</p>}

      {/*{saveSettingsMutation.isPending && <p>Please Wait!</p>}*/}
      {/*{saveSettingsMutation.isSuccess && <p>Daten gespeichert!</p>}*/}
      {/*{saveSettingsMutation.isError && <p>Saving failed {String(saveSettingsMutation.error)}</p>}*/}

      <MatchesByLeagueList
        title={title}
        matchesByLeagueList={
        generateDummyMatchItems(leagueIds, matchesPerLeague)
        } />

    </div>
  );
}