import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import SettingsForm from "../components/SettingsForm.tsx";

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
})

function RouteComponent() {

  const location = useLocation();
  // location.pathname

  return <> <Link
    to={"/"}>Home</Link>
    <Outlet />
    <SettingsForm />
  </>
}
