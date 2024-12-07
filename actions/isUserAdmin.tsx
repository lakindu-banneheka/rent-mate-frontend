"use server";

import { getUsersRoles } from "./getUsersRoles";

// Check if the current user is an admin
export async function isUserAdmin(): Promise<boolean> {
  try {
    const roles = await getUsersRoles();

    return roles.some((role) => role.name.toLowerCase() === "admin");
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}
