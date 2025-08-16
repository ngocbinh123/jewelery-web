import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      {/* Main Header */}
      <div className="main-header">
        <div className="header-container">
          {/* Logo */}
          <div className="header-logo">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Ngọc Hải Đường Logo" className="logo-image" />
              <span className="logo-text">Ngọc Hải Đường</span>
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