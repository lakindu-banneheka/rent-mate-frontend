'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

export interface FilterItem {
  id: string
  label: string
  checked?: boolean
}

interface FilterToolbarProps {
  filters: FilterItem[]
  onFilterChange?: (filterString: string) => void
  onSearchChange?: (searchString: string) => void
  filterLabel?: string
  searchPlaceholder?: string
  alignment?: 'left' | 'right'
  defaultFilterString?: string
}

export function FilterToolbar({
  filters,
  onFilterChange,
  onSearchChange,
  // filterLabel = 'Filter',
  searchPlaceholder = 'Search...',
  alignment = 'left',
  defaultFilterString = '',
}: FilterToolbarProps) {
  
    const [checkedItems, setCheckedItems] = React.useState<{ [key: string]: boolean }>(() => {
    const defaultChecked = defaultFilterString.split(',').reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    return Object.fromEntries(filters.map((filter) => [filter.id, defaultChecked[filter.id] ?? filter.checked ?? false]));
  });
  const [searchValue, setSearchValue] = React.useState('')

  const handleCheckedChange = (id: string, checked: boolean) => {
    const newCheckedItems = { ...checkedItems, [id]: checked }
    setCheckedItems(newCheckedItems)
    const filterString = Object.entries(newCheckedItems)
        .filter(([, isChecked]) => isChecked)
        .map(([id]) => id)
        .join(',')
    onFilterChange?.(filterString)
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    onSearchChange?.(value)
  }

  React.useEffect(() => {
    onFilterChange?.(defaultFilterString);
  }, [defaultFilterString, onFilterChange]);

  return (
    <div className={`flex items-center gap-2 ${alignment === 'right' ? 'justify-end' : ''}`}>
      {alignment === 'right' && (
       <SearchBar 
            handleSearchChange={handleSearchChange}
            searchPlaceholder={searchPlaceholder}
            searchValue={searchValue}
        />
      )}
      
      <Filter 
        checkedItems={checkedItems}
        filterLabel={'Category'}
        filters={filters}
        handleCheckedChange={handleCheckedChange}
      />
      {alignment === 'left' && (
        <SearchBar 
            handleSearchChange={handleSearchChange}
            searchPlaceholder={searchPlaceholder}
            searchValue={searchValue}
        />
      )}
    </div>
  )
}

// Category Filter
interface FilterProps {
    filterLabel: string;
    filters: FilterItem[];
    checkedItems: { [key: string]: boolean; };
    handleCheckedChange: (id: string, checked: boolean) => void;
}


const Filter = ({
    filterLabel,
    filters,
    checkedItems,
    handleCheckedChange
}: FilterProps) => {

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-filter"
                        >
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        {filterLabel}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                        {filters.map((filter) => (
                            <DropdownMenuCheckboxItem
                                key={filter.id}
                                checked={checkedItems[filter.id]}
                                onCheckedChange={(checked) => handleCheckedChange(filter.id, checked)}
                            >
                                {filter.label}
                            </DropdownMenuCheckboxItem>
                        ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}


// Search Bar
interface SearchBarProps {
    searchPlaceholder: string;
    searchValue: string;
    handleSearchChange: (searchString: string) => void;
} 


const SearchBar = ({
    searchPlaceholder,
    searchValue,
    handleSearchChange
}: SearchBarProps) => {

    return(
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            className="pl-8"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
    )
}