import Link from "next/link"
import { Layers, PlusCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export default function Empty({
  hasActiveSearch,
}: {
  hasActiveSearch: boolean
}) {
  return (
    <Card className="w-full border-dashed shadow-none">
      <CardContent className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-4 rounded-full bg-muted p-6">
          <Layers className="size-12 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-2xl font-semibold">No Jobs found</h3>
        <p className="mb-6 max-w-md text-muted-foreground">
          {hasActiveSearch
            ? "No Jobs match your search. Try adjusting your search terms"
            : `You haven't created any jobs yet. Get started by
					creating your first job.`}
        </p>
        {!hasActiveSearch && (
          <Link
            href="/ai/dashboard/create-project"
            className="group mb-2 flex items-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground"
          >
            <PlusCircle className="mr-1 size-5 shrink-0" />
            Create Project
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
