'use client'
import React from 'react'
import { FilterToolbar } from '@/components/filter-toolbar'
import { ItemCard } from '@/components/items/item-list-card'
import { sampleItemData } from '@/data/sample-data/items'

const ItemPage = () => {
    const [filterString, setFilterString] = React.useState('status,priority')
    const [searchString, setSearchString] = React.useState('')
  
    const filters = [
      { id: 'status', label: 'Status' },
      { id: 'category', label: 'Category' },
      { id: 'priority', label: 'Priority' },
      { id: 'assignee', label: 'Assignee' },
    ];

    return (
        <div className='px-20 ' >
            <div className='py-10' >
                <FilterToolbar
                    filters={filters}
                    onFilterChange={setFilterString}
                    onSearchChange={setSearchString}
                    alignment="right"
                    defaultFilterString={filterString}
                />
            </div>

            <div>
                <ItemCard 
                    item={sampleItemData[0]}
                />
            </div>

        </div>
    )
}

export default ItemPage;