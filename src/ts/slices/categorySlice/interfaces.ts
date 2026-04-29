import { SerializedError } from "@reduxjs/toolkit";

export interface ICategory {
  id: number;
  title: string;
}

export interface ICategoryState {
  categories: ICategory[],
  error: SerializedError | null;
  isLoading: boolean;
  selected: { id: number };
}