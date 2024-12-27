'use client'
import React, { useEffect } from 'react'
import { Suspense } from "react"
import { CategoryCard } from '@/components/categories/category-card'
import { fetchCategories } from '@/lib/features/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'

const CategoryPage = () => {

    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.category.categories);
    // const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
    // const isCategoryLoading = useSelector((state: RootState) => state.category.loading);
    // const error = useSelector((state: RootState) => state.category.error);

    console.log(categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <>
            <div className="container space-y-6 py-6 px-14">
                {/* <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Category List</h1>
                    <div className="flex items-center gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search" className="pl-8" />
                    </div>
                    <Button size="icon" variant="ghost">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>DD</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Dora Doreau</span>
                    </div>
                    </div>
                </header> */}

                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">Category list</h2>
                    {/* <Button asChild>
                        <Link href="/categories/add">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Link>
                    </Button> */}
                </div>

                <Suspense fallback={<div>Loading categories...</div>}>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </Suspense>
            </div>
        </>
    );
}

export default CategoryPage;