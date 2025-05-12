import React from "react";

const Loading = () => {
  const letters = [
    { char: "A", color: "text-purple-400", delay: 0 },
    { char: "r", color: "text-purple-400", delay: 0.1 },
    { char: "t", color: "text-purple-400", delay: 0.2 },
    { char: "A", color: "text-purple-400", delay: 0.3 },
    { char: "n", color: "text-purple-400", delay: 0.4 },
    { char: "y", color: "text-purple-400", delay: 0.5 },
  ];

  return (
    <>
      <style>{`
        @keyframes textGlow {
          0% {
            filter: brightness(0.6);
            text-shadow: 0 0 4px rgba(168, 85, 247, 0.3);
          }
          100% {
            filter: brightness(1.3);
            text-shadow: 0 0 12px rgba(168, 85, 247, 0.9);
          }
        }

        .glow {
          filter: brightness(0.6);
          text-shadow: 0 0 4px rgba(168, 85, 247, 0.3);
          animation: textGlow 0.7s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="flex items-center justify-center h-screen bg-black">
        <div className="flex items-end space-x-2">
          {letters.map(({ char, color, delay }, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <span
                className={`text-4xl font-extrabold ${color} glow`}
                style={{
                  animationDelay: `${delay}s`,
                  animationFillMode: "forwards", // Ensures the final animation state is maintained
                  display: "inline-block",
                }}
              >
                {char}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
