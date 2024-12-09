"use server";

import { getUsersRoles } from "./getUsersRoles";

// Check if the current user is an admin
export async function isUserLender(): Promise<boolean> {
  try {
    const roles = await getUsersRoles();

    return roles.some((role) => role.name.toLowerCase() === "lender");
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}
