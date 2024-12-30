'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { FilterToolbar } from '@/components/filter-toolbar'
import { ItemCard } from '@/components/items/item-list-card'
import { sampleItemData } from '@/data/sample-data/items'
import { Item } from '@/types/itemTypes'
import { sampleCategories } from '@/data/sample-data/categories'
import { AppDispatch, RootState } from '@/lib/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '@/lib/features/itemSlice'
import { fetchCategories } from '@/lib/features/categorySlice'
import { Skeleton } from '@/components/ui/skeleton'

interface Filters {
    id: string;
    label: string;
}

const ItemPage = () => {
    const [activeFilters, setActiveFilters] = useState<string>('');
    const [searchString, setSearchString] = useState('')
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    // const [itemList, setitemList] = React.useState<Item[]>(sampleItemData);
    const [categories, setCategories] = useState<Filters[]>([]);

    const dispatch: AppDispatch = useDispatch();
    const itemList = useSelector((state: RootState) => state.item.items);
    const itemsLoading = useSelector((state: RootState) => state.item.loading);
    const categoryList = useSelector((state: RootState) => state.category.categories );
    
    useEffect(() => {
        dispatch(fetchItems());
    }, []);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        const getAllFilters: Filters[] = categoryList.map((category) => ({
        id: category.id,
        label: category.name,
        }));
        setCategories(getAllFilters);
    }, [categoryList]);

    const getFilteredItems = useMemo(() => {
        if (itemList.length > 0 && itemList[0]) {
        return itemList.filter((item) => {
            const matchesSearch =
            item.name.toLowerCase().includes(searchString.toLowerCase()) ||
            item.description.toLowerCase().includes(searchString.toLowerCase());

            const matchesFilters = activeFilters
            .split(",")
            .some((filterId) => item.categoryId.includes(filterId));

            return matchesSearch && matchesFilters;
        });
        }

        return [];
    }, [searchString, activeFilters, itemList]);

    useEffect(() => {
        setFilteredItems(getFilteredItems);
    }, [getFilteredItems]);

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='mb-8'>
                <FilterToolbar
                    filters={categories}
                    onFilterChange={setActiveFilters}
                    onSearchChange={setSearchString}
                    alignment="right"
                    defaultFilterString={activeFilters}
                    filterLabel={'Filter'}
                />
            </div>

            <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-1'>
                {itemsLoading && (
                    <div>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} className='sm:h-52 w-full my-5 h-96' />
                        ))}
                    </div>
                )}
                {!itemsLoading && filteredItems.length === 0 && (
                    <div className='text-center text-gray-500 mt-10'>
                        {"No items found"}
                    </div>
                )}
                {!itemsLoading && filteredItems.length > 0 && filteredItems.map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        categoryFilters={categories}
                    />
                ))}
            </div>
        </div>
    )
}

export default ItemPage;