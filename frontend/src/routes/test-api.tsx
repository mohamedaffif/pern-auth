import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/test-api')({
  component: TestApi,
})

async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }

  return res.json()
}

function TestApi() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <h1>Loading users...</h1>

  if (isError) return <h1>Error loading users</h1>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Users List
      </h1>

      <ul className="space-y-2">
        {data.map((user: any) => (
          <li key={user.id} className="p-2 border rounded">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}