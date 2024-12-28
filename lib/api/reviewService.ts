import { Review } from '@/types/reviewTypes';
import { handleError } from '@/utils/api/handleError';
import axiosInstance from '@/utils/axios';

const BASE_PATH =  '/review'

export const reviewService = {
    // Create Review
    async createReview(review: Omit<Review, "id" | "createdAt" | "updatedAt">): Promise<Review> {
        try {
        const response = await axiosInstance.post(BASE_PATH, review);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Fetch Reviews
    async fetchReviews(): Promise<Review[]> {
        try{
        const response = await axiosInstance.get(BASE_PATH);
            return response.data;
        } catch(error) {
            throw handleError(error);
        }
    },

    // Fetch Single Review
    async fetchReviewById(id: string): Promise<Review> {
        try {
            const response = await axiosInstance.get(`${BASE_PATH}/${id}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Update Review
    async updateReview(review: Review): Promise<Review> {
        if (!review.id) {
            throw new Error('Review ID is required for update');
        }
        try {
            const response = await axiosInstance.put(`${BASE_PATH}/${review.id}`, review);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Delete Review
    async deleteReview(id: string): Promise<void> {
        try {
            await axiosInstance.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            throw handleError(error);
        }
    },
};