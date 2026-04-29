import { Link } from 'react-router-dom';
import { Paths } from '../../../Paths';
import error_img from '../../../../img/no_image.png';
import './Card.scss';
import React from 'react';

type TProps = {
  classname: string,
  id: number,
  category: number,
  title: string,
  price: number,
  images: string[]
}

export function Card(props: TProps): JSX.Element {
  const { classname, id, title, price, images } = props;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = error_img;
  }

  return (
    <div className={`col-4 ${classname}`}>
      <div className="card">
        <img
          src={images[0]}
          className="card-img-top img-fluid"
          onError={handleError}
          alt={title}
        />
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <Link to={`${Paths.CATALOG}${id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  )
}