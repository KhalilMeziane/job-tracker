import { Metadata } from "next"

import SignInForm from "./components/SignInForm"

export const metadata: Metadata = {
  title: "Sign-In",
}

export default function SignIn() {
  return (
    <section className="mx-auto flex h-screen flex-col items-center justify-center px-6 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-5/12">
      <SignInForm />
    </section>
  )
}
