import React, { useState, useEffect } from "react";

export default function IntroText() {
  const text =
    "This is a placeholder text that explains briefly what this app does. If you start moving your mouse, you can start exploring a free-line feature. When you are done with your exploration, just click on Sign in to move to a new empty screen where you can start drawing. Enjoy :)";
  const [displayText, setDisplayText] = useState("");
  const speed = 50; // Adjust the speed as needed
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval;

    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    };

    interval = setInterval(typeText, speed);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, text]);

  return <h1 className="introText">{displayText}</h1>;
}
