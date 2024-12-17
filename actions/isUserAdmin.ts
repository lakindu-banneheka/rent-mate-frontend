'use server';

import { getUsersRoles } from "./getUsersRoles";

// Check if the current user is an admin
export async function isUserAdmin() {
  try {
    const roles = await getUsersRoles();
    return roles?.some((role) => role.name?.toLowerCase() === "admin") ?? false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}
