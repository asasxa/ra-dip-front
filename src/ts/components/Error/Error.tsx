import './Error.scss';
import { SerializedError } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/hooks';

type TPropsError = {
  error: SerializedError,
  text: string,
  clossest: string,
  callback: Function
}

export function Error({ error, text, clossest, callback }: TPropsError): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent) => {
    if (error && e.currentTarget.closest(clossest)) {
      dispatch(callback())
    }
  }

  return (
    <div className="error">
      <div className="error__wrap">
        <div className="error__mes">{`${text}: ${error.message}`}</div>
        <button onClick={handleClick} className="error__btn">Повторить запрос</button>
      </div>
    </div>
  )
}