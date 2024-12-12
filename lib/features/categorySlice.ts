import { Category, CategoryState } from '@/types/categoryTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { categoryService } from '../api/categoryService';

// Async Thunks
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData: Omit<Category,  "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      return await categoryService.createCategory(categoryData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      return await categoryService.fetchCategories();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await categoryService.fetchCategoryById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category: Category, { rejectWithValue }) => {
    try {
      return await categoryService.updateCategory(category);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      await categoryService.deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Initial State
const initialState: CategoryState = {
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
};

// Slice
const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },
        setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Create Category
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
                state.selectedCategory = null;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Categories
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Single Category
        builder
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedCategory = null;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update Category
        builder
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.categories.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                state.categories[index] = action.payload;
                }
                state.selectedCategory = action.payload;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete Category
        builder
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(category => category.id !== action.payload);
                if (state.selectedCategory?.id === action.payload) {
                state.selectedCategory = null;
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { 
    clearError, 
    clearSelectedCategory, 
    setSelectedCategory 
} = categorySlice.actions;

export default categorySlice.reducer;

// Read this to get better understanding 
// https://lakindubanneheka.medium.com/a-comprehensive-guide-to-handling-asynchronous-actions-with-redux-toolkits-createasyncthunk-af66af3db2b2