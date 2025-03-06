'use client'
import { UserForm } from "@/components/users/user-form"
import { useParams } from "next/navigation"
import { AppDispatch, RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect} from "react"
import { fetchUserById } from "@/lib/features/userSlice"
import { useToast } from "@/hooks/use-toast"

export default function EditUserPage() {
    const { id } = useParams();
    const { toast } = useToast();

    const dispatch: AppDispatch = useDispatch()
    const { selectedUser, error } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        const loadCategory = async () => {
            await dispatch(fetchUserById(Array.isArray(id) ? id[0] : id));

            if (error) {
                toast({
                    variant: "destructive",
                    title: "Error fetching user details",
                    description: error
                });
            }
        }

        loadCategory();
    }, [id])

    console.log(selectedUser, error)
    return (
        <div className="container px-14 py-6 space-y-4">
            <h1 className="text-2xl font-bold">View Details</h1>
                {selectedUser && (
                    <UserForm />
                )}
        </div>
    )
}

