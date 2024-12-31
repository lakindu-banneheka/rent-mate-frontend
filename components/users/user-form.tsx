"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, UserRoles } from "@/types/userTypes"
import { Card, CardContent } from "@/components/ui/card"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { AppDispatch, RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "@/lib/features/userSlice"
import { useEffect, useState } from "react"

const userFormSchema = z.object({
    id: z.string(),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    role: z.nativeEnum(UserRoles),
    contactNo: z.string().min(10, "Contact number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
    nic: z.string().min(5, "NIC must be at least 5 characters"),
    // isBlackListed: z.boolean().default(false),
    // isVerified: z.boolean().default(false),
})

type FormData = z.infer<typeof userFormSchema>

export function UserForm() {
    const { toast } = useToast();
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const { selectedUser, error, loading } = useSelector((state: RootState) => state.user)
    
    const form = useForm<FormData>({
        resolver: zodResolver(userFormSchema),
    });

    const [formError, setFormError] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        try {
            setFormError(null); // Clear any previous errors
            if (selectedUser) {
                const userData: User = {
                    ...data,
                    id: selectedUser.id,
                    createdAt: selectedUser.createdAt,
                    updatedAt: new Date(),
                    isBlackListed: false,
                    isVerified: false
                }
                await dispatch(updateUser(userData));
            }

            if (error) {
                setFormError(error);
                toast({
                    variant: "destructive",
                    title: `Error updating user details`,
                    description: error
                });
            } else {
                toast({
                    variant: "default",
                    title: "Success",
                    description: `User details updated successfully`
                });
                router.push("/admin/users")
            }
            
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setFormError(errorMessage);
            toast({
                variant: "destructive",
                title: "Unexpected error",
                description: errorMessage
            });
        }
    }

    useEffect(() => {
        if (selectedUser) {
            Object.keys(selectedUser).forEach((key) => {
                const value = selectedUser[key as keyof User];
                if (typeof value === 'string') {
                    form.setValue(key as keyof FormData, value);
                }
            });
        }
    }, [selectedUser, form]);

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
                <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>User ID</FormLabel>
                            <FormControl>
                            <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            >
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.values(UserRoles).map((role) => (
                                <SelectItem key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactNo"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact No</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nic"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>NIC</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    </div>
                </CardContent>
            </Card>

            {formError && (
                <div className="text-red-500 mb-4">
                    Error: {formError}. Please correct the issue and try again.
                </div>
            )}

            <div className="flex items-center gap-4">
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Update User"}
                </Button>
                {/* <Button
                    type="button"
                    variant="destructive"
                    onClick={() => form.setValue("isBlackListed", true)}
                >
                    {`Blacklist`}
                </Button> */}
            </div>
        </form>
    </Form>
  )
}