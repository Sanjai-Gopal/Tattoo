import { Link } from 'react-router-dom';
import { promoBanners } from '../../data/products';
import './PromoBanners.css';

function PromoBanners() {
  return (
    <section className="promo-banners section-padding">
      <div className="promo-scroll">
        {promoBanners.map((banner, i) => (
          <Link key={i} to={banner.link} className="promo-slide">
            <img src={banner.image} alt={banner.title} loading="lazy" />
            <div className="promo-overlay">
              <span className="promo-cta">{banner.cta}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PromoBanners;
