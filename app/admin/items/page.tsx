'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { FilterToolbar } from '@/components/filter-toolbar'
import { ItemCard } from '@/components/items/item-list-card'
import { sampleItemData } from '@/data/sample-data/items'
import { Item } from '@/types/itemTypes'
import { sampleCategories } from '@/data/sample-data/categories'

interface Filters {
    id: string;
    label: string;
}

const ItemPage = () => {
    const [activeFilters, setActiveFilters] = useState<string>('');
    const [searchString, setSearchString] = useState('')
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [itemList, setitemList] = React.useState<Item[]>(sampleItemData);
    const [categories, setCategories] = useState<Filters[]>([]);

    useEffect(() => {
        const getAllFilters: Filters[] = sampleCategories.map((category) => ({
            id: category.id,
            label: category.name
        }))
        setCategories(getAllFilters);
    },[]);

    useEffect(() => {
        setitemList(sampleItemData);
    },[]);
    
    const getFilteredItems = useMemo(() => {
        return itemList.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchString.toLowerCase()) ||
                item.description.toLowerCase().includes(searchString.toLowerCase());
        
            const matchesFilters = activeFilters
                .split(",") 
                .some((filterId) => item.categoryId.includes(filterId));
              
            return matchesSearch && matchesFilters;
        });
    }, [searchString, activeFilters]);
        
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
                {filteredItems.map((item) => (
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