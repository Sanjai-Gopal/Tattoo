import { Link } from 'react-router';
import { heroSlides } from '../../data/products';
import { useState, useEffect } from 'react';
import './HeroBanner.css';

function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState([0]);

  useEffect(() => {
    if (paused) return undefined;

    const timer = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % heroSlides.length;
        setLoaded(prevLoaded =>
          prevLoaded.includes(next) ? prevLoaded : [...prevLoaded, next],
        );
        return next;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="hero-banner"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured tattoos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide ${i === current ? 'active' : ''}`}
          aria-hidden={i !== current}
        >
          <img
            src={loaded.includes(i) ? slide.image : undefined}
            alt={slide.title}
            decoding="async"
            fetchPriority={i === 0 ? 'high' : undefined}
          />
          <div className="hero-content">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <Link to={slide.link} className="hero-cta" tabIndex={i === current ? 0 : -1}>
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}
      <div className="hero-dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => {
              setCurrent(i);
              setLoaded(prev =>
                prev.includes(i) ? prev : [...prev, i],
              );
            }}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroBanner;
