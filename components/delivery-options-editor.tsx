"use client"

import { useState } from "react"
import { Plus, Save, Trash, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeliveryMethod, DeliveryOptions } from "../types/itemTypes"

interface DeliveryOptionsEditorProps {
  deliveryOptions: DeliveryOptions[]
  onUpdate: (options: DeliveryOptions[]) => Promise<void>
}

export function DeliveryOptionsEditor({
  deliveryOptions,
  onUpdate,
}: DeliveryOptionsEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editOptions, setEditOptions] = useState<DeliveryOptions[]>(
    deliveryOptions
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      await onUpdate(editOptions)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update delivery options:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditOptions(deliveryOptions)
    setIsEditing(false)
  }

  const addOption = () => {
    setEditOptions([...editOptions, { method: DeliveryMethod.PICKUP, cost: 0 }])
  }

  const removeOption = (index: number) => {
    setEditOptions(editOptions.filter((_, i) => i !== index))
  }

  const updateOption = (
    index: number,
    field: keyof DeliveryOptions,
    value: string | number
  ) => {
    const newOptions = [...editOptions]
    newOptions[index] = {
      ...newOptions[index],
      [field]: field === "cost" ? Number(value) : value,
    }
    setEditOptions(newOptions)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Delivery Options</h3>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            Edit Options
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editOptions.map((option, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Select
                      value={option.method}
                      onValueChange={(value: DeliveryMethod) =>
                        updateOption(index, "method", value)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={DeliveryMethod.PICKUP}>
                          Pickup
                        </SelectItem>
                        <SelectItem value={DeliveryMethod.DELIVERY}>
                          Delivery
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={option.cost}
                      onChange={(e) =>
                        updateOption(index, "cost", Number(e.target.value))
                      }
                      className="w-[120px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={addOption} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Option
          </Button>
          <div className="flex items-center gap-2">
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button onClick={handleCancel} variant="ghost">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryOptions.map((option, index) => (
              <TableRow key={index}>
                <TableCell className="capitalize">{option.method}</TableCell>
                <TableCell>${option.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}