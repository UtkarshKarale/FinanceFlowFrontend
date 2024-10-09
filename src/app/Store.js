import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../rereducers/authSlice'; // No need for .js extension
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web

// Redux Persist configuration
const persistConfig = {
  key: 'auth', // The key for the persisted state
  storage,     // Specifies storage engine (localStorage in this case)
};

// Wrapping the authReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configuring the store
const store = configureStore({
  reducer: {
    auth: persistedReducer, // Use the persisted version of the authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REGISTER'],
      },
    }),
});

// Creating the persistor
const persistor = persistStore(store);

// Export both store and persistor as named exports
export { store, persistor };
