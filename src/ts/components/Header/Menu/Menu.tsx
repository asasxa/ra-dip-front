import { NavBar } from './NavBar/NavBar';
import { MenuControls } from './MenuControls/MenuControls'

export function Menu(): JSX.Element {
  return (
    <div className="collapase navbar-collapse" id="navbarMain">
      <NavBar />
      <MenuControls />
    </div>
  )
}