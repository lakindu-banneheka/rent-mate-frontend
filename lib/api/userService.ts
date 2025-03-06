import { User } from '@/types/userTypes';
import { handleError } from '@/utils/api/handleError';
import axiosInstance from '@/utils/axios';

const BASE_PATH = '/user'

export const userService = {
    // Create User
    async createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
        try {
        const response = await axiosInstance.post(BASE_PATH, user);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch Users
    async fetchUsers(): Promise<User[]> {
        try{
        const response = await axiosInstance.get(BASE_PATH);
            return response.data;
        } catch(error) {
            throw handleError(error);
        }
    },

    // Fetch Single User
    async fetchUserById(id: string): Promise<User> {
        try {
            const response = await axiosInstance.get(`${BASE_PATH}/${id}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch Single User by email
    async fetchUserByEmail(email: string): Promise<User> {
        try {
            const response = await axiosInstance.get(`${BASE_PATH}/email/${email}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch Single User by SId
    async fetchUserBySId(sid: string): Promise<User> {
        try {
            const response = await axiosInstance.get(`${BASE_PATH}/${sid}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch Single UserId by SId
    async fetchUserIdBySId(sid: string): Promise<User> {
        try {
            const response = await axiosInstance.get(`${BASE_PATH}/userId/${sid}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },
    

    // Update User
    async updateUser(user: User): Promise<User> {
        if (!user.id) {
            throw new Error('User ID is required for update');
        }
        try {
            const response = await axiosInstance.put(`${BASE_PATH}/${user.id}`, user);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Delete User
    async deleteUser(id: string): Promise<void> {
        try {
            await axiosInstance.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            throw handleError(error);
        }
    },
};