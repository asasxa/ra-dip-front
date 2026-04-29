import React, { createRef, useEffect, MutableRefObject, ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import { Paths } from "../../../../../Paths";
import { changeFied, selectCatalogSearch } from "../../../../../slices/catalogSlice/catalogSlice";
import { selectClickedSearch } from "../../../../../slices/iconSearchSlice/iconSearchSlice";

export function SearchForm(): JSX.Element {
  const clicked = useAppSelector(selectClickedSearch);
  const search = useAppSelector(selectCatalogSearch);
  const dispatch = useAppDispatch();
  const inputRef = createRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, [clicked, inputRef])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(changeFied(value));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(Paths.CATALOG)
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-id="search-form"
      className={
        clicked
          ? "header-controls-search-form form-inline"
          : "header-controls-search-form form-inline invisible"}>
      <input
        ref={inputRef}
        onChange={handleChange}
        value={search}
        className="form-control"
        placeholder="Поиск"
      />
    </form>
  )
}