import { SerializedError } from "@reduxjs/toolkit";

export type TSizes = {
  size: string,
  avalible: boolean,
}

export interface IProduct {
  id: number;
  category: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  heelsize: string;
  season: string;
  price: number;
  oldPrice: number;
  sizes: TSizes[];
}

export interface IProductPageState {
  item: IProduct | null;
  quantity: number;
  avalible: boolean;
  selectedSize: string;
  isLoading: boolean;
  error: SerializedError | null;
}
