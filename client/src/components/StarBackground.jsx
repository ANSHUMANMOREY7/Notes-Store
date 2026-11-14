import { useState, useEffect } from 'react';

const coloredClasses = ["bg-purple-300", "bg-blue-200", "bg-yellow-200"];

// Positions are numbers now (0-95), used as vw / vh units
const makePositions = (count, seed = 0) =>
  Array.from({ length: count }, (_, index) => ({
    x: Math.floor((((Math.random() + seed + index) % 1) * 95)),
    y: Math.floor((((Math.random() + seed * 0.7 + index * 0.13) % 1) * 95)),
  }));

const starStyle = (pos) => ({
  top: 0,
  left: 0,
  transform: `translate(${pos.x}vw, ${pos.y}vh)`,
});

const StarsBackground = () => {
  const [shuffle, setShuffle] = useState(0);

  // Listen for the "stars-shuffle" signal
  useEffect(() => {
    const handler = () => setShuffle((n) => n + 1);
    window.addEventListener("stars-shuffle", handler);
    return () => window.removeEventListener("stars-shuffle", handler);
  }, []);

  const small = makePositions(18, shuffle);
  const medium = makePositions(4, shuffle + 1);
  const colored = makePositions(3, shuffle + 2);

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
      {small.map((pos, i) => (
        <div
          key={`small-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse transition-transform duration-700 will-change-transform"
          style={starStyle(pos)}
        ></div>
      ))}

      {medium.map((pos, i) => (
        <div
          key={`med-${i}`}
          className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse transition-transform duration-700 will-change-transform"
          style={starStyle(pos)}
        ></div>
      ))}

      {colored.map((pos, i) => (
        <div
          key={`color-${i}`}
          className={`absolute w-2 h-2 ${coloredClasses[i]} rounded-full animate-pulse transition-transform duration-700 will-change-transform`}
          style={starStyle(pos)}
        ></div>
      ))}
    </div>
  );
};

export default StarsBackground;