import { Rent, RentState } from '@/types/rentTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { rentService } from '../api/rentService';

// Async Thunks
export const createRent = createAsyncThunk(
  'rents/createRent',
  async (rentData: Omit<Rent,  "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      return await rentService.createRent(rentData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRents = createAsyncThunk(
  'rents/fetchRents',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      return await rentService.fetchRents();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRentById = createAsyncThunk(
  'rents/fetchRentById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await rentService.fetchRentById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRent = createAsyncThunk(
  'rents/updateRent',
  async (rent: Rent, { rejectWithValue }) => {
    try {
      return await rentService.updateRent(rent);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRent = createAsyncThunk(
  'rents/deleteRent',
  async (id: string, { rejectWithValue }) => {
    try {
      await rentService.deleteRent(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Initial State
const initialState: RentState = {
    rents: [],
    selectedRent: null,
    loading: false,
    error: null,
};

// Slice
const rentSlice = createSlice({
    name: 'rents',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedRent: (state) => {
            state.selectedRent = null;
        },
        setSelectedRent: (state, action: PayloadAction<Rent | null>) => {
            state.selectedRent = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Create Rent
        builder
            .addCase(createRent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRent.fulfilled, (state, action) => {
                state.loading = false;
                state.rents.push(action.payload);
                state.selectedRent = null;
            })
            .addCase(createRent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Rents
        builder
            .addCase(fetchRents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRents.fulfilled, (state, action) => {
                state.loading = false;
                state.rents = action.payload;
            })
            .addCase(fetchRents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Single Rent
        builder
            .addCase(fetchRentById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedRent = null;
            })
            .addCase(fetchRentById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRent = action.payload;
            })
            .addCase(fetchRentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update Rent
        builder
            .addCase(updateRent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.rents.findIndex(rent => rent.id === action.payload.id);
                if (index !== -1) {
                state.rents[index] = action.payload;
                }
                state.selectedRent = action.payload;
            })
            .addCase(updateRent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete Rent
        builder
            .addCase(deleteRent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRent.fulfilled, (state, action) => {
                state.loading = false;
                state.rents = state.rents.filter(rent => rent.id !== action.payload);
                if (state.selectedRent?.id === action.payload) {
                state.selectedRent = null;
                }
            })
            .addCase(deleteRent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { 
    clearError, 
    clearSelectedRent, 
    setSelectedRent 
} = rentSlice.actions;

export default rentSlice.reducer;

// Read this to get better understanding 
// https://lakindubanneheka.medium.com/a-comprehensive-guide-to-handling-asynchronous-actions-with-redux-toolkits-createasyncthunk-af66af3db2b2