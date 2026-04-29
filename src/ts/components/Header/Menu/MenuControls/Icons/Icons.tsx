import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks"
import { Paths } from "../../../../../Paths";
import { selectCartItems } from "../../../../../slices/cartSlice/cartSlice";
import { selectCatalogSearch } from "../../../../../slices/catalogSlice/catalogSlice";
import { selectClickedSearch, setSearchActive, setSearchNotActive } from "../../../../../slices/iconSearchSlice/iconSearchSlice";

export function Icons(): JSX.Element {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectCatalogSearch);
  const clickedSearch = useAppSelector(selectClickedSearch);
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);
  const storageData = JSON.parse(localStorage.getItem('cart') as string);
  const quantity = storageData ? storageData.items.length : cartItems.length;

  const onSearchClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickedSearch && search) {
      navigate(Paths.CATALOG)
    } else {
      dispatch(setSearchNotActive())
    }

    if (!clickedSearch) {
      dispatch(setSearchActive())
    }
  }

  const onCartClick = () => {
    navigate(Paths.CART)
  }

  return (
    <div className="header-controls-pics">
      <div
        onClick={onSearchClick}
        data-id="search-expander"
        className="header-controls-pic header-controls-search">
      </div>
      <div
        className="header-controls-pic header-controls-cart"
        onClick={onCartClick}>
        {
          quantity !== 0 && <div className="header-controls-cart-full">{quantity}</div>
        }
        <div className="header-controls-cart-menu"></div>
      </div>
    </div>
  )
}