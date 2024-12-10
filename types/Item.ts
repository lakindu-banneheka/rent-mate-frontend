// src/types/Item.ts
export interface Item {
  id?: string; // Optional for create operations
  name: string;
  description: string;
  price: number;
  category: string;
  availableQuantity: number;
  imageUrl?: string;
}

export interface ItemState {
  items: Item[];
  selectedItem: Item | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}
