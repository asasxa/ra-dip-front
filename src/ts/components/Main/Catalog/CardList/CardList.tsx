import React, { ReactNode } from 'react'
import { useAppSelector } from '../../../../hooks/hooks'
import { fetchCatalogItems } from '../../../../slices/asyncThunkCreator';
import { selectCatalogError, selectCatalogSearch } from '../../../../slices/catalogSlice/catalogSlice';
import { selectCategoriesSelected } from '../../../../slices/categorySlice/categorySlice';
import { Error } from '../../../Error/Error'

type TProps = { children: ReactNode }

export function CardList({ children }: TProps): JSX.Element {
  const catalogItemsError = useAppSelector(selectCatalogError);
  const selectCategory = useAppSelector(selectCategoriesSelected);
  const search = useAppSelector(selectCatalogSearch);

  return (
    <div className="row">
      {
        catalogItemsError && <Error
          callback={() => fetchCatalogItems({
            categoryId: selectCategory.id,
            q: search
          })}
          clossest='.row'
          text='Ошибка запроса элементов каталога'
          error={catalogItemsError} />
      }
      {
        children
      }
    </div>
  )
}
