import {configureStore} from '@reduxjs/toolkit';
import CardDetailsSlice from './slices/CardDetailsSlice';

export const Store = configureStore({
  reducer: {
    CardDetailsSlice: CardDetailsSlice,
  },
});
export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
