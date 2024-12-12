import axios from 'axios';
import { handleError } from '@/utils/api/handleError';
import { RentLog } from '@/types/rentLog';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const BASE_PATH = BASE_URL + '/api/rentLogs'

export const rentLogService = {
    // Create RentLog
    async createRentLog(rentLog: Omit<RentLog, "id" | "createdAt" | "updatedAt">): Promise<RentLog> {
        try {
        const response = await axios.post(BASE_PATH, rentLog);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch RentLogs
    async fetchRentLogs(): Promise<RentLog[]> {
        try{
        const response = await axios.get(BASE_PATH);
            return response.data;
        } catch(error) {
            throw handleError(error);
        }
    },

    // Fetch Single RentLog
    async fetchRentLogById(id: number): Promise<RentLog> {
        try {
            const response = await axios.get(`${BASE_PATH}/${id}`);
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
            const response = await axios.put(`${BASE_PATH}/${rentLog.id}`, rentLog);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Delete RentLog
    async deleteRentLog(id: string): Promise<void> {
        try {
            await axios.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            throw handleError(error);
        }
    },
};