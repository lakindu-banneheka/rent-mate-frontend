import { User } from '@/types/userTypes';
import { handleError } from '@/utils/api/handleError';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const BASE_PATH = BASE_URL + '/api/users'

export const userService = {
    // Create User
    async createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
        try {
        const response = await axios.post(BASE_PATH, user);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch Users
    async fetchUsers(): Promise<User[]> {
        try{
        const response = await axios.get(BASE_PATH);
            return response.data;
        } catch(error) {
            throw handleError(error);
        }
    },

    // Fetch Single User
    async fetchUserById(id: number): Promise<User> {
        try {
            const response = await axios.get(`${BASE_PATH}/${id}`);
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
            const response = await axios.put(`${BASE_PATH}/${user.id}`, user);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Delete User
    async deleteUser(id: string): Promise<void> {
        try {
            await axios.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            throw handleError(error);
        }
    },
};