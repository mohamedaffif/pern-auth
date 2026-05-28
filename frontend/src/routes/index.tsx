import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
      <div className="flex h-screen items-center justify-center bg-black">
      <h1 className="text-5xl font-bold text-green-500">
        Tailwind Works 🚀
      </h1>
      <Button variant="destructive">Hello shadcn</Button>
    </div>
  )
}