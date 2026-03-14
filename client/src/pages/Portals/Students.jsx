import { memo } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Students = () => {
  return (
    <div className='bg-black w-screen h-screen'>
        <Navbar />
      <h2> Students</h2>
    </div>
  );
};

export default memo(Students);