import { memo } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const AdminLogin = () => {
  return (
    <div>
        <Navbar />
      <h2>AdminLogin</h2>
    </div>
  );
};

export default memo(AdminLogin);