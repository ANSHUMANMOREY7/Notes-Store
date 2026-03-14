import { memo } from 'react';
import React from 'react';
import './Navbar.css';
const Navbar = () => {
  return (
    <div className=' navbar font-[Font1]  '>
      
      <a href="#">Notes</a>
      <a href="#">About Us</a>
      <a href="#">Our Services</a>
      <a href="#">Contact Us</a>
        <a href="#">Admin Login</a>
        <a href="#">Sign Up</a>
      
    </div>
  );
};

export default memo(Navbar);