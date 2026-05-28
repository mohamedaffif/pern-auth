import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/login')({
  component: Login,
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
})

type FormData = z.infer<typeof schema>

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    console.log('Login data:', data)

    // later: API call → backend login
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-95 p-6">

         <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-4"
      >

        <h1 className="text-2xl font-bold">Welcome Back</h1>

        {/* Email */}
        <div className="space-y-1">
          <Label>Email</Label>
          <Input placeholder="email@example.com" {...register('email')} />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label>Password</Label>
          <Input type="password" {...register('password')} />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      </Card>
    </div>
  )
}