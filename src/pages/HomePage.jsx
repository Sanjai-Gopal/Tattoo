import HeroBanner from '../components/HeroBanner/HeroBanner';
import CategoryCards from '../components/CategoryCards/CategoryCards';
import CircularCollections from '../components/CircularCollections/CircularCollections';
import PromoBanners from '../components/PromoBanners/PromoBanners';
import FeaturesGrid from '../components/FeaturesGrid/FeaturesGrid';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel';
import { products } from '../data/products';

function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryCards />
      <CircularCollections />
      <PromoBanners />
      <FeaturesGrid />
      <ProductCarousel products={products} title="Most Loved" />
      <ProductCarousel
        products={products.filter(p => p.category.includes('trending') || p.category.includes('new-arrivals'))}
        title="Trending Now"
      />
    </>
  );
}

export default HomePage;
