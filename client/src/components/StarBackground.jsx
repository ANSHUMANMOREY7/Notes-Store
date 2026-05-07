import React from 'react';

const StarsBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Small stars */}
      {[
        { t: "5%", l: "10%" }, { t: "10%", l: "20%" }, { t: "15%", l: "50%" },
        { t: "20%", l: "80%" }, { t: "25%", l: "35%" }, { t: "30%", l: "10%" },
        { t: "35%", l: "60%" }, { t: "40%", l: "70%" }, { t: "45%", l: "15%" },
        { t: "50%", l: "30%" }, { t: "55%", l: "75%" }, { t: "60%", l: "90%" },
        { t: "65%", l: "40%" }, { t: "70%", l: "55%" }, { t: "75%", l: "25%" },
        { t: "80%", l: "60%" }, { t: "85%", l: "45%" }, { t: "90%", l: "15%" },
      ].map((pos, i) => (
        <div 
          key={`small-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse" 
          style={{ top: pos.t, left: pos.l }}
        ></div>
      ))}

      {/* Medium stars */}
      {[
        { t: "12%", l: "65%" }, { t: "38%", l: "82%" }, 
        { t: "58%", l: "18%" }, { t: "72%", l: "72%" }
      ].map((pos, i) => (
        <div 
          key={`med-${i}`}
          className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" 
          style={{ top: pos.t, left: pos.l }}
        ></div>
      ))}

      {/* Colored stars */}
      <div className="absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{top:"22%",left:"45%"}}></div>
      <div className="absolute w-2 h-2 bg-blue-200 rounded-full animate-pulse" style={{top:"55%",left:"75%"}}></div>
      <div className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-pulse" style={{top:"33%",left:"85%"}}></div>
    </div>
  );
};

export default StarsBackground;