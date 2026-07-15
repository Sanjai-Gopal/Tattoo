import { Link } from 'react-router-dom';
import { heroSlides } from '../../data/products';
import { useState, useEffect } from 'react';
import './HeroBanner.css';

function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-banner">
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide ${i === current ? 'active' : ''}`}
        >
          <img src={slide.image} alt={slide.title} />
          <div className="hero-content">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <Link to={slide.link} className="hero-cta">{slide.cta}</Link>
          </div>
        </div>
      ))}
      <div className="hero-dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroBanner;
