import { useState } from "react";
import MatchesByLeagueList from "./MatchesByLeagueList.tsx";
import { __dummy_leagues, generateDummyMatchItems } from "../dummy-data.ts";
import MultiSelect from "./MultiSelect.tsx";

export default function SettingsForm() {

  // console.log(new Date().toLocaleTimeString());

  // State / Zustand (Model)
  // const state = useState("");
  // const name = state[0];
  // const setName = state[1];

  const [ name, setName ] = useState<string>("Susi Müller");
  const [ matchesPerLeague, setMatchesPerLeague ] = useState<number>(2);
  const [leagueIds, setLeagueIds] = useState<string[]>([]);


  const handleMatchesPerLeagueChange = (newValue: string) => {


    const nv = parseInt(newValue, 10);
    if (nv >= 0) {
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