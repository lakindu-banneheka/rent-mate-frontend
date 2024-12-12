export interface Review {
    id: string; 
    reviewerId: string; 
    itemId: string; 
    comment: string; 
    rating: number; // 0 - 10 
    createdAt: Date;
    updatedAt: Date;
};

export interface ReviewState {
    reviews: Review[];
    selectedReview: Review | null;
    loading: boolean;
    error: string | null;
}