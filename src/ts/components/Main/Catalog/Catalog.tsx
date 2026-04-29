import './Catalog.scss';
import { nanoid } from 'nanoid';
import { Card } from "../Card/Card";
import { CardList } from "./CardList/CardList";
import { Categories } from "./Categories/Categories";
import { More } from './More/More';
import { Preloader } from '../Preloader/Preloader';
import { ReactNode, useEffect } from 'react';
import {
  selectCategoriesSelected,
  selectCategories,
  selectCategoriesLoading
} from '../../../slices/categorySlice/categorySlice';
import {
  selectCatalogError,
  selectCatalogItems,
  selectCatalogLoading,
  selectCatalogSearch
} from '../../../slices/catalogSlice/catalogSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchCatalogItems, fetchCategories } from '../../../slices/asyncThunkCreator'
import { ICardItem } from '../../../slices/topSalesSlice/interfaces';

export function Catalog({ children }: { children: ReactNode }): JSX.Element {
  const items = useAppSelector(selectCatalogItems);
  const categories = useAppSelector(selectCategories);
  const catalogItemsLoading = useAppSelector(selectCatalogLoading);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const catalogItemsError = useAppSelector(selectCatalogError);
  const selectedCategory = useAppSelector(selectCategoriesSelected);
  const search = useAppSelector(selectCatalogSearch);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchCatalogItems({
      categoryId: selectedCategory.id,
      q: search,
    }));
  }, [])

  const catalogHeader = () =>
    <>
      {
        children
      }
      <Categories categories={categories} />
      {
        (catalogItemsLoading || categoriesLoading) && <Preloader />
      }
    </>

  const homePageCatalogHeader = () =>
    <>
      {
        catalogItemsLoading || categoriesLoading
          ? <Preloader />
          : <Categories categories={categories} />
      }
    </>

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {
        children ? catalogHeader() : homePageCatalogHeader()
      }
      <CardList>
        {
          (!catalogItemsError && items.length !== 0)
          &&
          items.map((el: ICardItem) => <Card key={nanoid()} {...el} classname='catalog-item-card' />)
        }
      </CardList>
      {
        !catalogItemsError && <More />
      }
    </section>
  )
}