import { memo } from 'react';

const HomeHeroText = () => {
  return (
    <>
    <div className=''>
      <h2 className='font-[Font1]  font-bold text-center text-[170px] p-3 text-white  tracking-tighter uppercase drop-shadow-2xl leading-[10vw] mt-50 '>NOTES STORE</h2>
     <h2 className='font-[Font1] font-bold text-center text-[50px]  text-white font-black tracking-tighter opacity-90 drop-shadow-2xl leading-[10vw]'>Skip the Fluff. Get the Notes.</h2>
    </div>
    
    </>
  );
};

export default memo(HomeHeroText);
