"use client"

import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { parseAsString, useQueryStates } from "nuqs"

import { Input } from "./ui/input"

export default function SearchInput() {
  const router = useRouter()

  const [{ job }] = useQueryStates({
    job: parseAsString.withDefault(""),
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const job = (form.job as HTMLInputElement).value.trim()

    const params = new URLSearchParams(window.location.search)

    if (!job) {
      params.delete("job")
    } else {
      params.set("job", job)
      params.set("page", "1")
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} method="GET" action="/">
        <div className="relative">
          <Input
            className="peer ps-9"
            placeholder={"Search for jobs"}
            type="search"
            size={16}
            name="job"
            defaultValue={job}
          />
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </form>
    </div>
  )
}
