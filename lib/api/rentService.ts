import { Rent } from '@/types/rentTypes';
import { handleError } from '@/utils/api/handleError';
import axiosInstance from '@/utils/axios';

const BASE_PATH = '/rent'

export const rentService = {
    // Create Rent
    async createRent(rent: Omit<Rent, "id" | "createdAt" | "updatedAt">): Promise<Rent> {
        try {

            const newRent: Omit<Rent, "id" | "createdAt" | "updatedAt"> = {
                userId: localStorage.getItem('userId') || rent.userId,
                lenderId: rent.lenderId,
                itemId: rent.itemId,
                startDate: rent.startDate,
                endDate: rent.endDate,
                deliveryOption: rent.deliveryOption || null,
                itemCost: rent.itemCost || 0,
                totalCost: rent.totalCost || 0,
                paymentStatus: rent.paymentStatus || null,
                rentStatus: rent.rentStatus || null,
                itemReturnedDate: rent.itemReturnedDate || undefined, // optional property
                overDueFee: rent.overDueFee || 0,             // optional property
                quantity: rent.quantity || 0,
                billingDetails: rent.billingDetails || null,
            };
            console.log(newRent, localStorage.getItem('userId'), 'test')
            const response = await axiosInstance.post(BASE_PATH, newRent);
            return response.data;
        } catch (error) {
            console.log(error)
            throw handleError(error);
        }
    },

    // Fetch Rents
    async fetchRents(): Promise<Rent[]> {
        try{
            const response = await axiosInstance.get(BASE_PATH);
            return response.data;
        } catch(error) {
            throw handleError(error);
        }
    },

    // Fetch Single Rent
    async fetchRentById(id: string): Promise<Rent> {
        try {
            const response = await axiosInstance.get(`${BASE_PATH}/${id}`);
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
            const response = await axiosInstance.put(`${BASE_PATH}/${rent.id}`, rent);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Delete Rent
    async deleteRent(id: string): Promise<void> {
        try {
            await axiosInstance.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            throw handleError(error);
        }
    },
};