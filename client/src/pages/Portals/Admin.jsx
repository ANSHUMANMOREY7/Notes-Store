import { memo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Navigate } from "react-router-dom";

const Admin = () => {
  const isAuth = localStorage.getItem("adminAuth");

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/"; 
  };

  if (!isAuth) {
    return <Navigate to="/admin-login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white font-[font1]">
      <Navbar />
      <div className="max-w-6xl mx-auto p-10 relative z-10">
        

        
      </div>
    </div>
  );
};
export default Admin;