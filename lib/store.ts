import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './features/categorySlice'
import itemReducer from './features/itemSlice'
import userReducer from './features/userSlice'
import rentReducer from './features/rentSlice'
import rentLogReducer from './features/rentLogSlice'
import reviewReducer from './features/reviewSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      category: categoryReducer,
      user: userReducer,
      item: itemReducer,
      rent: rentReducer,
      rentLog: rentLogReducer,
      review: reviewReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']