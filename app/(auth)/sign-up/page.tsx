import { Metadata } from "next"

import SignUpForm from "./components/SignUpForm"

export const metadata: Metadata = {
  title: "Sign-Up",
}

export default function SignUp() {
  return (
    <section className="mx-auto flex h-screen flex-col items-center justify-center px-6 sm:w-7/12 md:w-5/12 lg:w-4/12">
      <SignUpForm />
    </section>
  )
}
