import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { ICartItem, ICartState } from './interfaces';
import { fetchOrder } from '../asyncThunkCreator/index'

const getInitialState = (): ICartState => {
  const stored = localStorage.getItem('cart');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { items: parsed.items || [], loading: false, error: null, orderState: false };
    } catch {}
  }
  return { items: [], loading: false, error: null, orderState: false };
};

const initialState = getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<ICartItem>) {
      const index = state.items.findIndex(
        (el) => el.id === action.payload.id && el.size === action.payload.size
      )
      if (index !== -1) {
        state.items[index].quantity += action.payload.quantity;
        state.items[index].total += action.payload.total;
      } else {
        state.items.push(action.payload);
      }
    },
    removeProductFromCart(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },
    resetOrder(state) {
      state.orderState = false;
    },
    updateCart(state) {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderState = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<number>) => {
        if (action.payload === 204) {
          state.loading = false;
          state.items = [];
          state.orderState = true;
        }
      })
      .addCase(fetchOrder.rejected, (state, action: any) => {
        state.error = action.error;
        state.loading = false;
        state.orderState = false;
      });
  }
});

export const { addProductToCart, removeProductFromCart, updateCart, resetOrder } = cartSlice.actions;
export const selectCartItems = (state: TRootState) => state.cart.items;
export const selectOrederState = (state: TRootState) => state.cart.orderState;
export const selectOrderLoading = (state: TRootState) => state.cart.loading;
export const selectOrderError = (state: TRootState) => state.cart.error;
export const cartReducer = cartSlice.reducer;