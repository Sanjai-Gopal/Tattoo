import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard/ProductCard';
import './CollectionsPage.css';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Selling', value: 'best-selling' },
  { label: 'Newest', value: 'newest' },
];

function CollectionsPage() {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [filterTag, setFilterTag] = useState('all');

  const pageTitle = slug === 'all'
    ? 'All Tattoo Designs'
    : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const tags = useMemo(() => {
    const t = new Set();
    products.forEach(p => p.tags.forEach(tag => t.add(tag)));
    return ['all', ...Array.from(t)];
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filterTag !== 'all') {
      result = result.filter(p => p.tags.includes(filterTag));
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case 'best-selling':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [sortBy, filterTag]);

  return (
    <div className="collections-page">
      <div className="container">
        <div className="collections-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{pageTitle}</span>
        </div>

        <h1 className="collections-title">{pageTitle}</h1>
        <p className="collections-count">{filteredProducts.length} products</p>

        <div className="collections-toolbar">
          <div className="filter-tags">
            {tags.map(tag => (
              <button
                key={tag}
                className={`filter-tag ${filterTag === tag ? 'active' : ''}`}
                onClick={() => setFilterTag(tag)}
              >
                {tag === 'all' ? 'All' : tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="collections-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="collections-empty">
            <p>No products found for this filter.</p>
            <button onClick={() => setFilterTag('all')}>Clear Filter</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionsPage;
