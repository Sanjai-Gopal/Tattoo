import { features } from '../../data/products';
import './FeaturesGrid.css';

function FeaturesGrid() {
  return (
    <section className="features-section section-padding" style={{background: 'var(--color-secondary-bg)'}}>
      <div className="container">
        <h2 className="section-title">Why Everyone's Switching to Chennai Hub</h2>
        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesGrid;
