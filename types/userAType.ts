export interface User {
  id: string;
  username: string;
  roles: UserRoles[];
  email: string;
  password: string;
}

export enum UserRoles {
  User = "user",
  Admin = "admin",
  Lender = "mod",
}
