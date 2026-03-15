import { memo } from 'react';
import Button from '../../components/Navbar/Buttons/Button';
const HomeBottomText = () => {
  return (
    <div className='w-screen h-screen bg-gradient-to-b from-black to-purple-900 text-white p-10 flex flex-col justify-center items-start relative overflow-hidden '>
      
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '10%', left: '20%' }}></div>
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '15%', left: '50%' }}></div>
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '20%', left: '80%' }}></div>
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '30%', left: '10%' }}></div>
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '40%', left: '70%' }}></div>
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '50%', left: '30%' }}></div>
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '60%', left: '90%' }}></div>
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '70%', left: '40%' }}></div>
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '80%', left: '60%' }}></div>
      <div className='absolute w-1 h-1 bg-white rounded-full animate-pulse' style={{ top: '90%', left: '15%' }}></div>
      <div className='absolute w-2 h-2 bg-blue-200 rounded-full animate-pulse' style={{ top: '25%', left: '45%' }}></div>
      <div className='absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse' style={{ top: '55%', left: '75%' }}></div>
      <div className='absolute w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse' style={{ top: '35%', left: '85%' }}></div>
      <div>
      <h2 className='font-[font1] text-white text-7xl p-10 '>Our Mission</h2>

      </div>
      <div className='font-[font1] px-10  text-3xl font-bold text-justify'>
        <h2>Providing a singular, reliable source for verified study materials.</h2>
      </div>
      <div className='font-[font1] px-10 py-10 text-1xl text-justify'>
       <p>" We provide a centralized, secure repository for MCA students to access high quality academic resources. By centralizing materials under faculty supervision, we eliminate the inefficiency of fragmented study notes and ensure that every resource from lecture modules to practical lab manuals remains fully aligned with the current university curriculum."</p>
      </div>
     <div>
      
     </div>
     <Button label="Lets Get Started" />
    </div>
    
  );
};

export default memo(HomeBottomText);