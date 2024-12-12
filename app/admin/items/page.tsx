'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { FilterToolbar } from '@/components/filter-toolbar'
import { ItemCard } from '@/components/items/item-list-card'
import { sampleItemData } from '@/data/sample-data/items'
import { Item } from '@/types/itemTypes'

const filters = [
    { id: '1', label: 'electronics' },
];

const filterFunctions = {
    category: (item: Item, value: string) =>
      item.categoryId.toLowerCase() === value.toLowerCase(),
};

const ItemPage = () => {
    const [activeFilters, setActiveFilters] = useState<string>('name,priority');
    const [searchString, setSearchString] = useState('')
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [itemList, setitemList] = React.useState<Item[]>(sampleItemData);

    
    const getFilteredItems = useMemo(() => {
        return itemList.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchString.toLowerCase()) ||
                item.description.toLowerCase().includes(searchString.toLowerCase());
        
            const matchesFilters = activeFilters.split(',').every((filter) => {
                const [key, value] = filter.split(':');
                const filterFunction = filterFunctions[key as keyof typeof filterFunctions];
                return filterFunction ? filterFunction(item, value) : true;
            });
        
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
                    filters={filters}
                    onFilterChange={setActiveFilters}
                    onSearchChange={setSearchString}
                    alignment="right"
                    defaultFilterString={activeFilters}
                />
            </div>

            <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-1'>
                {filteredItems.map((item, i) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default ItemPage;