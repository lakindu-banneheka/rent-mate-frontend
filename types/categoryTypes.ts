export interface Category {
    id: string; 
    name: string; 
    description: string; 
    imageUrls: string;
    itemCount: number; 
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryState {
    categories: Category[];
    selectedCategory: Category | null;
    loading: boolean;
    error: string | null;
}