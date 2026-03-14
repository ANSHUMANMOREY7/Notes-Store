import { memo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './path.css';
import Button from '../../components/Navbar/Buttons/Button';

const Path = () => {
  return (

   <div className='main-container font-[font1] font-bold'>
    <Navbar />
  <div className='student-sec '>
    <h1> <Button > </Button></h1>
  </div>
  <div className='admin-sec'>
    <h1> <Button > </Button></h1>
  </div>
</div>
)
};

export default memo(Path);