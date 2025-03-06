import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Rent } from '@/types/rentTypes'
import { AppDispatch, RootState } from '@/lib/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchItemById } from '@/lib/features/itemSlice'
import { Button } from '../ui/button'
import Link from 'next/link'
// import { RentalItem } from '@/types/rental'

interface RentalItemCardProps {
  item: Rent
  onClick: (id: string) => void
}

export function RentalItemCard({ item, onClick }: RentalItemCardProps) {

  const dispatch: AppDispatch = useDispatch();
  const selectedItem = useSelector((state: RootState) => state.item.selectedItem);

  useEffect(() => {
      dispatch(fetchItemById(item.itemId));
  }, [dispatch]);

  return (
    <div 
      onClick={() => onClick(item.id)}
      className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-lg  "
    >
      <div className="w-20 h-20 relative">
        <Image
          src={selectedItem?.imageUrls[0] || '/placeholder.svg'}
          alt={selectedItem?.name || ''}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg">{selectedItem?.name}</h3>
        <div className="flex gap-8 mt-2 text-sm text-muted-foreground">
          <div>
            <span>Qty: {item.quantity}</span>
          </div>
          <div>
            {/* <span>Available Qty: {item.availableQuantity}</span> */}
          </div>
          <div>
            <span>Cost: {item.totalCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* <ChevronRight className="w-6 h-6 text-muted-foreground" /> */}
      <div>
        {/* add a button to go to add review page */}
        <Link
  href={`/add-review/${item.itemId}`}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
>
  Add Review
</Link>

      </div>
    </div>
  )
}

