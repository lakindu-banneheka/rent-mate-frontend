import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { RentalItem } from '@/types/rental'

interface RentalItemCardProps {
  item: RentalItem
  onClick: (id: string) => void
}

export function RentalItemCard({ item, onClick }: RentalItemCardProps) {
  return (
    <div 
      onClick={() => onClick(item.id)}
      className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-lg cursor-pointer hover:bg-blue-100/50 transition-colors"
    >
      <div className="w-20 h-20 relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg">{item.name}</h3>
        <div className="flex gap-8 mt-2 text-sm text-muted-foreground">
          <div>
            <span>Qty: {item.quantity}</span>
          </div>
          <div>
            <span>Available Qty: {item.availableQuantity}</span>
          </div>
          <div>
            <span>Price: {item.pricePerDay.toFixed(2)} / day</span>
          </div>
        </div>
      </div>
      <ChevronRight className="w-6 h-6 text-muted-foreground" />
    </div>
  )
}

