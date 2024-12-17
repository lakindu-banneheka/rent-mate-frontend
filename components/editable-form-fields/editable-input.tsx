import React, { useState } from 'react';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { Check, Pencil } from 'lucide-react';

interface FormFieldInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder: string;
  className?: string;
  isLoading?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined
}

const EditableFormFieldInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isLoading=false,
  className,
  type
}: FormFieldInputProps<TFieldValues>) => {

  const [isEditing, setIsEditing] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex flex-col space-y-3 md:space-y-0 w-10/12 md:flex-row items-start justify-start">
            <FormLabel className="mt-2 mr-5 w-28 min-w-28">{label}</FormLabel>
            { isLoading &&
                <Skeleton className="w-full h-10" />
            }
            { !isLoading &&
              <FormControl className="flex justify-center items-center">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder={placeholder}
                    {...field}
                    className="w-full min-w-[210px]"
                    disabled={!isEditing}
                    type={type}
                  />
                  <Button
                    type={isEditing ? "submit" : "button"}
                    variant="ghost"
                    size="icon"
                    onClick={() => !isEditing && setIsEditing(true)}
                  >
                    {isEditing ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
            }
          </div>
          <FormMessage className="ml-32" />
        </FormItem>
      )}
    />
  );
};

export default EditableFormFieldInput;