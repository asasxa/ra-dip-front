import { configureStore, isAction, Middleware } from '@reduxjs/toolkit';
import { topSalesReducer } from '../slices/topSalesSlice/topSalesSlice';
import { catalogItemsReducer } from '../slices/catalogSlice/catalogSlice';
import { categoryReducer } from '../slices/categorySlice/categorySlice'
import { iconSearchReducer } from '../slices/iconSearchSlice/iconSearchSlice';
import { productPageReducer } from '../slices/productPageSlice/productPageSlice';
import { cartReducer } from '../slices/cartSlice/cartSlice';
import { orderReducer } from '../slices/orderSlice/orderSlice';
import { ICartState } from '../slices/cartSlice/interfaces';

export const storageMiddleware: Middleware = (store) => (next) => (action) => {
  if (isAction(action) && action.type === 'cart/updateCart') {
    const cartState = store.getState().cart as ICartState;
    localStorage.setItem('cart', JSON.stringify({ items: cartState.items }))
  }
  return next(action);
}

export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    catalogItems: catalogItemsReducer,
    categories: categoryReducer,
    iconSearch: iconSearchReducer,
    product: productPageReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storageMiddleware)
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
