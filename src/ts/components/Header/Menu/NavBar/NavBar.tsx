import { Link } from 'react-router-dom';
import { Paths } from '../../../../Paths';

export function NavBar(): JSX.Element {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to={Paths.HOME}>Главная</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={Paths.CATALOG}>Каталог</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={Paths.ABOUT}>О магазине</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={Paths.CONTACTS}>Контакты</Link>
      </li>
    </ul>
  )
}