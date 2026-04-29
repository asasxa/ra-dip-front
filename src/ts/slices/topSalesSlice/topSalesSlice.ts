import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { ICardItem, ITopSalesState } from './interfaces';
import { fetchTopSales } from '../asyncThunkCreator'

const initialState: ITopSalesState = {
  isLoading: false,
  topSales: [],
  error: null
}

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.topSales = [];
      })
      .addCase(fetchTopSales.fulfilled, (state, action: PayloadAction<ICardItem[]>) => {
        state.isLoading = false;
        state.topSales = [...action.payload];
        state.error = null;
      })
      .addCase(fetchTopSales.rejected, (state, action: any) => {
        state.isLoading = false;
        state.topSales = [];
        state.error = action.error;
      });
  }
});

export const selectTopSalesError = (state: TRootState) => state.topSales.error;
export const selectTopSales = (state: TRootState) => state.topSales.topSales;
export const selectTopSalesLoading = (state: TRootState) => state.topSales.isLoading;
export const topSalesReducer = topSalesSlice.reducer;