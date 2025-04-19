"use client"

import { Control, FieldValues, Path } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface TInputFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  type?: "text" | "email" | "password" | "tel" | "number"
  placeholder?: string
  label?: string
  disabled?: boolean
}

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  type = "text",
}: TInputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium capitalize text-gray-900 dark:text-gray-100">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="dark:text-red-400" />
        </FormItem>
      )}
    />
  )
}