"use client"

import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import api from "@/lib/axios"
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

const Logout = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const handelLogout = () => {
    startTransition(async () => {
      const result = await api.post(`/auth/logout`)
      if (result.status !== 200) {
        toast({
          title: result.data.message,
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
