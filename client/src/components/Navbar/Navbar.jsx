import { memo } from 'react';
import React from 'react';
import './Navbar.css';
import { Link ,useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("adminAuth") === "true";
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <div className='navbar font-[font1]'>
        <Link to="/"> <span className='icon-text'>Notes Store</span> </Link>
        
        <Link to="/about" className='bb'>About Us</Link>
        <Link to="/services" className='bb'>Our Services</Link>
        <Link to="/contact" className='bb'>Contact Us</Link>
        <Link to="/Student" className='bb'>Notes</Link>

        
        {isAdmin ? (
          <span 
            className='bb cursor-pointer text-red-500 font-bold' 
            onClick={handleLogout}
          >
            Logout
          </span>
        ) : (
          <Link to="/admin-login" className='bb'>Admin Login</Link>
        )}
      </div>
    </>
  );
};

export default memo(Navbar);