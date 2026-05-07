import { memo } from 'react';
import React from 'react';
import './Navbar.css';
import { Link ,useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
 const isAdmin = sessionStorage.getItem("adminAuth") === "true";
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/");
    
    toast.success("Logged out successfully!");
  };
  return (
    <>
      <div className='navbar font-[font1]'>
        
        <Link to="/"> 
        <span className='icon-text'>Notes Store</span> </Link>
        
        <Link to="/about" className='bb'>About Us</Link>
        <Link to="/contact" className='bb'>Contact Us</Link>
        <Link to="/Student" className='bb'>Notes</Link>

        
        {isAdmin ? (
          <span 
            className='bb logout-btn' 
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