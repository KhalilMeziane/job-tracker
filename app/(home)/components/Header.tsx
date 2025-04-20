"use client"

import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/blocks/Modal"

import CreateForm from "./forms/CreateForm"

export default function Header() {
  return (
    <header className="bg-gray-50 py-3">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between space-y-2 md:flex-row md:space-y-0">
          <div>
            <h1 className="text-xl font-bold tracking-tight md:text-2xl">
              Job Tracker
            </h1>
          </div>
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
        </div>
      </div>
    </header>
  )
}
