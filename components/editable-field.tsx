"use client"

import { useState } from "react"
import { Edit2, Save, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EditableFieldProps {
  label: string
  value: string | number
  type?: "text" | "number" | "textarea" | "select"
  onUpdate: (value: string | number) => Promise<void>
  options?: { value: string; label: string }[]
  className?: string
}

export function EditableField({
  label,
  value,
  type = "text",
  onUpdate,
  options = [],
  className = "",
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      await onUpdate(editValue)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-2">
          {type === "select" ? (
            <Select
              value={String(editValue)}
              onValueChange={(value) => setEditValue(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : type === "textarea" ? (
            <Textarea
              value={String(editValue)}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <Input
              type={type}
              value={editValue}
              onChange={(e) =>
                setEditValue(
                  type === "number" ? Number(e.target.value) : e.target.value
                )
              }
            />
          )}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleUpdate}
              disabled={isLoading}
              size="sm"
              className="w-20"
            >
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
            <Button
              onClick={handleCancel}
              variant="ghost"
              size="sm"
              className="w-20"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-3">
          {type === "textarea" ? (
            <div className="whitespace-pre-wrap">{String(value)}</div>
          ) : (
            String(value)
          )}
        </div>
      )}
    </div>
  )
}

