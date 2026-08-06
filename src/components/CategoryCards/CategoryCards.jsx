import { Link } from 'react-router';
import { collections } from '../../data/products';
import './CategoryCards.css';

function CategoryCards() {
  return (
    <section className="category-cards section-padding">
      <div className="container">
        <div className="category-grid reveal-stagger">
          {collections.map((col) => (
            <Link
              key={col.slug}
              to={`/collections/${col.slug}`}
              className="category-card"
            >
              <img src={col.image} alt={col.name} loading="lazy" />
              <div className="category-card-overlay">
                <h3>{col.name}</h3>
                <span className="shop-link">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryCards;
