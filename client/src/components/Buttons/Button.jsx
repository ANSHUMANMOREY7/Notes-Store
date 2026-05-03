import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';
const Button = ({ label , onClick, to = '/Path', param, className = '', style = {} }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(to, { state: param });
    }
  };
  return (
    
        <div className='main-btn font-[font1] font-bold weight-500 '>
      <button className={`button ${className}`} style={style} onClick={handleClick}>
        {label}
      </button>
        </div>
    
  );
};

export default memo(Button);