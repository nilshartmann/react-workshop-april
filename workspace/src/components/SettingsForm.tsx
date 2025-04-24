import { useEffect, useState } from "react";
import MatchesByLeagueList from "./MatchesByLeagueList.tsx";
import { __dummy_leagues, generateDummyMatchItems } from "../dummy-data.ts";
import MultiSelect from "./MultiSelect.tsx";
import { useWindowTitle } from "./use-window-title.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

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

type SettingFormProps = {
  onFormSaved?: (name: string) => void;
}

export default function SettingsForm({onFormSaved}:SettingFormProps) {

  // console.log(new Date().toLocaleTimeString());

  // State / Zustand (Model)
  // const state = useState("");
  // const name = state[0];
  // const setName = state[1];

  // Hook-Funktionen
  //
  const [name, setName] = useState<string>("Susi");
  const [ matchesPerLeague, setMatchesPerLeague ] = useState<number>(2);
  const [leagueIds, setLeagueIds] = useState<string[]>([]);
  useWindowTitle(`${name}'s Settings`)

  const handleMatchesPerLeagueChange = (newValue: string) => {
    const nv = parseInt(newValue, 10);
    if (nv >= 0 && nv <= 200) {
      setMatchesPerLeague(nv);
    }
  }

  const queryClient = useQueryClient();

  const saveSettingsMutation = useMutation({
    mutationFn() {
      return ky.put("http://localhost:7100/api/users/1?slowdown=1200", {
        json: {
          name: name,
          matchesPerLeague,
          leagueIds: leagueIds
        }
      }).json()
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ["users", "1"]
      })
    }
  })

  const handleSave = async () => {
    console.log(name, matchesPerLeague);
    await saveSettingsMutation.mutateAsync();
    if (onFormSaved) {
      onFormSaved(name);
    }
  }

  const nameLength = name.length;

  const title = `${name}'s Leagues`;
  // const title = name + "' Leagues;"




  return (
    <div>
      {/*<title>Setting</title>*/}
      <form className={"SettingsForm"}>
        <label htmlFor={"nameInput"}>Name</label>
        <div>
        <input
          id={"nameInput"}
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {name.length < 5 && <p>Please enter a name with at least 5 chars</p>}
        </div>
        <label htmlFor={"matchesPerLeagueInput"}>Matches per League</label>
        <input
          id={"matchesPerLeagueInput"}
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
        disabled={name.length<5}
        onClick={() => handleSave()}
        type="button">
        Save
      </button>

      {saveSettingsMutation.isPending && <p>Please Wait!</p>}
      {saveSettingsMutation.isSuccess && <p>Daten gespeichert!</p>}
      {saveSettingsMutation.isError && <p>Saving failed {String(saveSettingsMutation.error)}</p>}

      <MatchesByLeagueList
        title={title}
        matchesByLeagueList={
        generateDummyMatchItems(leagueIds, matchesPerLeague)
        } />

    </div>
  );
}