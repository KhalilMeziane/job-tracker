"use client"

import { IJobApplication } from "@/modules/jobs/domain/entities/job.entity"
import { SquarePen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/blocks/Modal"

import UpdateForm from "../forms/UpdateForm"

export default function UpdateModal({ job }: { job: IJobApplication }) {
  return (
    <Modal
      title="Update Job Tracker"
      CButton={
        <Button size="icon">
          <SquarePen className="size-4" />
        </Button>
      }
      render={({ onClose }) => {
        return <UpdateForm job={job} onClose={onClose} />
      }}
    />
  )
}
