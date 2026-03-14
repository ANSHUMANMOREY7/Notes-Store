import { memo } from 'react';
import Video from './Video';  
import HomeHeroText from './HomeHeroText';
import HomeBottomText from './HomeBottomText';
const Home = () => {
  return (
    <div className='overflow-x-hidden overflow-y-auto'>
      <div className='h-screen w-screen absolute top-0  '>
        <Video />
        </div>
        <div className='w-screen relative overflow-x-hidden '>
        <HomeHeroText />
        <HomeBottomText />
      </div>
    </div>
  );
};

export default memo(Home);