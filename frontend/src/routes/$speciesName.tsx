import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$speciesName')({
  component: () => <div>Hello /index/$speciesName!</div>
})