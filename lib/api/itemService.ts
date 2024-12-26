import { Item } from '@/types/itemTypes';
import { handleError } from '@/utils/api/handleError';
import axiosInstance from '@/utils/axios';

const BASE_PATH = '/item'

export const itemService = {
    // Create Item
    async createItem(item: Omit<Item, "id" | "createdAt" | "updatedAt">): Promise<Item> {
        try {
        const response = await axiosInstance.post(BASE_PATH, item);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch Items
    async fetchItems(): Promise<Item[]> {
        try{
        const response = await axiosInstance.get(BASE_PATH);
            return response.data;
        } catch(error) {
            throw handleError(error);
        }
    },

    // Fetch Single Item
    async fetchItemById(id: string): Promise<Item> {
        try {
            const response = await axiosInstance.get(`${BASE_PATH}/${id}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Update Item
    async updateItem(item: Item): Promise<Item> {
        if (!item.id) {
            throw new Error('Item ID is required for update');
        }
        try {
            const response = await axiosInstance.put(`${BASE_PATH}/${item.id}`, item);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Delete Item
    async deleteItem(id: string): Promise<void> {
        try {
            await axiosInstance.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            throw handleError(error);
        }
    },
};