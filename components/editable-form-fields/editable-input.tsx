'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Check, Pencil } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface EditableFormFieldProps {
  control: any
  name: string
  label: string
  placeholder?: string
  className?: string
  type?: string
  isLoading?: boolean
}

export function EditableFormField({
  control,
  name,
  label,
  placeholder,
  className,
  type = 'text',
  isLoading = false,
}: EditableFormFieldProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('space-y-2', className)}>
          <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-3 md:space-y-0 md:space-x-4">
            <FormLabel className="md:w-28 md:min-w-28 text-sm font-medium text-foreground">
              {label}
            </FormLabel>
            {isLoading ? (
              <Skeleton className="w-full h-10" />
            ) : (
              <FormControl>
                <div className="relative flex-grow w-full">
                  <Input
                    // ref={inputRef}
                    placeholder={placeholder}
                    {...field}
                    className={cn(
                      'pr-10 w-full min-w-[210px] bg-background transition-colors',
                      !isEditing && 'border-transparent bg-muted'
                    )}
                    disabled={!isEditing}
                    type={type}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsEditing(false)
                      }
                      if (e.key === 'Escape') {
                        setIsEditing(false)
                        field.onChange(field.value) // Reset to original value
                      }
                    }}
                  />
                  <Button
                    type={isEditing ? "submit" : "button"}
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (isEditing) {
                        setIsEditing(false)
                      } else {
                        setIsEditing(true)
                      }
                    }}
                    className="absolute right-0 top-0 h-full w-10"
                  >
                    {isEditing ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {isEditing ? 'Save changes' : 'Edit field'}
                    </span>
                  </Button>
                </div>
              </FormControl>
            )}
          </div>
          <FormMessage className="ml-0 md:ml-32" />
        </FormItem>
      )}
    />
  )
}