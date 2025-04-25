import AppTitle from "./AppTitle";
import Link from "next/link";

export default function AppHeader() {
  return <header
    className={
      "relative flex h-20 items-center justify-between bg-white px-8 py-8"
    }
  >
      <Link href={"/"}>
        <AppTitle />
      </Link>
      <div className={"flex items-center justify-end space-x-4"}>
        <Link href={"/"}>Home</Link>
        {/* Im richtigen Leben würde man wohl nur die Settings für den eigenen
                  Benutzer editierbar machen, aber damit wir eine kleine Navigation hier haben,
                  kann man alle Benutzer editieren :-) */}
        <Link href={"/settings/1"}>Settings User 1</Link>
        <Link href={"/settings/2"}>Settings User 2</Link>
      </div>

  </header>
}