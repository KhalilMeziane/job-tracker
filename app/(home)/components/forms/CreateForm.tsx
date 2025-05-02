"use client"

import { useState, useTransition } from "react"
import {
  CreateJobTrackerSchema,
  CreateJobTrackerValues,
} from "@/modules/jobs/validators/create-job.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  DatePickerField,
  InputField,
  SelectField,
  TextareaField,
} from "@/components/form"

import { CreateJobTracker } from "../../actions"

export default function CreateForm({ onClose }: { onClose: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>("")

  const form = useForm<CreateJobTrackerValues>({
    resolver: zodResolver(CreateJobTrackerSchema),
    defaultValues: {
      status: "APPLIED",
    },
  })

  const handleSubmit = (values: CreateJobTrackerValues) => {
    startTransition(async () => {
      const result = await CreateJobTracker(values)
      if (!result.success) {
        setError(result.message)
      } else {
        onClose()
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
      <form
        className="grid w-full grid-cols-2 gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <InputField
          name="company"
          placeholder="company name"
          control={form.control}
          label={"Company"}
        />

        <InputField
          name="position"
          placeholder="position title"
          control={form.control}
          label={"Position"}
        />

        <InputField
          name="location"
          placeholder="location"
          control={form.control}
          label={"Location"}
        />

        <SelectField
          name="status"
          placeholder="select status"
          control={form.control}
          label={"Status"}
          options={[
            { label: "APPLIED", value: "APPLIED" },
            { label: "INTERVIEW", value: "INTERVIEW" },
            { label: "OFFER", value: "OFFER" },
            { label: "REJECTED", value: "REJECTED" },
            { label: "ACCEPTED", value: "ACCEPTED" },
          ]}
        />

        <DatePickerField
          name="dateApplied"
          control={form.control}
          label={"Date Applied"}
        />

        <InputField
          name="url"
          placeholder="Job URL"
          control={form.control}
          label={"Job URL"}
        />

        <div className="col-span-2">
          <TextareaField
            name="notes"
            placeholder="Add any notes about this application"
            control={form.control}
            label={"Notes"}
          />
        </div>
        <Button className="col-span-2 mt-2" isLoading={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
