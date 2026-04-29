import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import error_img from '../../../../img/no_image.png';
import { nanoid } from 'nanoid';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchProduct } from '../../../slices/asyncThunkCreator';
import { increment, decrement, setTheSize, resetSize } from '../../../slices/productPageSlice/productPageSlice';
import { Error } from '../../Error/Error';
import { Preloader } from '../../Main/Preloader/Preloader';
import { Paths } from '../../../Paths';
import { ICartItem } from '../../../slices/cartSlice/interfaces';
import { addProductToCart, updateCart } from '../../../slices/cartSlice/cartSlice';
import {
  selectAvalible,
  selectProduct,
  selectProductError,
  selectProductLoading,
  selectQuantity,
  selectSelectedSize
} from '../../../slices/productPageSlice/productPageSlice';

export function CatalogItem(): JSX.Element {
  const { id } = useParams() as any;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectProduct);
  const quantity = useAppSelector(selectQuantity);
  const avalible = useAppSelector(selectAvalible);
  const selectedSize = useAppSelector(selectSelectedSize);
  const productLoading = useAppSelector(selectProductLoading);
  const productError = useAppSelector(selectProductError);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = error_img;
  }

  const onSelectSizeClick = (size: string) => {
    if (size === selectedSize) {
      dispatch(resetSize())
    } else {
      dispatch(setTheSize(size))
    }
  }

  const onCartBtnClick = () => {
    const product: ICartItem = {
      id: item?.id as number,
      title: item?.title as string,
      price: item?.price as number,
      quantity,
      size: selectedSize,
      total: (item?.price as number) * quantity
    }
    dispatch(addProductToCart(product));
    dispatch(updateCart());
    navigate(Paths.CART)
  }

  return (
    <>
      <section className="catalog-item">
        <h2 className="text-center">{item?.title}</h2>
        {
          productLoading && <Preloader />
        }
        {
          productError && <Error
            error={productError}
            text='Ошибка запроса информации о товаре'
            clossest='.catalog-item'
            callback={() => fetchProduct(id)}
          />
        }
        <div className="row">
          <div className="col-5">
            <img
              src={item?.images[0]}
              className="img-fluid"
              alt={item?.title}
              onError={handleImgError}
            />
          </div>
          {
            item && <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{item?.sku || ''}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item?.manufacturer || ''}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item?.color || ''}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item?.material || ''}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item?.season || ''}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item?.reason || ''}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                {
                  avalible
                    ? <p>Размеры в наличии:
                      {
                        item?.sizes
                          .filter((el) => el.avalible)
                          .map((el) =>
                            <span
                              key={nanoid()}
                              onClick={() => onSelectSizeClick(el.size)}
                              className={selectedSize === el.size ? 'catalog-item-size selected' : 'catalog-item-size'}>
                              {el.size}
                            </span>)
                      }
                    </p>
                    : <p>Товара нет в наличии</p>
                }
                {
                  avalible && <p>
                    Количество:
                    <span className="btn-group btn-group-sm pl-2">
                      <button
                        onClick={() => dispatch(decrement())}
                        className="btn btn-secondary">
                        -
                      </button>
                      <span className="btn btn-outline-primary">{quantity}</span>
                      <button
                        onClick={() => dispatch(increment())}
                        className="btn btn-secondary">
                        +
                      </button>
                    </span>
                  </p>
                }
              </div>
              {
                (avalible && selectedSize)
                &&
                <button
                  onClick={onCartBtnClick}
                  className="btn btn-danger btn-block btn-lg">
                  В корзину
                </button>
              }
            </div>
          }
        </div>
      </section>
    </>
  )
}