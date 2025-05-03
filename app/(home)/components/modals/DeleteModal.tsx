"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/blocks/Modal"

import DeleteForm from "../forms/DeleteForm"

export default function DeleteModal() {
  return (
    <Modal
      title="Delete Job Tracker"
      CButton={
        <Button size="icon">
          <Trash2 className="size-4" />
        </Button>
      }
      render={({ onClose }) => {
        return <DeleteForm onClose={onClose} job={{ name: "khalil" }} />
      }}
    />
  )
}
