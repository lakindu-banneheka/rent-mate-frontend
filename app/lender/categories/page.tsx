'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Suspense } from "react"
import { CategoryCard } from '@/components/categories/category-card'
import { fetchCategories } from '@/lib/features/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Category } from '@/types/categoryTypes'
import { useToast } from '@/hooks/use-toast'

const CategoryPage = () => {
    const { toast } = useToast();
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.category.categories);
    const isCategoryLoading = useSelector((state: RootState) => state.category.loading);

    const [searchString, setSearchString] = useState('')
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    
    const handleSearchChange = (value: string) => {
        setSearchString(value)
    }

    const getFilteredCategories = useMemo(() => {
        return categories.filter((category) => {
            const matchesSearch =
                category.name.toLowerCase().includes(searchString.toLowerCase()) ||
                category.description.toLowerCase().includes(searchString.toLowerCase());
            return matchesSearch;
        });
    }, [searchString]);

    useEffect(() => {
        const loadCategories = async () => {
            const result = await dispatch(fetchCategories());
            
            if (fetchCategories.rejected.match(result)) {
              toast({
                variant: "destructive",
                title: "Error fetching categories",
                description: result.payload as string
              });
            }
          };
      
          loadCategories();
    }, [dispatch]);

    useEffect(() => {
        setFilteredCategories(getFilteredCategories);
    }, [getFilteredCategories]);

    return (
        <>
            <div className="container space-y-6 py-6 px-14">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">Category list</h2>
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder={'Search...'}
                            className="pl-8"
                            value={searchString}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                </div>

                <Suspense fallback={<div>Loading categories...</div>}>
                    {isCategoryLoading && 
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className="aspect-[4/3] w-full h-60 rounded-lg" />
                            ))}
                        </div>
                    }
                    {!isCategoryLoading && categories.length > 0 &&
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredCategories.map((category) => (
                                <CategoryCard params='lender' key={category.id} category={category} />
                            ))}
                        </div>
                    }
                </Suspense>
            </div>
        </>
    );
}

export default CategoryPage;