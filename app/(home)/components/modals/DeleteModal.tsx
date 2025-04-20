"use client"

import { Button } from "react-day-picker"

import { Modal } from "@/components/blocks/Modal"

import DeleteForm from "../forms/DeleteForm"

export default function DeleteModal() {
  return (
    <Modal
      title="Delete Job Tracker"
      CButton={<Button>Edit</Button>}
      render={({ onClose }) => {
        return <DeleteForm onClose={onClose} job={{ name: "khalil" }} />
      }}
    />
  )
}
