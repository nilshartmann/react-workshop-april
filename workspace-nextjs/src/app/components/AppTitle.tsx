import * as React from "react";

import ReactLogo from "./ReactLogo.tsx";

export default function AppTitle() {
  return (
    <div
      className={
        "flex items-center justify-center space-x-2 text-3xl font-bold"
      }
    >
      <span
        className={
          "flex h-10 w-10 items-center justify-center rounded-lg bg-radial from-sky-600 to-sky-900 px-2 py-1 text-2xl"
        }
      >
        <ReactLogo />
      </span>
      <div className={"flex items-start justify-start gap-x-1"}>
        <span className={"text-sky-900 uppercase italic"}>MatchTracker</span>
        <span
          className={
            "flex h-5 w-5 items-center justify-center rounded-full border-1 border-sky-900 p-2 text-xs"
          }
        >
          ⚽️
        </span>
      </div>
    </div>
  );
}
