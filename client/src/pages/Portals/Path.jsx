import { memo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './path.css';

const Path = () => {
  return (

   <div className='main-container font-[font1] font-bold'>
    <Navbar />
  <div className='student-sec'>
    <h1>Login as Student</h1>
  </div>
  <div className='admin-sec'>
    <h1>Login as Admin</h1>
  </div>
</div>
)
};

export default memo(Path);