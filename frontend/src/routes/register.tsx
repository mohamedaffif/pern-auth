import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>

      <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}