import { useEffect, useState } from "react";
import MatchesByLeagueList from "./MatchesByLeagueList.tsx";
import { __dummy_leagues, generateDummyMatchItems } from "../dummy-data.ts";
import MultiSelect from "./MultiSelect.tsx";
import { useWindowTitle } from "./use-window-title.ts";

// "Rules of React": https://react.dev/reference/rules
// "Rules of Hook": https://react.dev/reference/rules#rules-of-hooks

// Virtual DOM
// 1. Render Phase => Virtual DOM, keine Seiteneffekt
// 2. Commit Phase => Virtual DOM => in den richtigem DOM überführt
//
// 1. "Susi Müller!"  |  setName
// 2. 2  | setMatchesPerLeague
export default function SettingsForm() {

  // console.log(new Date().toLocaleTimeString());

  // State / Zustand (Model)
  // const state = useState("");
  // const name = state[0];
  // const setName = state[1];

  // Hook-Funktionen
  //
  const [name, setName] = useState<string>("Susi Müller");
  const [ matchesPerLeague, setMatchesPerLeague ] = useState<number>(2);
  const [leagueIds, setLeagueIds] = useState<string[]>([]);
  useWindowTitle(`${name}'s Settings`)

  const handleMatchesPerLeagueChange = (newValue: string) => {


    const nv = parseInt(newValue, 10);
    if (nv >= 0 && nv <= 20) {
      setMatchesPerLeague(nv);
    }
  }

  const handleSave = () => {
    console.log(name, matchesPerLeague)
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
        disabled={name.length < 5}
        onClick={() => handleSave()}
        type="button">
        Save
      </button>

      <MatchesByLeagueList
        title={title}
        matchesByLeagueList={
        generateDummyMatchItems(leagueIds, matchesPerLeague)
        } />

    </div>
  );
}