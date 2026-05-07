import { memo } from 'react';
import Button from '../../components/Buttons/Button';
import StarsBackground from '../../components/StarBackground';

const HomeBottomText = () => {
  return (
<>


    <div className='w-screen h-screen bg-gradient-to-b from-black to-purple-900 text-white p-10 flex flex-col justify-center items-start relative overflow-hidden '>
      
     <StarsBackground />
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
    
    </>
  );
};

export default memo(HomeBottomText);