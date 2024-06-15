import { createFileRoute } from '@tanstack/react-router'
import Species from '../pages/SpeciesView'
export const Route = createFileRoute('/')({
  component: () => (<Species />)
})