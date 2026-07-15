import { Link } from 'react-router-dom';
import { circularCollections } from '../../data/products';
import './CircularCollections.css';

function CircularCollections() {
  return (
    <section className="circular-collections section-padding">
      <div className="container">
        <h2 className="section-title">2-WEEK SEMI-PERMANENT TATTOOS</h2>
        <div className="circular-grid">
          {circularCollections.map((col) => (
            <Link
              key={col.slug}
              to={`/collections/${col.slug}`}
              className="circular-item"
            >
              <div className="circular-img">
                <img src={col.image} alt={col.name} loading="lazy" />
              </div>
              <span className="circular-label">{col.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CircularCollections;
