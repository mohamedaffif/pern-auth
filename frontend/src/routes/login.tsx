import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}