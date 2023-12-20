import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 1) {
        setProgress((prevProgress) => prevProgress + 0.01);
      } else {
        clearInterval(interval);
      }
    }, 50); // Update every 50 milliseconds for a smooth transition (5 seconds / 100 steps)

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [progress]);

  return (
    <div className=" flex justify-center items-center">
      <div
        style={{
          width: "90%",
          backgroundColor: "gray",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "2.5px",
            backgroundColor: "white",
            borderRadius: "5px",
            transition: "width 0.3s ease-in-out", // Optional smooth animation
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
