import { memo } from 'react';
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className=' navbar font-[font1] '>
      
      <Link to="/">Home</Link>
     <Link to="/Student">Students</Link>
      <Link to="/about">About Us</Link>
      <Link to="/services">Our Services</Link>
      <Link to="/contact">Contact Us</Link>
      <Link to="/admin-login">Admin Login</Link>
      
      
    </div>
  );
};

export default memo(Navbar);