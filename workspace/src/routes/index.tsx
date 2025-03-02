import { createFileRoute } from "@tanstack/react-router";

import App from "../components/App.tsx";

export const Route = createFileRoute("/")({
  component: App,
});
