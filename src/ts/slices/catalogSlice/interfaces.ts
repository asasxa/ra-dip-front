import { SerializedError } from "@reduxjs/toolkit";
import { ICardItem } from "../topSalesSlice/interfaces";

export interface ICategory {
  id: number;
  title: string;
}

export interface ICatalogState {
  itemsLoading: boolean;
  itemsError: SerializedError | null;
  items: ICardItem[];
  moreLoading: boolean;
  moreVisible: boolean;
  moreError: SerializedError | null;
  search: string;
}