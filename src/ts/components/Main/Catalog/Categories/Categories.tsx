import { Category } from "./Category/Category";
import { ICategory } from '../../../../slices/catalogSlice/interfaces';
import { useAppSelector } from "../../../../hooks/hooks";
import { selectCategoriesError, selectCategoriesLoading } from "../../../../slices/categorySlice/categorySlice";
import { Error } from "../../../Error/Error";
import { nanoid } from 'nanoid'
import { fetchCategories } from "../../../../slices/asyncThunkCreator";

type TProps = { categories: ICategory[] }

export function Categories({ categories }: TProps): JSX.Element {
  const loading = useAppSelector(selectCategoriesLoading);
  const error = useAppSelector(selectCategoriesError);

  return (
    <>
      {
        !loading && <ul className="catalog-categories nav justify-content-center">
          {
            error && <Error
              text="Ошибка запроса категорий"
              error={error}
              clossest='.catalog-categories'
              callback={fetchCategories}
            />
          }
          {
            categories && categories.map((el) => <Category key={nanoid()} category={el} />)
          }
        </ul>
      }
    </>
  )
}