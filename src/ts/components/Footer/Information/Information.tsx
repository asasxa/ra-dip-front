import { Link } from 'react-router-dom'
import { Paths } from '../../../Paths'

export function Information(): JSX.Element {
  return (
    <div className="col">
      <section>
        <h5>Информация</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={Paths.ABOUT} className="nav-link">О магазине</Link>
          </li>
          <li className="nav-item">
            <Link to={Paths.CATALOG} className="nav-link">Каталог</Link>
          </li>
          <li className="nav-item">
            <Link to={Paths.CONTACTS} className="nav-link">Контакты</Link>
          </li>
        </ul>
      </section>
    </div>
  )
}