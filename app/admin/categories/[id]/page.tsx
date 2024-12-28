'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchCategoryById } from '@/lib/features/categorySlice'
import { CategoryForm } from '@/components/categories/category-form'

export default function CategoryDetailsPage() {
  const { id } = useParams()
  const dispatch: AppDispatch = useDispatch()
  const { selectedCategory, error } = useSelector((state: RootState) => state.category)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCategory = async () => {
      setIsLoading(true)
      await dispatch(fetchCategoryById(id as string))
      setIsLoading(false)
    }
    loadCategory()
  }, [dispatch, id])

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-12 w-1/4 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      {selectedCategory && <CategoryForm category={selectedCategory} />}
    </div>
  )
}

