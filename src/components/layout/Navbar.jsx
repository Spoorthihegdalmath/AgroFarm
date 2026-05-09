import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShoppingCart, User, Menu, X, UploadCloud } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = ({ onOpenAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Sprout size={28} className="logo-icon" />
          <span>AgroCulture</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Market</Link>
          <Link to="/farmer-dashboard" className="nav-link farmer-link">
            <UploadCloud size={16} /> Farmer Upload
          </Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>

        <div className="navbar-actions">
          <button className="icon-btn cart-toggle-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          
          <button className="btn btn-primary login-btn" onClick={onOpenAuth}>
            <User size={18} />
            <span>Login</span>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu animate-fade-in">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Market</Link>
          <Link to="/farmer-dashboard" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Farmer Upload</Link>
          <Link to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <button 
            className="mobile-nav-link text-primary" 
            style={{ textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', fontSize: '1rem', cursor: 'pointer' }}
            onClick={() => {
              setIsMenuOpen(false);
              onOpenAuth();
            }}
          >
            Login / Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
