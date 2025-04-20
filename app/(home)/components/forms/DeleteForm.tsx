import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/form"

import { deleteJobTrackerSchema, deleteJobTrackerValues } from "../validation"

export default function DeleteForm({
  job,
  onClose,
}: {
  job: { name: string }
  onClose: () => void
}) {
  const form = useForm<deleteJobTrackerValues>({
    resolver: zodResolver(deleteJobTrackerSchema(job.name)),
    defaultValues: {
      name: "",
    },
  })

  const handleSubmit = async () => {}

  return (
    <Form {...form}>
      <p className="text-sm text-gray-800">
        Please enter job Title: <b>&quot;{job.name}&quot;</b> to confirm the
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
            // disabled={isPending}
          >
            Delete
          </Button>
        </div>
      </form>
    </Form>
  )
}
