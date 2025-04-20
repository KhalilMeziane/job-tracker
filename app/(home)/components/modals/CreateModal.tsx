"use client"

import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/blocks/Modal"

import CreateForm from "../forms/CreateForm"

export default function CreateModal() {
  return (
    <Modal
      title="Create Job Tracker"
      CButton={
        <Button>
          <PlusCircle className="size-4" />
          Add New
        </Button>
      }
      render={() => {
        return <CreateForm />
      }}
    />
  )
}
