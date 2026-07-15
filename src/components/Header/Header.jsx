import { useState } from 'react';
import { Link } from 'react-router-dom';
import { announcements } from '../../data/products';
import './Header.css';

function AnnouncementBar() {
  const items = [...announcements, ...announcements, ...announcements];
  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        {items.map((text, i) => (
          <div className="announcement-item" key={i}>
            <span className="dot"></span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'All Tattoos', to: '/collections/all' },
    { label: 'Best Sellers', to: '/collections/best-selling' },
    { label: 'New Arrivals', to: '/collections/new-arrivals' },
  ];

  const exploreDropdown = [
    { label: 'Spiritual', to: '/collections/spiritual' },
    { label: 'Anime', to: '/collections/anime' },
    { label: 'Japanese', to: '/collections/japanese' },
    { label: 'Love', to: '/collections/love' },
    { label: 'Tribal', to: '/collections/tribal' },
    { label: 'Nature', to: '/collections/nature' },
    { label: 'Animal', to: '/collections/animal' },
    { label: 'Quotes', to: '/collections/quotes' },
  ];

  return (
    <>
      <AnnouncementBar />
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            Chennai<span>Hub</span>
          </Link>

          <nav className="header-nav">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
            <div className="nav-item">
              <span>Explore</span>
              <div className="nav-dropdown">
                {exploreDropdown.map(link => (
                  <Link key={link.to} to={link.to}>{link.label}</Link>
                ))}
              </div>
            </div>
            <Link to="/collections/all">Custom Design</Link>
            <Link to="/collections/all">Offers</Link>
          </nav>

          <div className="header-actions">
            <button aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <Link to="/collections/all" className="cart-btn" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="cart-count">0</span>
            </Link>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <span className="header-logo" style={{fontSize: 22}}>Chennai<span>Hub</span></span>
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>&times;</button>
        </div>
        <div className="mobile-nav-links">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>{link.label}</Link>
          ))}
          <Link to="/collections/all" onClick={() => setMobileOpen(false)}>Custom Design</Link>
          <Link to="/collections/all" onClick={() => setMobileOpen(false)}>Offers</Link>
          {exploreDropdown.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>{link.label}</Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
