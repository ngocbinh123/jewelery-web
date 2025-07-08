import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Example cart count
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      {/* Promotional Banner */}
      <div className="promo-banner">
        <div className="promo-container">
          <span className="promo-text">
            🚚 Miễn phí vận chuyển cho đơn hàng trên 2.000.000đ
          </span>
          <button className="promo-close" aria-label="Đóng banner">
            ×
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="header-container">
          {/* Logo */}
          <div className="header-logo">
            <Link to="/" className="logo-link">
              <span className="logo-icon">💎</span>
              <span className="logo-text">Jewelry</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className={`header-nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${isActive('/')}`}>Trang chủ</Link>
              </li>
              <li className="nav-item">
                <Link to="/collection" className={`nav-link ${isActive('/collection')}`}>Bộ sưu tập</Link>
              </li>
              <li className="nav-item">
                <Link to="/#best-seller-section" className="nav-link">Best Seller</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${isActive('/about')}`}>Về chúng tôi</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Liên hệ</Link>
              </li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Search */}
            <button className="action-btn search-btn" aria-label="Tìm kiếm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            {/* User Account */}
            <button className="action-btn user-btn" aria-label="Tài khoản">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            {/* Shopping Cart */}
            <button className="action-btn cart-btn" aria-label="Giỏ hàng">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;