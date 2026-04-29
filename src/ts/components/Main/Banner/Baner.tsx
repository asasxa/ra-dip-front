import banner from '../../../../img/banner.jpg';
import './Banner.scss';

export function Banner(): JSX.Element {
  return (
    <div className="banner">
      <img src={banner} className="img-fluid" alt="К весне готовы!" />
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  )
}