import * as React from 'react'
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
   <div>
      <nav style={{ display: 'flex', gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>


      <hr />

      <Outlet />
    </div>
  )
}
