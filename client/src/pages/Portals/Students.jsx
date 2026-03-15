import { memo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';

const Students = () => {
  return (
    <>
    <div className='bg-black w-screen h-screen'>
        <Navbar />
      <h2> Students</h2>
    </div>
    <Footer />
    </>
  );
};

export default memo(Students);