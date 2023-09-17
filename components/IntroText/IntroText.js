import React, { useState, useEffect } from "react";

export default function IntroText() {
  const text =
    "Hey, My name is Rocco! I created this app to help you explore your creativity and to have fun. You can Scan the QR code to open the app in your device during the presentation.";
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

  return <p className="introText">{displayText}</p>;
}

// export default function IntroText() {
//   return (
//     <h1 className="introText">
//       This is a placeholder text that explain briefly what this app does. If you
//       start moving your mouse you can start explore a free line feature. When
//       you are done with your exploration just click on start to move to a new
//       empty screen where you can find more tools. Enjoy :)
//     </h1>
//   );
// }
