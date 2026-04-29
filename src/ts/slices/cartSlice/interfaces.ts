import { SerializedError } from '@reduxjs/toolkit';

export interface ICartItem {
  id: number;
  title: string;
  size: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ICartState {
  items: ICartItem[];
  loading: boolean;
  error: SerializedError | null;
  orderState: boolean;
}

export type TTelephone = {
  [key: string]: string
}

export type TTelephoneNum = {
  num_1: string,
  num_2: string,
  num_3: string,
  num_4: string,
}

export interface IOrderState {
  telephone: TTelephone;
  addres: string;
  loading: boolean;
  error: SerializedError | null;
}