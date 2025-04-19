"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/form"

import { useRegister } from "../hooks/useRegister"
import { registerSchema, registerValues } from "@/modules/auth/validators/register.schema"

export default function SignInForm() {
  const form = useForm<registerValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const { mutateAsync, isPending } = useRegister()

  const handleSubmit = async (values: registerValues) => {
    mutateAsync(values, { 
      onSuccess(data) {
        // eslint-disable-next-line no-console
      console.log("res", data)
      },
      onError(error) {
         // eslint-disable-next-line no-console
      console.log("error", error)
      },
    })

  }

  return (
    <Form {...form}>
      <h1 className="mb-2 text-2xl font-semibold">Register to Job Tracker</h1>
      <form
        className="w-full space-y-3"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <InputField
          name="name"
          placeholder="john doe"
          type="text"
          control={form.control}
          label={"Name"}
        />
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
          Register
        </Button>
        <p className="text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-blue-500 underline" href="/sign-in">
            Login
          </Link>
        </p>
      </form>
    </Form>
  )
}
