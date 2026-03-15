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
      
        
    
  
  <div className="max-w-6xl mx-auto p-10 pt-24 relative z-10">
  <div className="flex justify-between items-center border-b border-white/20 pb-6 mb-10">
   <div>
    <h1 className="text-4xl font-bold font-[font1]">Admin Panel</h1>
    <p className="text-purple-300 mt-1">Manage your notes and uploads</p>
  </div>
  

<button 
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition duration-300 shadow-lg shadow-red-500/20 font-[font1]"
    >
      Logout
    </button>

</div>

      </div>
    </div>
  );
};
export default Admin;