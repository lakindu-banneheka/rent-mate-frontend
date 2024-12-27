import { Suspense } from "react"
import { UsersTable } from "@/components/users/users-table"
import { UserTableSkeleton } from "@/components/users/users-table-skeleton"

export default function UsersPage() {
    return (
        <div className="container px-14 py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Users</h1>
            </div>
            <Suspense fallback={<UserTableSkeleton />}>
                <UsersTable />
            </Suspense>
        </div>
    )
}

