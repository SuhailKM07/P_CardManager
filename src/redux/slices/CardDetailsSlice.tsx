import {createSlice} from '@reduxjs/toolkit';
import {getAllUsers} from '../../firebase/FireDaseDB';
import {useEffect} from 'react';

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

    FireBaseCardDetails(state, action) {
      // console.log(action);
      state.list = [...action.payload, ...state.list];
    },
  },
});

export const {AllCardDetails, FireBaseCardDetails} = CardDetailsSlice.actions;
export default CardDetailsSlice.reducer;
