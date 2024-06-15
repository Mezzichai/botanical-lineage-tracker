import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$speciesId/groups/$groupId')({
  component: () => <div>Hello /$speciesName/groupName!</div>
})