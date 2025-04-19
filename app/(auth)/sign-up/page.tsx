import { Metadata } from "next"

import SignUpForm from "./components/SignUpForm"

export const metadata: Metadata = {
  title: "Sign-Up",
}

export default function SignUp() {
  return (
    <section className="mx-auto flex h-screen flex-col items-center justify-center px-6 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-5/12">
      <SignUpForm />
    </section>
  )
}
