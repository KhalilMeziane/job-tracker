"use client"

import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

import CreateModal from "../modals/CreateModal"

export default function Header() {
  return (
    <header className="bg-gray-50 py-3">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between space-y-2 md:flex-row md:space-y-0">
          <div>
            <Link href="/">
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                Job Tracker
              </h1>
            </Link>
          </div>
          <div className="flex gap-2">
            <CreateModal />
            <Logout />
          </div>
        </div>
      </div>
    </header>
  )
}

const logoutCall = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  )
  const data = await response.json()
  return data as { success: boolean; message: string }
}

const Logout = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const handelLogout = () => {
    startTransition(async () => {
      const result = await logoutCall()
      if (!result.success) {
        toast({
          title: result.message,
        })
      } else {
        router.push("/sign-in")
      }
    })
  }

  return (
    <Button size="icon" onClick={handelLogout} disabled={isPending}>
      <LogOut className="size-4" />
    </Button>
  )
}
