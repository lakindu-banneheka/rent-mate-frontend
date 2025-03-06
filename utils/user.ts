import axiosInstance from "./axios";
import { handleError } from "./api/handleError";

interface DBUser {
  email: string | null | undefined;
  firstName: string | null | undefined;
}

export const getDBUser = async (user: DBUser) => {
  try {
    // Try to get the user from the database by email
    const res = await axiosInstance.get(`/user/email/${user.email}`);
    return res.data;
  } catch (error: any) {
    // If a 404 error occurs, it means the user doesn't exist.
    if (error.response && error.response.status === 404) {
      try {
        const response = await axiosInstance.post("/user", {
          ...user,
          role: "user",
        });
        return response.data;
      } catch (postError) {
        throw handleError(postError);
      }
    }
    // For any other errors, throw them
    throw handleError(error);
  }
};
