import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3 className="footer-logo">Chennai<span>Hub</span></h3>
              <p className="footer-desc">
                India's #1 destination for semi-permanent tattoos. Pain-free, waterproof, and lasts 1-2 weeks. Trusted by 5M+ customers.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/>
                    <polygon points="9.75,15.02 15.5,11.75 9.75,8.48"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Pinterest">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.15 9.43 7.6 11.21-.1-.94-.2-2.39.04-3.42.22-.93 1.42-6.02 1.42-6.02s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.76-2.24 3.76-5.49 0-2.87-2.06-4.87-5-4.87-3.41 0-5.41 2.56-5.41 5.21 0 1.03.4 2.13.89 2.73.1.12.11.22.08.34-.09.37-.29 1.19-.33 1.36-.05.22-.18.27-.41.16-1.51-.7-2.45-2.91-2.45-4.68 0-3.81 2.77-7.3 7.99-7.3 4.19 0 7.45 2.99 7.45 6.98 0 4.16-2.62 7.51-6.26 7.51-1.22 0-2.37-.63-2.76-1.38l-.75 2.86c-.27 1.04-1 2.35-1.49 3.15C9.57 23.81 10.75 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/collections/all">All Tattoos</Link></li>
                <li><Link to="/collections/best-selling">Best Sellers</Link></li>
                <li><Link to="/collections/new-arrivals">New Arrivals</Link></li>
                <li><Link to="/collections/all">Custom Design</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Collections</h4>
              <ul>
                <li><Link to="/collections/spiritual">Spiritual</Link></li>
                <li><Link to="/collections/anime">Anime</Link></li>
                <li><Link to="/collections/japanese">Japanese</Link></li>
                <li><Link to="/collections/love">Love & Couple</Link></li>
                <li><Link to="/collections/tribal">Tribal</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Help & Info</h4>
              <ul>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Refund Policy</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-newsletter">
        <div className="container">
          <h4>Subscribe to our newsletter</h4>
          <p>Get the latest updates on new tattoos and exclusive offers.</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Chennai Hub. All rights reserved.</p>
          <p className="made-by">Made by <a href="https://sanjai-alpha.vercel.app/" target="_blank" rel="noopener noreferrer">Sanjai</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
