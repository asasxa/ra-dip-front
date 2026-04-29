import React, { createRef, MutableRefObject, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectCatalogSearch, changeFied } from '../../../../slices/catalogSlice/catalogSlice';
import { selectCategoriesSelected } from '../../../../slices/categorySlice/categorySlice';
import { fetchCatalogItems } from '../../../../slices/asyncThunkCreator';

export function CatalogSearchHeader(): JSX.Element {
  const search = useAppSelector(selectCatalogSearch);
  const selected = useAppSelector(selectCategoriesSelected);
  const dispatch = useAppDispatch();
  const inputEl = createRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    inputEl.current.focus();
  }, [inputEl])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchCatalogItems({
      categoryId: selected.id,
      q: search
    }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(changeFied(value));
  }

  return (
    <>
      {
        <form
          onSubmit={handleSubmit}
          className="catalog-search-form form-inline">
          <input
            ref={inputEl}
            onChange={handleChange}
            value={search}
            className="form-control"
            placeholder="Поиск"
          />
        </form>
      }
    </>
  )
}

