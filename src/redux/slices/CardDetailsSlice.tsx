import {createSlice} from '@reduxjs/toolkit';

const CardDetailsSlice = createSlice({
  name: 'CardDetails',
  initialState: {
    list: [
      {
        name: 'scr',
        cardNo: 'scr',
        secretLable: '',
        cardHolder: '',
        exDate: '',
        pinCode: '',
      },
    ],
    error: '',
    loading: false,
  },
  reducers: {
    AllCardDetails(state, action) {
      state.list = [action.payload, ...state.list];
    },
  },
});

export const {AllCardDetails} = CardDetailsSlice.actions;
export default CardDetailsSlice.reducer;
