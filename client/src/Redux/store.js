import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Add userReducer to the store
  },
  middleware: (
    getDefaultMiddleware // Disable serializableCheck
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
