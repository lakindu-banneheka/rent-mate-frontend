import { Review, ReviewState } from '@/types/reviewTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { reviewService } from '../api/reviewService';

// Async Thunks
export const createReview = createAsyncThunk(
  'Reviews/createReview',
  async (reviewData: Omit<Review,  "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      return await reviewService.createReview(reviewData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      return await reviewService.fetchReviews();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchReviewById = createAsyncThunk(
  'reviews/fetchReviewById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await reviewService.fetchReviewById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async (review: Review, { rejectWithValue }) => {
    try {
      return await reviewService.updateReview(review);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id: string, { rejectWithValue }) => {
    try {
      await reviewService.deleteReview(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Initial State
const initialState: ReviewState = {
    reviews: [],
    selectedReview: null,
    loading: false,
    error: null,
};

// Slice
const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedReview: (state) => {
            state.selectedReview = null;
        },
        setSelectedReview: (state, action: PayloadAction<Review | null>) => {
            state.selectedReview = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Create Review
        builder
            .addCase(createReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews.push(action.payload);
                state.selectedReview = null;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Reviews
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Single Review
        builder
            .addCase(fetchReviewById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedReview = null;
            })
            .addCase(fetchReviewById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedReview = action.payload;
            })
            .addCase(fetchReviewById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update Review
        builder
            .addCase(updateReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.reviews.findIndex(review => review.id === action.payload.id);
                if (index !== -1) {
                state.reviews[index] = action.payload;
                }
                state.selectedReview = action.payload;
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete Review
        builder
            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = state.reviews.filter(review => review.id !== action.payload);
                if (state.selectedReview?.id === action.payload) {
                state.selectedReview = null;
                }
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { 
    clearError, 
    clearSelectedReview, 
    setSelectedReview 
} = reviewSlice.actions;

export default reviewSlice.reducer;

// Read this to get better understanding 
// https://lakindubanneheka.medium.com/a-comprehensive-guide-to-handling-asynchronous-actions-with-redux-toolkits-createasyncthunk-af66af3db2b2