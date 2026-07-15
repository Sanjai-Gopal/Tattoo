import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '../ProductCard/ProductCard';
import './ProductCarousel.css';
import 'swiper/css';
import 'swiper/css/navigation';

const tabs = [
  { label: 'All Designs', filter: () => true },
  { label: 'Best Selling', filter: (p) => p.category.includes('best-selling') },
  { label: 'New Arrivals', filter: (p) => p.category.includes('new-arrivals') },
  { label: 'Trending', filter: (p) => p.category.includes('trending') },
];

function ProductCarousel({ products, title = "Most Loved" }) {
  const [activeTab, setActiveTab] = useState(0);
  const filtered = products.filter(tabs[activeTab].filter);

  return (
    <section className="product-carousel-section section-padding">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="carousel-tabs">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`carousel-tab ${i === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="carousel-wrapper">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              480: { slidesPerView: 2.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 4.5 },
              1280: { slidesPerView: 5.5 },
            }}
          >
            {filtered.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="carousel-footer">
          <Link to="/collections/all" className="shop-all-btn">Shop All</Link>
        </div>
      </div>
    </section>
  );
}

export default ProductCarousel;
