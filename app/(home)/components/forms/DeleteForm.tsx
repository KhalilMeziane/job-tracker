"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { IJobApplication } from "@/modules/jobs/domain/entities/job.entity"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/form"

import { DeleteJobTracker } from "../../actions"
import { deleteJobTrackerSchema, deleteJobTrackerValues } from "../validation"

export default function DeleteForm({
  job,
  onClose,
}: {
  job: IJobApplication
  onClose: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const form = useForm<deleteJobTrackerValues>({
    resolver: zodResolver(deleteJobTrackerSchema(job.position)),
    defaultValues: {
      name: "",
    },
  })

  const handleSubmit = async () => {
    startTransition(async () => {
      const result = await DeleteJobTracker(job.id)
      if (!result.success) {
        setError(result.message)
      } else {
        onClose()
        router.push("/")
      }
    })
  }

  return (
    <Form {...form}>
      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <p className="text-sm text-gray-800">
        Please enter job Title: <b>&quot;{job.position}&quot;</b> to confirm the
        delete action.
      </p>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          name="name"
          control={form.control}
          label="Job Title"
          placeholder="Type Job Title to confirm"
        />
        <div className="flex justify-end gap-2 pt-3">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            variant="outline"
            className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
            isLoading={isPending}
          >
            Delete
          </Button>
        </div>
      </form>
    </Form>
  )
}
