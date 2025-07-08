import { configureStore } from '@reduxjs/toolkit';
import jewelryReducer from './slices/jewelrySlice';
import collectionReducer from './slices/collectionSlice';

export const store = configureStore({
  reducer: {
    jewelry: jewelryReducer,
    collection: collectionReducer,
  },
});

export default store; 