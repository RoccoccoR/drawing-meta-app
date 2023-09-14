import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export default function Info() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    // Check for landscape orientation on the client side
    const checkOrientation = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };

    // Add an event listener to re-check orientation when the window is resized
    window.addEventListener("resize", checkOrientation);

    // Initial check
    checkOrientation();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return (
    <div>
      {isMobile && isLandscape && <h1>Please rotate your device</h1>}
      {!isMobile && <h1>Test</h1>}
    </div>
  );
}
