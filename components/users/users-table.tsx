"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Search, ChevronUp, ChevronDown } from 'lucide-react'
import Link from "next/link"
import { User } from "@/types/userTypes"
import { AppDispatch, RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "@/lib/features/userSlice"
import { useToast } from "@/hooks/use-toast"

export function UsersTable() {
    const { toast } = useToast();
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user.users);
    const UsersLoadingError = useSelector((state: RootState) => state.user.error);

    const [searchTerm, setSearchTerm] = React.useState("")
    const [sortColumn, setSortColumn] = React.useState<keyof User | null>(null)
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    React.useEffect(() => {
        const loadCategories = async () => {
            await dispatch(fetchUsers());

            if (UsersLoadingError) {
                toast({
                    variant: "destructive",
                    title: "Error fetching user details",
                    description: UsersLoadingError
                });
            }
        };
        
        loadCategories();
    }, [dispatch]);

    const filteredUsers = React.useMemo(() => {
        return users.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [users, searchTerm])

    const sortedUsers = React.useMemo(() => {
        if (!sortColumn) return filteredUsers

        return [...filteredUsers].sort((a, b) => {
          if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
          if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
          return 0
        })
    }, [filteredUsers, sortColumn, sortDirection])

    const handleSort = (column: keyof User) => {
        if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
        setSortColumn(column)
        setSortDirection('asc')
        }
    }

    const SortIcon = ({ column }: { column: keyof User }) => {
        if (sortColumn !== column) return null
        return sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
    }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {sortedUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.firstName} {user.lastName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Role:</div>
                <div className="text-sm">{user.role}</div>
                <div className="text-sm font-medium">Contact:</div>
                <div className="text-sm">{user.contactNo}</div>
                <div className="text-sm font-medium">Email:</div>
                <div className="text-sm">{user.email}</div>
              </div>
              {/* <div className="mt-4 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/users/${user.id}`}>View Details</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop view */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('firstName')} className="cursor-pointer">
                First Name <SortIcon column="firstName" />
              </TableHead>
              <TableHead onClick={() => handleSort('lastName')} className="cursor-pointer">
                Last Name <SortIcon column="lastName" />
              </TableHead>
              <TableHead onClick={() => handleSort('role')} className="cursor-pointer">
                Role <SortIcon column="role" />
              </TableHead>
              <TableHead onClick={() => handleSort('contactNo')} className="cursor-pointer">
                Contact No <SortIcon column="contactNo" />
              </TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>
                  <span className="capitalize">{user.role}</span>
                </TableCell>
                <TableCell>{user.contactNo}</TableCell>
                {/* <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/users/${user.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

