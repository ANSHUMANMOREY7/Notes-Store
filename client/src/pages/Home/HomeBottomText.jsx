import { memo, useEffect, useRef } from 'react';
import Button from '../../components/Buttons/Button';
import StarsBackground from '../../components/StarBackground';

const HomeBottomText = () => {
  const sectionRef = useRef(null);

  // Send the "stars-shuffle" signal whenever the mission section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dispatchEvent(new Event("stars-shuffle"));
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
<>


    <div ref={sectionRef} className='home-mission w-screen h-screen bg-gradient-to-b from-black to-purple-900 text-white p-10 flex flex-col justify-center items-start relative overflow-hidden'>
      
      <div className='home-mission-content'>
        <h2 className='home-mission-title font-[font1] text-white text-7xl p-10'>Our Mission</h2>
        <div className='home-mission-lead font-[font1] px-10 text-3xl font-bold text-justify'>
          <h2>Providing a singular, reliable source for verified study materials.</h2>
        </div>
        <div className='home-mission-description font-[font1] px-10 py-10 text-1xl text-justify'>
          <p>" We provide a centralized, secure repository for MCA students to access high quality academic resources. By centralizing materials under faculty supervision, we eliminate the inefficiency of fragmented study notes and ensure that every resource from lecture modules to practical lab manuals remains fully aligned with the current university curriculum."</p>
        </div>
      </div>
     <Button label="Lets Get Started" />
     
    </div>
    
    </>
  );
};

export default memo(HomeBottomText);