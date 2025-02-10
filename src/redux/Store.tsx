import {configureStore} from '@reduxjs/toolkit';
import CardDetailsSlice from './slices/CardDetailsSlice';

export const Store = configureStore({
  reducer: {
    CardDetailsSlice,
  },
});
