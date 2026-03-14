import { memo } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const AdminLogin = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 text-white">
   <div className="bg-black/70 p-10 rounded-2xl w-96">

  <h2 className="text-2xl font-bold text-center">
    Admin Login
  </h2>

</div>
  </div>
    
    </>
);
};

export default memo(AdminLogin);