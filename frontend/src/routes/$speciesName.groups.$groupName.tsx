import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$speciesName/groups/$groupName')({
  component: () => <div>Hello /$speciesName/groupName!</div>
})