import axios from 'axios';

const BASE_URL = process.env.BACEND_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor -------------------------------- authorization add token part after reading Auth0 token store in local storage --

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken'); // Example for token
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;



// --------------------- How to use this in service file ---------------------------------------

// import axiosInstance from '@/utils/axios';
// import { Item } from '@/types/itemTypes';
// import { handleError } from '@/utils/api/handleError';

// const BASE_PATH = '/api/items';

// export const itemService = {
//   // Create Item
//   async createItem(item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> {
//     try {
//       const response = await axiosInstance.post(BASE_PATH, item);
//       return response.data;
//     } catch (error) {
//       throw handleError(error);
//     }
//   },

//   // Fetch Items
//   async fetchItems(): Promise<Item[]> {
//     try {
//       const response = await axiosInstance.get(BASE_PATH);
//       return response.data;
//     } catch (error) {
//       throw handleError(error);
//     }
//   },
// };
