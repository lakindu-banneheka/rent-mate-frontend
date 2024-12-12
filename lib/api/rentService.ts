import { Rent } from '@/types/rentTypes';
import { handleError } from '@/utils/api/handleError';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const BASE_PATH = BASE_URL + '/api/rents'

export const rentService = {
    // Create Rent
    async createRent(rent: Omit<Rent, "id" | "createdAt" | "updatedAt">): Promise<Rent> {
        try {
        const response = await axios.post(BASE_PATH, rent);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch Rents
    async fetchRents(): Promise<Rent[]> {
        try{
        const response = await axios.get(BASE_PATH);
            return response.data;
        } catch(error) {
            throw handleError(error);
        }
    },

    // Fetch Single Rent
    async fetchRentById(id: number): Promise<Rent> {
        try {
            const response = await axios.get(`${BASE_PATH}/${id}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Update Rent
    async updateRent(rent: Rent): Promise<Rent> {
        if (!rent.id) {
            throw new Error('Rent ID is required for update');
        }
        try {
            const response = await axios.put(`${BASE_PATH}/${rent.id}`, rent);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Delete Rent
    async deleteRent(id: string): Promise<void> {
        try {
            await axios.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            throw handleError(error);
        }
    },
};