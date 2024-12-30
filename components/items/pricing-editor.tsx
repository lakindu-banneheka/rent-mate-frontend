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
import { PricingDetails, PricingDuration } from "@/types/itemTypes"

interface PricingEditorProps {
  pricing: PricingDetails[]
  onUpdate: (pricing: PricingDetails[]) => Promise<void>
}

export function PricingEditor({ pricing, onUpdate }: PricingEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editPricing, setEditPricing] = useState<PricingDetails[]>(pricing)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      await onUpdate(editPricing)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update pricing:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditPricing(pricing)
    setIsEditing(false)
  }

  const addPricing = () => {
    setEditPricing([
      ...editPricing,
      { amount: 0, duration: PricingDuration.PER_DAY },
    ])
  }

  const removePricing = (index: number) => {
    setEditPricing(editPricing.filter((_, i) => i !== index))
  }

  const updatePricing = (
    index: number,
    field: keyof PricingDetails,
    value: number | PricingDuration
  ) => {
    const newPricing = [...editPricing]
    newPricing[index] = { ...newPricing[index], [field]: value }
    setEditPricing(newPricing)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Pricing</h3>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            {editPricing.length > 0 ?`Edit Pricing`: `Add Pricing`}
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editPricing.map((price, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      type="number"
                      value={price.amount}
                      onChange={(e) =>
                        updatePricing(index, "amount", Number(e.target.value))
                      }
                      className="w-[120px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={price.duration}
                      onValueChange={(value: PricingDuration) =>
                        updatePricing(index, "duration", value)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={PricingDuration.PER_DAY}>
                          Per Day
                        </SelectItem>
                        {/* <SelectItem value={PricingDuration.PER_WEEK}>
                          Per Week
                        </SelectItem> */}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePricing(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={addPricing} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Pricing
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
              <TableHead>Amount</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricing.map((price, index) => (
              <TableRow key={index}>
                <TableCell>${price.amount}</TableCell>
                <TableCell>
                  {price.duration === PricingDuration.PER_DAY
                    ? "Per Day"
                    : "Per Week"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

