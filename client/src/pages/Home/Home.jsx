import { memo } from 'react';
import Video from './Video';  
import HomeHeroText from './HomeHeroText';
import HomeBottomText from './HomeBottomText';
const Home = () => {
  return (
    <div>
      <div className='h-screen w-screen fixed top-0 left-0 z-0 '>
        <Video />
        </div>
        <div className='h-screen w-screen relative  '>
        <HomeHeroText />
        <HomeBottomText />
      </div>
    </div>
  );
};

export default memo(Home);