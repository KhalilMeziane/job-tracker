"use client"

import { Control, FieldValues, Path } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface TSelectFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  placeholder?: string
  label?: string
  options: TOptions[]
  className?: string
  disabled?: boolean
}

type TOptions = {
  value: string | boolean
  label: string
  disabled?: boolean
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  className,
  disabled,
}: TSelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {label}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value?.toString()}
            disabled={disabled}
          >
            <FormControl dir="auto">
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent dir="auto">
              {options.map(({ label, value, disabled }) => (
                <SelectItem
                  key={value as string}
                  value={value as string}
                  disabled={disabled}
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="dark:text-red-400" />
        </FormItem>
      )}
    />
  )
}