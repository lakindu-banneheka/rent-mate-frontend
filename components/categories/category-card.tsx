import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Category } from "@/types/categoryTypes"

interface CategoryCardProps {
  category: Category
  params: 'admin' | 'lender' | ''
}

export function CategoryCard({ category, params }: CategoryCardProps) {
  return (
    <Link href={ params === '' ? `/categories/${category.id}`:`/${params}/categories/${category.id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3]">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {/* <span>{category.itemCount} items</span> */}
            {/* <span>•</span> */}
            {/* <span>Updated {formatDistanceToNow(category.updatedAt, { addSuffix: true })}</span> */}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

