import { Link } from 'react-router-dom';
import { Paths } from '../../../Paths';
import logo from '../../../../img/header-logo.png';
import './Logo.scss';

export function Logo(): JSX.Element {
  return (
    <Link className='navbar-brand' to={Paths.HOME} >
      <img src={logo} alt="Bosa Noga" />
    </Link>
  )
}