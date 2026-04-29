import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectCategoriesSelected, setSelected } from '../../../../../slices/categorySlice/categorySlice';
import { ICategory } from '../../../../../slices/catalogSlice/interfaces';
import { fetchCatalogItems } from '../../../../../slices/asyncThunkCreator';
import { } from '../../../../../slices/categorySlice/categorySlice'
import { selectCatalogSearch } from '../../../../../slices/catalogSlice/catalogSlice';

type TItem = { category: ICategory }

export function Category({ category }: TItem): JSX.Element {
  const selected = useAppSelector(selectCategoriesSelected);
  const search = useAppSelector(selectCatalogSearch)
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selected.id === category.id) {
      return;
    }
    dispatch(setSelected(category.id))
    dispatch(fetchCatalogItems({
      categoryId: category.id,
      q: search
    }))
  }

  return (
    <li className="nav-item">
      <a
        onClick={handleClick}
        className={selected.id === category.id ? "nav-link active" : "nav-link"}
        href="/">{category.title}
      </a>
    </li>
  )
}