import { memo } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const AdminLogin = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 text-white">
    <div>
      Admin Login Page
    </div>
  </div>
    
    </>
);
};

export default memo(AdminLogin);