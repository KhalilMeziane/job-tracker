"use client"

import {
  UpdateJobTrackerSchema,
  UpdateJobTrackerValues,
} from "@/modules/jobs/validators/create-job.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  DatePickerField,
  InputField,
  SelectField,
  TextareaField,
} from "@/components/form"

export default function UpdateForm() {
  const form = useForm<UpdateJobTrackerValues>({
    resolver: zodResolver(UpdateJobTrackerSchema),
    defaultValues: {},
  })

  const handleSubmit = (values: UpdateJobTrackerValues) => {
    // eslint-disable-next-line no-console
    console.log("values: ", values)
  }
  return (
    <Form {...form}>
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
            { label: "saved", value: "saved" },
            { label: "applied", value: "applied" },
            { label: "offer", value: "offer" },
            { label: "rejected", value: "rejected" },
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
        <Button className="col-span-2 mt-2">Submit</Button>
      </form>
    </Form>
  )
}
