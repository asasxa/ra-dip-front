import { SerializedError } from '@reduxjs/toolkit';

export interface ICardItem {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

export interface ITopSalesState {
  isLoading: boolean;
  topSales: ICardItem[] | [];
  error: SerializedError | null;
}