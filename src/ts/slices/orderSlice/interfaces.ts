import { SerializedError } from "@reduxjs/toolkit";

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
}