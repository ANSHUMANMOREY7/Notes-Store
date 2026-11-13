import { memo, useState } from 'react';
import React from 'react';
import './Navbar.css';
import { Link ,useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = sessionStorage.getItem("adminAuth") === "true";
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/");
    closeMenu();
    toast.success("Logged out successfully!");
  };
  return (
    <>
      <div className='navbar font-[font1]'>
        <Link to="/" onClick={closeMenu}>
          <span className='icon-text'>Notes Store</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>

        <div id="primary-navigation" className={`navbar-links${isMenuOpen ? ' is-open' : ''}`}>
          <Link to="/about" className='bb' onClick={closeMenu}>About Us</Link>
          <Link to="/contact" className='bb' onClick={closeMenu}>Contact Us</Link>
          <Link to="/Student" className='bb' onClick={closeMenu}>Notes</Link>
        
          {isAdmin ? (
            <span
              className='bb logout-btn'
              onClick={handleLogout}
            >
              Logout
            </span>
          ) : (
            <Link to="/admin-login" className='bb' onClick={closeMenu}>Admin Login</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);