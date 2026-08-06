import { features } from '../../data/products';
import AnimatedNumber from '../AnimatedNumber/AnimatedNumber';
import './FeaturesGrid.css';

function featureText(feature) {
  if (feature.description === '30 seconds to apply') {
    return (
      <>
        <AnimatedNumber value={30} suffix=" seconds" /> to apply
      </>
    );
  }
  if (feature.description === 'Semi-permanent') {
    return (
      <>
        <AnimatedNumber value={1} suffix="-2 Weeks" />
      </>
    );
  }
  return feature.description;
}

function FeaturesGrid() {
  return (
    <section className="features-section section-padding" style={{background: 'var(--color-secondary-bg)'}}>
      <div className="container">
        <h2 className="section-title">Why Everyone's Switching to Chennai Hub</h2>
        <div className="features-grid reveal-stagger">
          {features.map((feature, i) => (
            <div key={i} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{featureText(feature)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesGrid;
