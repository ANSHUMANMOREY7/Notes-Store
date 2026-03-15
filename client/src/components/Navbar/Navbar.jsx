import { memo } from 'react';
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import icon from '../../assets/Main-icon.png';


const Navbar = () => {
  return (
    <>
    
    <div className=' navbar font-[font1] '>
      <Link to="/" > <span className='icon-text '>Notes Store</span>  </Link>
      
      <Link to="/about" className='bb'>About Us</Link>
      <Link to="/services" className='bb'>Our Services</Link>
      <Link to="/contact" className='bb'>Contact Us</Link>
      <Link to="/Student" className='bb'>Students Login</Link>
      <Link to="/admin-login" className='bb'>Admin Login</Link>
      
      
    </div>
    </>
  );
};

export default memo(Navbar);
