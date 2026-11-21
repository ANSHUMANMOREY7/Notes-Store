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



<div
  ref={sectionRef}
 className="home-mission w-full min-h-screen md:h-screen bg-gradient-to-b from-black to-purple-900 text-white p-5 sm:p-8 md:p-10 flex flex-col justify-start md:justify-center items-start relative overflow-hidden"
>

  <div className="home-mission-content w-full">

    {/* Main Heading */}
    <h2 className="home-mission-title font-[font1] text-white text-4xl sm:text-5xl lg:text-7xl px-0 md:px-10 pt-2 pb-5 md:py-10 leading-tight">
      Study Smarter, Not Harder
    </h2>

    {/* Subtitle */}
    <div className="home-mission-lead font-[font1] px-0 md:px-10 text-xl sm:text-2xl md:text-3xl font-bold">
      <h2>Your MCA Study Materials, All in One Place.</h2>
    </div>

    {/* Description */}
    <div className="font-[font1] px-0 md:px-10 pt-4 pb-5 max-w-5xl">
      <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
        Access organized study materials for every semester,
        with resources arranged by subject and unit.
      </p>
    </div>

  </div>

  {/* Features */}
  <div className="px-0 md:px-10 flex flex-col gap-5 mt-3 text-base sm:text-lg text-gray-200 font-[font1]">

    <div className="flex items-center gap-4">
      <BookOpen size={22} className="text-purple-300 shrink-0" />
      <p>Semester-wise Notes</p>
    </div>

    <div className="flex items-center gap-4">
      <FolderOpen size={22} className="text-purple-300 shrink-0" />
      <p>Subject & Unit-wise Organization</p>
    </div>

    <div className="flex items-center gap-4">
      <ShieldCheck size={22} className="text-purple-300 shrink-0" />
      <p>Faculty-supervised Materials</p>
    </div>

  </div>

  {/* CTA Button */}
  <div className="px-0 md:px-10 mt-8">
    <Button label="Explore Study Materials" />
  </div>

</div>
</>

  );
};

export default memo(HomeBottomText);