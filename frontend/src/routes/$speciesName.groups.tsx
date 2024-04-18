import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$speciesName/groups')({
  component: () => <div>Hello /$speciesName/groups!</div>
})