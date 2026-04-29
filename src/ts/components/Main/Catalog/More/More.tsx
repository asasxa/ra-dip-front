import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { fetchMoreItems } from '../../../../slices/asyncThunkCreator';
import { selectCatalogError, selectCatalogItems, selectCatalogLoading, selectCatalogSearch, selectMoreError, selectMoreLoading, selectMoreVisible } from '../../../../slices/catalogSlice/catalogSlice';
import { selectCategoriesSelected } from '../../../../slices/categorySlice/categorySlice';
import { Error } from '../../../Error/Error';
import { Preloader } from '../../Preloader/Preloader';

export function More(): JSX.Element {
  const selectedCategory = useAppSelector(selectCategoriesSelected);
  const items = useAppSelector(selectCatalogItems);
  const visible = useAppSelector(selectMoreVisible);
  const moreError = useAppSelector(selectMoreError);
  const catalogItemsError = useAppSelector(selectCatalogError)
  const moreLoading = useAppSelector(selectMoreLoading);
  const itemsLoading = useAppSelector(selectCatalogLoading)
  const search = useAppSelector(selectCatalogSearch);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(fetchMoreItems({
      categoryId: selectedCategory.id,
      offset: items.length,
      q: search
    }))
  }

  return (
    <div className="text-center">
      {
        moreError && <Error
          error={moreError}
          text={'Ошибка при попытке загрузить ещё'}
          clossest='.text-center'
          callback={() => fetchMoreItems({
            categoryId: selectedCategory.id,
            offset: items.length,
            q: search
          })}
        />
      }
      {
        moreLoading && !moreError && <Preloader />
      }
      {
        items.length === 0 && !catalogItemsError && !itemsLoading && !moreLoading &&
        <div style={{ fontSize: '1.2rem' }}>
          Ничего не нашлось...
        </div>
      }
      {
        visible && items.length >= 6 &&
        <button
          onClick={handleClick}
          className="btn btn-outline-primary">
          Загрузить ещё
        </button>
      }
    </div>
  )
}