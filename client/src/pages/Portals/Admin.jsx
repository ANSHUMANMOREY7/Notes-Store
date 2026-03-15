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
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 text-white">

      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

    </div>
    
    </>
  );
};

export default Admin;