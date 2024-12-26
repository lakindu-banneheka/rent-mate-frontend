import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { itemService } from '../api/itemService';
import { Item, ItemState } from '@/types/itemTypes';

// Async Thunks
export const createItem = createAsyncThunk(
  'items/createItem',
  async (itemData: Omit<Item,  "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      return await itemService.createItem(itemData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      return await itemService.fetchItems();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await itemService.fetchItemById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async (item: Item, { rejectWithValue }) => {
    try {
      return await itemService.updateItem(item);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id: string, { rejectWithValue }) => {
    try {
      await itemService.deleteItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Initial State
const initialState: ItemState = {
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
};

// Slice
const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        },
        setSelectedItem: (state, action: PayloadAction<Item | null>) => {
            state.selectedItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Create Item
        builder
            .addCase(createItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
                state.selectedItem = null;
            })
            .addCase(createItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Items
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Single Item
        builder
            .addCase(fetchItemById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedItem = action.payload;
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update Item
        builder
            .addCase(updateItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                state.items[index] = action.payload;
                }
                state.selectedItem = action.payload;
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete Item
        builder
            .addCase(deleteItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
                if (state.selectedItem?.id === action.payload) {
                state.selectedItem = null;
                }
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { 
    clearError, 
    clearSelectedItem, 
    setSelectedItem 
} = itemSlice.actions;

export default itemSlice.reducer;

// Read this to get better understanding 
// https://lakindubanneheka.medium.com/a-comprehensive-guide-to-handling-asynchronous-actions-with-redux-toolkits-createasyncthunk-af66af3db2b2