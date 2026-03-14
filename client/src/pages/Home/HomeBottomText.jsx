import { memo } from 'react';

const HomeBottomText = () => {
  return (
    <div className='w-screen h-screen bg-black text-white flex '>
      <div>
      <h1 >Our Mission</h1>

      </div>
      <div>
        <h2>Providing a singular, reliable source for verified study materials.</h2>
      </div>
      <div>
       <p>"We provide a centralized, secure repository for MCA students to access high-quality academic resources. By centralizing materials under faculty supervision, we eliminate the inefficiency of fragmented study notes and ensure that every resource—from lecture modules to practical lab manuals—remains fully aligned with the current university curriculum."</p>
      </div>
    </div>
  );
};

export default memo(HomeBottomText);