import { memo } from 'react';

const Video = () => {
  return (
    <div className='w-full h-full relative overflow-hidden '>
     <video className='h-full w-full object-cover' src="https://cdn.pixabay.com/video/2015/10/16/1046-142621379_medium.mp4" autoPlay loop muted></video>
     <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70'></div>
    </div>
  );
};

export default memo(Video);