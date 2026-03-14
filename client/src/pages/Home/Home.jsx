import { memo } from 'react';
import Video from './Video';  
import HomeHeroText from './HomeHeroText';
import HomeBottomText from './HomeBottomText';
import Navbar from '../../components/Navbar/Navbar';
const Home = () => {
  return (
    <div>
      <Navbar />
    <div className='overflow-x-hidden overflow-y-auto'>
      <div className='h-screen w-screen absolute top-0  '>
        <Video />
        </div>
        <div className='w-screen h-screen relative flex flex-col justify-center items-center '>
        <HomeHeroText />
        
      </div>
      <div>
        <HomeBottomText />
      </div>
    </div>
    
    </div>
  );
};

export default memo(Home);