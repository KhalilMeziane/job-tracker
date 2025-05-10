"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Home, RefreshCw, ServerCrash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    document.title = "Internal Server Error"
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="mx-4 w-full max-w-lg rounded-md bg-white py-8 shadow-none">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <ServerCrash className="size-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Internal Server Error</CardTitle>
          <CardDescription>
            Sorry, something went wrong on our server.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={() => reset()} className="flex items-center gap-2">
            <RefreshCw className="size-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="size-4" />
              Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
