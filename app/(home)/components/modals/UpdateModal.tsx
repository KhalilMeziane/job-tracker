"use client"

import { Button } from "react-day-picker"

import { Modal } from "@/components/blocks/Modal"

import UpdateForm from "../forms/UpdateForm"

export default function UpdateModal() {
  return (
    <Modal
      title="Update Job Tracker"
      CButton={<Button>Edit</Button>}
      render={() => {
        return <UpdateForm />
      }}
    />
  )
}
