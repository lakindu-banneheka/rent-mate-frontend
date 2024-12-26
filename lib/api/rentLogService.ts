import { handleError } from '@/utils/api/handleError';
import { RentLog } from '@/types/rentLog';
import axiosInstance from '@/utils/axios';

const BASE_PATH = '/rentlog';

export const rentLogService = {
    // Create RentLog
    async createRentLog(rentLog: Omit<RentLog, "id" | "createdAt" | "updatedAt">): Promise<RentLog> {
        try {
        const response = await axiosInstance.post(BASE_PATH, rentLog);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch RentLogs
    async fetchRentLogs(): Promise<RentLog[]> {
        try{
        const response = await axiosInstance.get(BASE_PATH);
            return response.data;
        } catch(error) {
            throw handleError(error);
        }
    },

    // Fetch Single RentLog
    async fetchRentLogById(id: string): Promise<RentLog> {
        try {
            const response = await axiosInstance.get(`${BASE_PATH}/${id}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Update RentLog
    async updateRentLog(rentLog: RentLog): Promise<RentLog> {
        if (!rentLog.id) {
            throw new Error('RentLog ID is required for update');
        }
        try {
            const response = await axiosInstance.put(`${BASE_PATH}/${rentLog.id}`, rentLog);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Delete RentLog
    async deleteRentLog(id: string): Promise<void> {
        try {
            await axiosInstance.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            throw handleError(error);
        }
    },
};