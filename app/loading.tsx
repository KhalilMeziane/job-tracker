import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-12 animate-spin text-primary" />
        <h2 className="text-xl font-medium">Loading...</h2>
        <p className="text-sm text-muted-foreground">
          Please wait while we load your content
        </p>
      </div>
    </div>
  )
}
