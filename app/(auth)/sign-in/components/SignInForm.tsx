"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  loginSchema,
  loginValues,
} from "@/modules/auth/validators/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/form"

import { login } from "../actions"

export default function SignInForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>("")

  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = (values: loginValues) => {
    startTransition(async () => {
      const result = await login(values)
      if (!result.success) {
        setError(result.message)
      } else {
        redirect("/")
      }
    })
  }

  return (
    <Form {...form}>
      <h1 className="mb-2 text-2xl font-semibold">Login to Job Tracker</h1>
      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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
        <Button className="w-full" size="lg" isLoading={isPending}>
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
