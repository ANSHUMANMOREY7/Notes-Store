import React, { useMemo } from 'react';

const coloredClasses = ["bg-purple-300", "bg-blue-200", "bg-yellow-200"];

// Makes a new random set of star positions every time it is called
const makePositions = (count) =>
  Array.from({ length: count }, () => ({
    t: `${Math.floor(Math.random() * 95)}%`,
    l: `${Math.floor(Math.random() * 95)}%`,
  }));

const StarsBackground = ({ semester = "all" }) => {
  // Re-runs when the page opens or when the semester changes
  const small = useMemo(() => makePositions(18), [semester]);
  const medium = useMemo(() => makePositions(4), [semester]);
  const colored = useMemo(() => makePositions(3), [semester]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Small stars */}
      {small.map((pos, i) => (
        <div
          key={`small-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse transition-all duration-700"
          style={{ top: pos.t, left: pos.l }}
        ></div>
      ))}

      {/* Medium stars */}
      {medium.map((pos, i) => (
        <div
          key={`med-${i}`}
          className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse transition-all duration-700"
          style={{ top: pos.t, left: pos.l }}
        ></div>
      ))}

      {/* Colored stars */}
      {colored.map((pos, i) => (
        <div
          key={`color-${i}`}
          className={`absolute w-2 h-2 ${coloredClasses[i]} rounded-full animate-pulse transition-all duration-700`}
          style={{ top: pos.t, left: pos.l }}
        ></div>
      ))}
    </div>
  );
};

export default StarsBackground;