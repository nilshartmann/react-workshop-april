import { useState } from "react";

//
// 🧑‍💻 INTEGRIERE DIESE FERTIGE KOMPONENTE IN DEINE ANWENDUNG:
//
//   - Lege dazu die Datei src/componnents/MultiSelect.tsx an
//   - Render die Komponente in SettingsForm.tsx
//       - als 'options' kannst du `__dummy_leagues` aus `dummy-data.ts` übergeben
//         (Das ist eine Liste mit auswählbaren Ligen)
//

type SelectOption = {
  // Diese Struktur passt "zufällig" zu einer Liga von uns :-)
  id: string;
  name: string;
};
type MultiSelectProps = {
  options: SelectOption[];

  selectedIds: string[],
  // function onSelectionChange(newSelectedIds:string[]) {}
  onSelectionChange(newSelectedIds:string[]): void
};

export default function MultiSelect({ options, selectedIds, onSelectionChange }: MultiSelectProps) {

  const handleSelect = (optionId: string) => {
    const newSelectedIds = selectedIds.includes(optionId)
      ? selectedIds.filter((id) => id !== optionId)
      : [...selectedIds, optionId];
    onSelectionChange(newSelectedIds);
  };

  return (
    <div className={"MultiSelect"}>
      {options.map((o) => (
        <div key={o.id} className={"MultiSelect__Option"}>
          <label>{o.name}</label>
          <input
            type={"checkbox"}
            checked={selectedIds.includes(o.id)}
            onChange={() => handleSelect(o.id)}
          />
        </div>
      ))}
    </div>
  );
}
