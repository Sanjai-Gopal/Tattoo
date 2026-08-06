import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard/ProductCard';
import Reveal from '../components/Reveal/Reveal';
import usePageMeta from '../hooks/usePageMeta';
import './CollectionsPage.css';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Selling', value: 'best-selling' },
  { label: 'Newest', value: 'newest' },
];

const slugAliases = {
  'love-and-couple': 'love',
  'custom': 'custom',
  'custom-design': 'custom',
  'custom-tailored-collection': 'custom',
  'glow': 'glow',
  'glow-in-the-dark': 'glow',
  'buy-2-get-1-free': 'bundle',
  'bundles': 'bundles',
  'packs': 'packs',
  'men': 'men',
  'women': 'women',
  'gen-z': 'gen-z',
};

const customTitles = {
  custom: 'Custom Design',
  'glow-in-the-dark': 'Glow In The Dark',
  'buy-2-get-1-free': 'Buy 2 Get 1 Free',
  bundles: 'Tattoo Packs',
  packs: 'Tattoo Packs',
  men: 'Men',
  women: 'Women',
  'gen-z': 'Gen Z',
};

function productMatchesSlug(product, slug) {
  if (slug === 'all') return true;
  const key = slugAliases[slug] || slug;
  return (
    product.category.includes(key) ||
    product.tags.includes(key) ||
    product.name.toLowerCase().includes(key)
  );
}

function CollectionsPage() {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [filterTag, setFilterTag] = useState('all');

  const rawTitle = customTitles[slug] ||
    (slug === 'all'
      ? 'All Tattoo Designs'
      : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
  const pageTitle = rawTitle;

  usePageMeta({
    title: `${pageTitle} | Chennai Hub - Semi-Permanent Tattoos`,
    description: `Shop ${pageTitle.toLowerCase()} — semi-permanent tattoos from Chennai Hub. Pain-free, waterproof, lasts 1-2 weeks.`,
    canonical: `https://tattoo-sooty.vercel.app/collections/${slug}`,
  });

  const collectionProducts = useMemo(
    () =>
      slug === 'all' || slug === undefined
        ? products
        : products.filter(p => productMatchesSlug(p, slug)),
    [slug],
  );

  const tags = useMemo(() => {
    const t = new Set();
    collectionProducts.forEach(p => p.tags.forEach(tag => t.add(tag)));
    return ['all', ...Array.from(t)];
  }, [collectionProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...collectionProducts];

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
  }, [collectionProducts, sortBy, filterTag]);

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

        {collectionProducts.length === 0 ? (
          <div className="collections-empty">
            <h2>{pageTitle} — coming soon</h2>
            <p>We don&apos;t have designs in this collection yet, but the full catalog is ready.</p>
            <Link to="/collections/all" className="shop-all-btn">Shop All Designs</Link>
          </div>
        ) : (
          <>
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
                aria-label="Sort products"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="collections-empty">
                <p>No products found for this filter.</p>
                <button onClick={() => setFilterTag('all')}>Clear Filter</button>
              </div>
            ) : (
              <Reveal className="collections-grid-wrap">
                <div className="collections-grid reveal-stagger">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </Reveal>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CollectionsPage;
