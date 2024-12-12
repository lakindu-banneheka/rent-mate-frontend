import { Category } from '@/types/categoryTypes';
import { handleError } from '@/utils/api/handleError';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const BASE_PATH = BASE_URL + '/api/categories'

export const categoryService = {
    // Create Category
    async createCategory(category: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
        try {
        const response = await axios.post(BASE_PATH, category);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch Categories
    async fetchCategories(): Promise<Category[]> {
        try{
        const response = await axios.get(BASE_PATH);
            return response.data;
        } catch(error) {
            throw handleError(error);
        }
    },

    // Fetch Single Category
    async fetchCategoryById(id: number): Promise<Category> {
        try {
            const response = await axios.get(`${BASE_PATH}/${id}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Update Category
    async updateCategory(category: Category): Promise<Category> {
        if (!category.id) {
            throw new Error('Category ID is required for update');
        }
        try {
            const response = await axios.put(`${BASE_PATH}/${category.id}`, category);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Delete Category
    async deleteCategory(id: string): Promise<void> {
        try {
            await axios.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            throw handleError(error);
        }
    },
};