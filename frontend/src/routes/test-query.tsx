import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/test-query')({
  component: TestQuery,
})

function TestQuery() {
  const query = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      )

      return {
        message: 'React Query is working 🚀',
      }
    },
  })

  if (query.isPending) {
    return <h1>Loading...</h1>
  }

  if (query.isError) {
    return <h1>Error</h1>
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        {query.data.message}
      </h1>
    </div>
  )
}