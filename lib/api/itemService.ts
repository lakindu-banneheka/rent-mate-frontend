import { Item } from '@/types/Item';
import { handleError } from '@/utils/api/handleError';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const BASE_PATH = BASE_URL + '/api/items'

export const itemService = {
  // Create Item
  async createItem(item: Omit<Item, 'id'>): Promise<Item> {
    try {
      const response = await axios.post(BASE_PATH, item);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Fetch Items with Pagination and Search
  async fetchItems(
    page = 0, 
    size = 10, 
    sortBy = 'name',
    searchTerm = ''
  ): Promise<{
    content: Item[];
    totalPages: number;
    totalElements: number;
  }> {
    try {
      const response = await axios.get(BASE_PATH, {
        params: {
          page,
          size,
          sort: sortBy,
          search: searchTerm
        }
      });
      console.log(response.data, 'get all');
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  async getAllItems(): Promise<Item[]> {
    try{
      const response = await axios.get(BASE_PATH);
      return response.data;
    } catch(error) {
      throw handleError(error);
    }
  },

  // Fetch Single Item
  async fetchItemById(id: number): Promise<Item> {
    try {
      const response = await axios.get(`${BASE_PATH}/${id}`);
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
      const response = await axios.put(`${BASE_PATH}/${item.id}`, item);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Delete Item
  async deleteItem(id: string): Promise<void> {
    try {
      await axios.delete(`${BASE_PATH}/${id}`);
    } catch (error) {
      throw handleError(error);
    }
  },
};