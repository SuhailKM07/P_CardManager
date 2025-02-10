import {createSlice} from '@reduxjs/toolkit';

const CardDetailsSlice = createSlice({
  name: 'CardDetails',
  initialState: {
    list: [],
    error: '',
    loading: false,
  },
  reducers: {
    AllCardDetails(state, action) {
      console.log(action.payload);
      //   state.list = action.payload;
    },
  },
});

export const {AllCardDetails} = CardDetailsSlice.actions;
export default CardDetailsSlice.reducer;
