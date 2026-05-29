import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
// import { registerUser } from "../../api/auth"
import { registerUser } from "@/api/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  component: Register,
});

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

type FormData = z.infer<typeof schema>;

function Register() {
  const mutation = useMutation({
    mutationFn: (data: FormData) => registerUser(data),

    onSuccess: (data) => {
      console.log("SUCCESS:", data);
    },

    onError: (error) => {
      console.log("ERROR:", error);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    mutation.mutate(data);

    // later: API call here
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-95 p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="space-y-4"
        >
          <h1 className="text-2xl font-bold">Create Account</h1>

          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input placeholder="John Doe" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              autoComplete="off"
              placeholder="email@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label>Password</Label>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            className="w-full"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
