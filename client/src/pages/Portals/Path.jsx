import { memo } from "react";
import Navbar from "../../components/Navbar/Navbar";

const Path = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-hidden">
      

      <Navbar />
<div className="absolute inset-0 z-0">

  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"10%",left:"20%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"20%",left:"80%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"40%",left:"50%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"60%",left:"30%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"75%",left:"70%"}}></div>

</div>
      <div>
        Path Page
      </div>

    </div>
  );
};

export default memo(Path);