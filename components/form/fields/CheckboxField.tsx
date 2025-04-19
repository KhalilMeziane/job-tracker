"use client"

import { Control, FieldValues, Path } from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface TInputFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  disabled?: boolean
}

export function CheckboxField<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
}: TInputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormLabel className="ps-1 text-sm font-medium capitalize text-gray-900 dark:text-gray-100">
            {label}
          </FormLabel>
          <FormMessage className="dark:text-red-400" />
        </FormItem>
      )}
    />
  )
}