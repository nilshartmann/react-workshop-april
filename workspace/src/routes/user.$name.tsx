import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/$name')({
  component: RouteComponent,
})

function RouteComponent() {
  const routeParam = Route.useParams()
  return <div>Hello {routeParam.name}</div>
}
