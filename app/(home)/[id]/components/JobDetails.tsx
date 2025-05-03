"use client"

import { IJobApplication } from "@/modules/jobs/domain/entities/job.entity"
import { ExternalLink } from "lucide-react"

import { ApplicationStatus } from "@/lib/generated/prisma"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import DeleteModal from "../../components/modals/DeleteModal"
import UpdateModal from "../../components/modals/UpdateModal"

export function JobDetailsCard({
  job,
}: {
  job: IJobApplication
  withOutActions?: boolean
}) {
  return (
    <Card key={job.id} className="overflow-hidden rounded-md shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{job.company}</h3>
            <p className="text-sm text-muted-foreground">{job.location}</p>
          </div>
          <div className="flex gap-1">
            <UpdateModal job={job} />
            <DeleteModal job={job} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="font-medium">{job.position}</div>
            {job.applicationLink && (
              <a
                href={job.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
          {job.dateApplied && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {/* Applied: {format(job.dateApplied.toString(), "dd-MM-yyyy")} */}
              </div>
              {getStatusBadge(job.status)}
            </div>
          )}

          {job.notes && (
            <div className="mt-2">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {job.notes}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const getStatusBadge = (status: ApplicationStatus) => {
  const statusConfig = {
    APPLIED: { label: "Applied", className: "bg-blue-500 hover:bg-blue-600" },
    INTERVIEW: {
      label: "Interview",
      className: "bg-yellow-500 hover:bg-yellow-600",
    },
    OFFER: { label: "Offer", className: "bg-green-500 hover:bg-green-600" },
    REJECTED: { label: "Rejected", className: "bg-red-500 hover:bg-red-600" },
    ACCEPTED: {
      label: "Accepted",
      className: "bg-gray-500 hover:bg-gray-600",
    },
  }

  const config = statusConfig[status]
  return <Badge className={config.className}>{config.label}</Badge>
}
