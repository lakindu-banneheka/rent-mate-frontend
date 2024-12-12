export interface User {
    id: string; 
    firstName: string;
    lastName: string;
    role: UserRoles;
    email: string;
    contactNo: string;
    isBlackListed: string;
    address: string;
    zipCode: string;
    isVerified: Boolean;
    nic: string;
    
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRoles {
    User = 'user',
    Admin = 'admin',
    Lender = 'lender',
}
  
export interface UserState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
}