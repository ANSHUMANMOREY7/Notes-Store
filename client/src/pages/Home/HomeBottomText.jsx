import { memo, useEffect, useRef } from 'react';
import Button from '../../components/Buttons/Button';
import { BookOpen, FolderOpen, ShieldCheck } from 'lucide-react';

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
        <h2 className='home-mission-title font-[font1] text-white text-7xl p-10'>Study Smarter, Not Harder</h2>
        <div className='home-mission-lead font-[font1] px-10 text-3xl font-bold text-justify'>
          <h2>Your MCA Study Materials, All in One Place.</h2>
        </div>
        <div className="font-[font1] px-10 pt-4 pb-5 max-w-5xl">
  <p className="text-base md:text-lg text-gray-300 leading-relaxed ">
    Access organized study materials for every semester ,
    with resources arranged by subject and unit.
  </p>
</div>
      </div>
      
      <div className="px-10 flex flex-col gap-5 mt-3 text-lg text-gray-200 font-[font1]">

  <div className="flex items-center gap-4">
    <BookOpen size={22} className="text-purple-300" />
    <p>Semester-wise Notes</p>
  </div>

  <div className="flex items-center gap-4">
    <FolderOpen size={22} className="text-purple-300" />
    <p>Subject & Unit-wise Organization</p>
  </div>

  <div className="flex items-center gap-4">
    <ShieldCheck size={22} className="text-purple-300" />
    <p>Faculty-supervised Materials</p>
  </div>

</div>
     <div className="px-10 mt-6">
     <Button label="Explore Study Materials" />
     </div>
     
    </div>
    
    </>
  );
};

export default memo(HomeBottomText);