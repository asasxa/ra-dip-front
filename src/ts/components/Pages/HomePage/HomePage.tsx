import { TopSales } from "../../Main/TopSales/TopSales";
import { Catalog } from "../../Main/Catalog/Catalog";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { resetForm } from "../../../slices/catalogSlice/catalogSlice";
import { fetchTopSales } from "../../../slices/asyncThunkCreator";
import {
  selectTopSalesError,
  selectTopSalesLoading,
  selectTopSales
} from '../../../slices/topSalesSlice/topSalesSlice';

export function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectTopSalesError);
  const isLoading = useAppSelector(selectTopSalesLoading);
  const topSales = useAppSelector(selectTopSales);

  useEffect(() => {
    dispatch(fetchTopSales());
    dispatch(resetForm());
  }, [dispatch])

  return (
    <>
      <TopSales isLoading={isLoading} topSales={topSales} error={error} />
      <Catalog>
        {null}
      </Catalog>
    </>
  )
}