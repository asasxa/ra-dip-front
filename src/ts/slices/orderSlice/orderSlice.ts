import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { fetchOrder } from '../asyncThunkCreator';
import { IOrderState } from './interfaces';

const initialState: IOrderState = {
  telephone: {
    num_1: '',
    num_2: '',
    num_3: '',
    num_4: '',
  },
  addres: '',
};

type TChangePayload = {
  name: string,
  value: string,
}

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    changeFiels(state: IOrderState, action: PayloadAction<TChangePayload>) {
      const { name, value } = action.payload;
      if (name.startsWith('num')) {
        state.telephone[name] = value;
      }
      if (name === 'address') {
        state.addres = value;
      }
    },
    resetOrderForm(state: IOrderState) {
      state.telephone.num_1 = '';
      state.telephone.num_2 = '';
      state.telephone.num_3 = '';
      state.telephone.num_4 = '';
      state.addres = '';
    }
  }
});

export const orderReducer = orderSlice.reducer;
export const { changeFiels, resetOrderForm } = orderSlice.actions;
export const telephoneSelector = (state: TRootState) => state.order.telephone;
export const addressSelector = (state: TRootState) => state.order.addres;
