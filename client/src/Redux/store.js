import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine your reducers here
const rootReducer = combineReducers({
  user: userReducer,
  // add other reducers here if needed
});

const persistConfig = {
  key: "root", // key to persist the root state
  storage, // storage engine
  version: 1, // version of the persisted state
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer for the root reducer
  middleware: (
    getDefaultMiddleware // Disable serializableCheck
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
