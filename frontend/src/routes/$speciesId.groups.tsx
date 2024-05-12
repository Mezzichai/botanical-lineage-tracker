import { createFileRoute } from '@tanstack/react-router'
import GroupView from '../pages/GroupView'

export const Route = createFileRoute('/$speciesId/groups')({
  component: () => (<GroupView/>)
})