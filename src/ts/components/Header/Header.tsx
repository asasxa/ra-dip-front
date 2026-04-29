import './Header.scss';
import { Logo } from './Logo/Logo';
import { Menu } from './Menu/Menu';

export function Header(): JSX.Element {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Logo />
            <Menu />
          </nav>
        </div>
      </div>
    </header>
  )
}