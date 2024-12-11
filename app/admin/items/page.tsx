'use client'
import { FilterToolbar } from '@/components/filter-toolbar'
import ListItemcard from '@/components/items/item-list-card'
import React from 'react'

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
        <div className='' >
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
                <ListItemcard />
            </div>

        </div>
    )
}

export default ItemPage