import './TopSales.scss';
import { Preloader } from '../Preloader/Preloader';
import { Card } from '../Card/Card';
import { fetchTopSales } from '../../../slices/asyncThunkCreator';
import { Error } from '../../Error/Error';
import { ICardItem, ITopSalesState } from '../../../slices/topSalesSlice/interfaces';



export function TopSales({topSales, isLoading, error}: ITopSalesState): JSX.Element {

  return (
    <>
      {
        isLoading && <section className='top-sales'>
          <h2 className="text-center">Хиты продаж!</h2>
          <Preloader />
        </section>
      }
      {
        error && <section className='top-sales'>
          <h2 className="text-center">Хиты продаж!</h2>
          <Error
            error={error}
            text={'Ошибка запроса хитов продаж'}
            clossest='.top-sales'
            callback={fetchTopSales}
          />
        </section>
      }
      {
        topSales.length
          ? <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            {
              isLoading && <Preloader />
            }
            <div className="row">
              {
                topSales.map((el: ICardItem) => <Card key={el.id} {...el} classname='' />)
              }
            </div>
          </section>
          : null
      }
    </>
  )
}