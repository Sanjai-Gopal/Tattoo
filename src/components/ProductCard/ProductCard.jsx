import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import './ProductCard.css';

function ProductCard({ product }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="product-card">
      <Link to={`/products/${product.slug}`} className="product-card-image">
        <img
          src={product.images[activeImage]}
          alt={product.name}
          loading="lazy"
        />
        {product.images.length > 1 && (
          <div className="product-card-thumbs">
            {product.images.slice(0, 4).map((img, i) => (
              <button
                key={i}
                className={`thumb ${i === activeImage ? 'active' : ''}`}
                onMouseEnter={() => setActiveImage(i)}
                onFocus={() => setActiveImage(i)}
              >
                <img src={img} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </Link>
      <div className="product-card-info">
        <Link to={`/products/${product.slug}`} className="product-card-name">
          {product.name}
        </Link>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="product-card-price">
          <span className="sale-price">₹{product.salePrice}</span>
          <span className="original-price">₹{product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
