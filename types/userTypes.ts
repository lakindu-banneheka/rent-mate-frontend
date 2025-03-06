export interface User {
  id: string;
  sid: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  email: string;
  contactNo: string;
  isBlackListed: boolean;
  address: string;
  zipCode: string;
  isVerified: boolean;
  nic: string;

  createdAt: Date;
  updatedAt: Date;
}

export enum UserRoles {
  User = "user",
  Admin = "admin",
  Lender = "lender",
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}
