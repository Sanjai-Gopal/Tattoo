import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import StarRating from '../components/StarRating/StarRating';
import ProductCard from '../components/ProductCard/ProductCard';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1>Product Not Found</h1>
        <p style={{ margin: '16px 0', color: 'var(--color-text-light)' }}>
          The product you're looking for doesn't exist.
        </p>
        <Link to="/collections/all" style={{
          display: 'inline-block',
          padding: '12px 32px',
          background: 'var(--color-black)',
          color: 'var(--color-white)',
          fontSize: '13px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>Shop All</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.tags.some(t => product.tags.includes(t)))
    .slice(0, 5);

  const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/collections/all">All Designs</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="pd-layout">
          <div className="pd-gallery">
            <div className="pd-main-image">
              <img
                src={product.images[activeImage]}
                alt={product.name}
              />
              {discount > 0 && (
                <span className="pd-badge">-{discount}%</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="pd-thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`pd-thumb ${i === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pd-info">
            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-rating">
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>

            <div className="pd-price-block">
              <span className="pd-sale-price">₹{product.salePrice}</span>
              <span className="pd-original-price">₹{product.price}</span>
              {discount > 0 && (
                <span className="pd-discount-tag">Save {discount}%</span>
              )}
            </div>

            <p className="pd-description">{product.description}</p>

            <div className="pd-features">
              <div className="pd-feature">✓ Semi-Permanent (1-2 Weeks)</div>
              <div className="pd-feature">✓ Waterproof</div>
              <div className="pd-feature">✓ Pain-Free Application</div>
              <div className="pd-feature">✓ Skin-Safe</div>
            </div>

            <div className="pd-quantity">
              <label>Quantity</label>
              <div className="pd-qty-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="pd-actions">
              <button className="pd-add-to-cart">
                Add to Cart — ₹{product.salePrice * quantity}
              </button>
              <button className="pd-buy-now">
                Buy Now
              </button>
            </div>

            <div className="pd-meta">
              <div className="pd-meta-item">
                <strong>SKU:</strong> INK-{String(product.id).padStart(4, '0')}
              </div>
              <div className="pd-meta-item">
                <strong>Category:</strong> {product.tags.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="pd-related">
            <h2 className="section-title">You May Also Like</h2>
            <div className="pd-related-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
