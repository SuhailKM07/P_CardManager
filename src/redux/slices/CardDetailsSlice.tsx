import {createSlice} from '@reduxjs/toolkit';

const CardDetailsSlice = createSlice({
  name: 'CardDetails',
  initialState: {
    list: [{name: 'scr'}],
    error: '',
    loading: false,
  },
  reducers: {
    AllCardDetails(state, action) {
      state.list = [...state.list, action.payload];
    },
  },
});

export const {AllCardDetails} = CardDetailsSlice.actions;
export default CardDetailsSlice.reducer;
