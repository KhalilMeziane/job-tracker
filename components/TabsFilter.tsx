"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

type TList = {
  label: string
  value: string
}

interface TFilterTabs {
  list: TList[]
  paramName: string
}

export default function TabsFilter({ list, paramName }: TFilterTabs) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const activeTab = searchParams.get(paramName) || list[0].value

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(`${paramName}`, value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={"flex gap-1 rounded-lg bg-gray-50 p-1"}>
      {list.map(({ label, value }) => (
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "text-gray-700 capitalize",
            activeTab === value && "bg-white text-oomco border border-oomco/30"
          )}
          key={label}
          onClick={() => handleStatusChange(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}
