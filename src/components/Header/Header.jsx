import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { announcements, products } from '../../data/products';
import AnimatedNumber from '../AnimatedNumber/AnimatedNumber';
import { useCart } from '../../context/CartContext';
import './Header.css';

function AnnouncementBar() {
  const items = [...announcements, ...announcements];
  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        {items.map((text, i) => (
          <div className="announcement-item" key={i}>
            <span className="dot"></span>
            <span>
              {text === 'Trusted by 5M+ Users' ? (
                <>
                  Trusted by <AnimatedNumber value={5} suffix="M+ Users" />
                </>
              ) : (
                text
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const results = query.trim().length > 0
    ? products
        .filter(p => {
          const q = query.trim().toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.tags.some(tag => tag.toLowerCase().includes(q)) ||
            p.category.some(cat => cat.toLowerCase().includes(q))
          );
        })
        .slice(0, 8)
    : [];

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <div className="search-box">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search tattoos, collections…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search products"
        />
        <button className="search-close" onClick={onClose} aria-label="Close search">
          ×
        </button>
      </div>
      <div className="search-results">
        {results.map(p => (
          <Link
            key={p.id}
            to={`/products/${p.slug}`}
            className="search-result"
            onClick={onClose}
          >
            <img src={p.images[0]} alt="" loading="lazy" />
            <div className="search-result-body">
              <span className="search-result-name">{p.name}</span>
              <span className="search-result-price">₹{p.salePrice}</span>
            </div>
          </Link>
        ))}
        {query.trim().length > 0 && results.length === 0 && (
          <p className="search-empty">No designs found for &ldquo;{query}&rdquo;.</p>
        )}
      </div>
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openCart } = useCart();
  const menuToggleRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

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

          <nav className="header-nav" aria-label="Primary">
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
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <Link
              to="/collections/all"
              className="cart-btn"
              aria-label={`Cart, ${count} items`}
              onClick={e => {
                e.preventDefault();
                openCart();
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="cart-count" key={count}>{count}</span>
            </Link>
            <button
              className="mobile-menu-btn"
              ref={menuToggleRef}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} id="mobile-nav" aria-label="Mobile menu">
        <div className="mobile-nav-header">
          <span className="header-logo" style={{fontSize: 22}}>Chennai<span>Hub</span></span>
          <button
            className="mobile-nav-close"
            ref={closeBtnRef}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default Header;
