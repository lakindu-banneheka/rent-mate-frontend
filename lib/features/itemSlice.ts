// src/store/slices/itemSlice.ts
import { Item, ItemState } from '@/types/Item';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { itemService } from '../api/itemService';

// Async Thunks
export const createItem = createAsyncThunk(
  'items/createItem',
  async (itemData: Omit<Item, 'id'>, { rejectWithValue }) => {
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
    {
      page = 0, 
      size = 10, 
      sortBy = 'name', 
      searchTerm = ''
    }: {
      page?: number;
      size?: number;
      sortBy?: string;
      searchTerm?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      return await itemService.fetchItems(page, size, sortBy, searchTerm);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllItems = createAsyncThunk(
  'items/getAll',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      return await itemService.getAllItems();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id: number, { rejectWithValue }) => {
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
  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0
  }
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
        state.items = action.payload.content;
        state.pagination = {
          page: action.payload.content.length > 0 ? state.pagination.page : 0,
          size: state.pagination.size,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements
        };
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // get all Items
    builder
      .addCase(getAllItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, 'item slice all items')
        state.items = action.payload;
      })
      .addCase(getAllItems.rejected, (state, action) => {
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