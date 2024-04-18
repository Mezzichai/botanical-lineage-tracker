import { createRootRoute, Outlet } from '@tanstack/react-router'
import InfoCard from '../features/InfoCard/components/InfoCard'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <InfoCard />
    </>
  ),
})