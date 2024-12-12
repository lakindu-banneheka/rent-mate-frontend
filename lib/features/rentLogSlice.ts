import { RentLog, RentLogState } from '@/types/rentLog';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { rentLogService } from '../api/rentLogService';


// Async Thunks
export const createRentLog = createAsyncThunk(
  'rentLogs/createRentLog',
  async (rentLogData: Omit<RentLog,  "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      return await rentLogService.createRentLog(rentLogData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRentLogs = createAsyncThunk(
  'rentLogs/fetchRentLogs',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      return await rentLogService.fetchRentLogs();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRentLogById = createAsyncThunk(
  'rentLogs/fetchRentLogById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await rentLogService.fetchRentLogById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRentLog = createAsyncThunk(
  'rentLogs/updateRentLog',
  async (rentLog: RentLog, { rejectWithValue }) => {
    try {
      return await rentLogService.updateRentLog(rentLog);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRentLog = createAsyncThunk(
  'rentLogs/deleteRentLog',
  async (id: string, { rejectWithValue }) => {
    try {
      await rentLogService.deleteRentLog(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Initial State
const initialState: RentLogState = {
    rentLogs: [],
    selectedRentLog: null,
    loading: false,
    error: null,
};

// Slice
const rentLogSlice = createSlice({
    name: 'rentLogs',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedRentLog: (state) => {
            state.selectedRentLog = null;
        },
        setSelectedRentLog: (state, action: PayloadAction<RentLog | null>) => {
            state.selectedRentLog = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Create RentLog
        builder
            .addCase(createRentLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRentLog.fulfilled, (state, action) => {
                state.loading = false;
                state.rentLogs.push(action.payload);
                state.selectedRentLog = null;
            })
            .addCase(createRentLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch RentLogs
        builder
            .addCase(fetchRentLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRentLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.rentLogs = action.payload;
            })
            .addCase(fetchRentLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Single RentLog
        builder
            .addCase(fetchRentLogById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedRentLog = null;
            })
            .addCase(fetchRentLogById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRentLog = action.payload;
            })
            .addCase(fetchRentLogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update RentLog
        builder
            .addCase(updateRentLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRentLog.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.rentLogs.findIndex(rentLog => rentLog.id === action.payload.id);
                if (index !== -1) {
                state.rentLogs[index] = action.payload;
                }
                state.selectedRentLog = action.payload;
            })
            .addCase(updateRentLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete RentLog
        builder
            .addCase(deleteRentLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRentLog.fulfilled, (state, action) => {
                state.loading = false;
                state.rentLogs = state.rentLogs.filter(rentLog => rentLog.id !== action.payload);
                if (state.selectedRentLog?.id === action.payload) {
                state.selectedRentLog = null;
                }
            })
            .addCase(deleteRentLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { 
    clearError, 
    clearSelectedRentLog, 
    setSelectedRentLog 
} = rentLogSlice.actions;

export default rentLogSlice.reducer;

// Read this to get better understanding 
// https://lakindubanneheka.medium.com/a-comprehensive-guide-to-handling-asynchronous-actions-with-redux-toolkits-createasyncthunk-af66af3db2b2