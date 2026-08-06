import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { products } from '../data/products';
import StarRating from '../components/StarRating/StarRating';
import ProductCard from '../components/ProductCard/ProductCard';
import Reveal from '../components/Reveal/Reveal';
import { useCart } from '../context/CartContext';
import usePageMeta from '../hooks/usePageMeta';
import './ProductDetailPage.css';

const SITE_URL = 'https://tattoo-sooty.vercel.app';

function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

  usePageMeta({
    title: product ? `${product.name} | Chennai Hub - Semi-Permanent Tattoos` : 'Product Not Found | Chennai Hub',
    description: product?.description,
    canonical: product ? `${SITE_URL}/products/${product.slug}` : SITE_URL,
    image: product?.images?.[0],
  });

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

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    openCart();
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: `CHNHUB-${String(product.id).padStart(4, '0')}`,
    brand: { '@type': 'Brand', name: 'Chennai Hub' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      '@type': 'Offer',
      price: product.salePrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="product-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <div className="container">
        <div className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/collections/all">All Designs</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <Reveal className="pd-layout">
          <div className="pd-gallery">
            <div className="pd-main-image">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                decoding="async"
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
                    aria-label={`View image ${i + 1} of ${product.name}`}
                  >
                    <img src={img} alt="" loading="lazy" decoding="async" />
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
              <label htmlFor="pd-qty">Quantity</label>
              <div className="pd-qty-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">-</button>
                <span id="pd-qty" aria-live="polite">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
              </div>
            </div>

            <div className="pd-actions">
              <button className="pd-add-to-cart" onClick={handleAddToCart}>
                Add to Cart — ₹{product.salePrice * quantity}
              </button>
              <button className="pd-buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            <div className="pd-meta">
              <div className="pd-meta-item">
                <strong>SKU:</strong> CHNHUB-{String(product.id).padStart(4, '0')}
              </div>
              <div className="pd-meta-item">
                <strong>Category:</strong> {product.tags.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
              </div>
            </div>
          </div>
        </Reveal>

        {relatedProducts.length > 0 && (
          <Reveal className="pd-related">
            <h2 className="section-title">You May Also Like</h2>
            <div className="pd-related-grid reveal-stagger">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
