import HeroBanner from '../components/HeroBanner/HeroBanner';
import CategoryCards from '../components/CategoryCards/CategoryCards';
import CircularCollections from '../components/CircularCollections/CircularCollections';
import PromoBanners from '../components/PromoBanners/PromoBanners';
import FeaturesGrid from '../components/FeaturesGrid/FeaturesGrid';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel';
import Reveal from '../components/Reveal/Reveal';
import { products } from '../data/products';

function HomePage() {
  return (
    <>
      <h1 className="sr-only">Chennai Hub — Semi-Permanent Tattoos</h1>
      <HeroBanner />
      <Reveal><CategoryCards /></Reveal>
      <Reveal><CircularCollections /></Reveal>
      <Reveal><PromoBanners /></Reveal>
      <Reveal><FeaturesGrid /></Reveal>
      <Reveal><ProductCarousel products={products} title="Most Loved" /></Reveal>
      <Reveal>
        <ProductCarousel
          products={products.filter(p => p.category.includes('trending') || p.category.includes('new-arrivals'))}
          title="Trending Now"
        />
      </Reveal>
    </>
  );
}

export default HomePage;
