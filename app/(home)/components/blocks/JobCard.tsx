"use client"

import { format } from "date-fns"
import { ExternalLink, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Job {
  id: string
  company: string
  position: string
  location: string
  status: JobStatus
  dateApplied: string
  notes?: string
  url?: string
}
export type JobStatus = "saved" | "applied" | "interview" | "offer" | "rejected"

export function JobCard({ job }: { job: Job }) {
  const getStatusBadge = (status: JobStatus) => {
    const statusConfig = {
      applied: { label: "Applied", className: "bg-blue-500 hover:bg-blue-600" },
      interview: {
        label: "Interview",
        className: "bg-yellow-500 hover:bg-yellow-600",
      },
      offer: { label: "Offer", className: "bg-green-500 hover:bg-green-600" },
      rejected: { label: "Rejected", className: "bg-red-500 hover:bg-red-600" },
      saved: { label: "Saved", className: "bg-gray-500 hover:bg-gray-600" },
    }

    const config = statusConfig[status]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <Card key={job.id} className="overflow-hidden rounded-md shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{job.company}</h3>
            <p className="text-sm text-muted-foreground">{job.location}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="font-medium">{job.position}</div>
            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Applied: {format(new Date(job.dateApplied), "MMM d, yyyy")}
            </div>
            {getStatusBadge(job.status)}
          </div>
          {job.notes && (
            <div className="mt-2">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {job.notes}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
