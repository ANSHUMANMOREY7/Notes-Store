import { memo } from 'react';
import './Button.css';
const Button = ({ label , onClick}) => {
  return (
    
        <div className='main-btn font-[font1] font-bold weight-500 '>
      <button className='button' onClick={onClick}>
        {label}
      </button>
        </div>
    
  );
};

export default memo(Button);