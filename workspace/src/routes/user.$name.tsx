import { createFileRoute } from '@tanstack/react-router'
import { z } from "zod";

export const Route = createFileRoute('/user/$name')({
  component: RouteComponent,
})

function RouteComponent() {
  const routeParam = z.string().uuid().parse(Route.useParams().name)
  return <div>Hello {routeParam}</div>
}
