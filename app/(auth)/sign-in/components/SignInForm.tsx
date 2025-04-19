"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/form"

import { LoginSchema, LoginValues } from "./validation"

export default function SignInForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = (values: LoginValues) => {
    // eslint-disable-next-line no-console
    console.log("values: ", values)
  }

  return (
    <Form {...form}>
      <h1 className="mb-2 text-2xl font-semibold">Login to Job Tracker</h1>
      <form
        className="w-full space-y-3"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <InputField
          name="email"
          placeholder="john@doe.com"
          type="email"
          control={form.control}
          label={"Email"}
        />

        <InputField
          name="password"
          placeholder="*******"
          type="password"
          control={form.control}
          label={"Password"}
        />
        <Button className="w-full" size="lg">
          Login
        </Button>
        <p className="text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-blue-500 underline" href="/sign-up">
            register
          </Link>
        </p>
      </form>
    </Form>
  )
}
