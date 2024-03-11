import { configureStore } from "@reduxjs/toolkit";
import { bookApiSlice } from "../features/api/bookApiSlice";
bookApiSlice;

export const store = configureStore({
  reducer: {
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApiSlice.middleware),
});
