import React from "react";

const Loading = () => {
  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="flex items-center justify-center h-screen bg-black">
        <div
          className="w-12 h-12 rounded-full border-4 border-t-transparent border-purple-500"
          style={{
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    </>
  );
};

export default Loading;
