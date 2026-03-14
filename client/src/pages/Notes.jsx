import { memo } from 'react';
import Navbar from '../components/Navbar/Navbar';

const Students = () => {
  return (
    <div>
      <Navbar />
      <h2>Notessss</h2>
    </div>
  );
};

export default memo(Students);