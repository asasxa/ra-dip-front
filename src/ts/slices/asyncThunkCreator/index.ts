import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../catalogSlice/interfaces';
import { IProduct } from '../productPageSlice/interfaces';
import { ICardItem } from '../topSalesSlice/interfaces';

const getFetchTopSales = async (retryCount = 3): Promise<ICardItem[]> => {
  if (retryCount) {
    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}/api/top-sales`)
      const response = await fetch(url);
      if (!response.ok) {
        return getFetchTopSales(retryCount - 1)
      }
      const data = await response.json();
      return data as ICardItem[];
    } catch (error) {
      return getFetchTopSales(retryCount - 1)
    }
  }
  throw Error('Превышен лимит попыток запроса');
}
export const fetchTopSales = createAsyncThunk('api/top-sales', getFetchTopSales)

const getFetchCatigories = async (retryCount = 3): Promise<ICategory[]> => {
  if (retryCount) {
    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}/api/categories`)
      const response = await fetch(url);
      if (!response.ok) {
        return getFetchCatigories(retryCount - 1)
      }
      return (await response.json()) as ICategory[];
    } catch (error) {
      return getFetchCatigories(retryCount - 1)
    }
  }
  throw Error('Превышен лимит попыток запроса')
}
export const fetchCategories = createAsyncThunk('api/categories', getFetchCatigories)

type TFetchProps = {
  categoryId?: number,
  offset?: number,
  q?: string;
}

let controller: AbortController;
let signal: AbortSignal;

const createRequestItems = async (options: TFetchProps) => {
  const getRetryFetch = async (retryCount = 3): Promise<ICardItem[]> => {
    if (retryCount) {
      try {
        const categoryId = options.categoryId ? options.categoryId : 0;
        const offset = options.offset ? options.offset : 0;
        const q = options.q ? options.q : '';
        const query = new URLSearchParams({
          categoryId: `${categoryId}`,
          offset: `${offset}`,
          q: `${q}`
        });
        if (controller) {
          controller.abort();
        }
        controller = new AbortController();
        signal = controller.signal;
        const url = new URL(`${import.meta.env.VITE_API_URL}/api/items?${query}`);
        const response = await fetch(url, { signal });
        if (!response.ok) {
          return getRetryFetch(retryCount - 1);
        }
        return (await response.json()) as ICardItem[];
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.warn('Запрос был отменён.');
            return [];
          }
          return getRetryFetch(retryCount - 1);
        }
      }
    }
    throw Error('Превышен лимит попыток запроса');
  }
  return getRetryFetch();
}
export const fetchCatalogItems = createAsyncThunk('api/items', createRequestItems)
export const fetchMoreItems = createAsyncThunk('api/items/more', createRequestItems);

const getFetchProduct = async (id: string) => {
  const getRetryFetch = async (retryCount = 3): Promise<IProduct> => {
    if (retryCount) {
      try {
        const url = new URL(`${import.meta.env.VITE_API_URL}/api/items/${id}`)
        const response = await fetch(url);
        if (!response.ok) {
          return getRetryFetch(retryCount - 1)
        }
        const result = await response.json();
        return result as IProduct;
      } catch {
        return getRetryFetch(retryCount - 1)
      }
    }
    throw Error('Превышен лимит попыток запроса');
  }
  return getRetryFetch();
}
export const fetchProduct = createAsyncThunk('api/items/:id', getFetchProduct)

export type TBody = {
  owner: { phone: string, address: string },
  items: { id: number, price: number, count: number }[]
}

const getFetchOrder = async (body: TBody) => {
  const getRetryFetch = async (retryCount = 3): Promise<number> => {
    if (retryCount) {
      try {
        const url = new URL(`${import.meta.env.VITE_API_URL}/api/order`);
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!response.ok) {
          return getRetryFetch(retryCount - 1);
        }
        localStorage.clear();
        return response.status;
      } catch (error) {
        return getRetryFetch(retryCount - 1);
      }
    }
    throw Error('Превышен лимит попыток запроса');
  }
  return getRetryFetch();
}
export const fetchOrder = createAsyncThunk('api/order', getFetchOrder)