import React, { useEffect, useState } from "react";
import { isMobile, isBrowser } from "react-device-detect";

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
      {isBrowser && <p>This is the browser</p>}
      {isMobile && isLandscape && <p>Please rotate your device</p>}
      {isMobile && !isLandscape && <p>Mobile orientation portrait</p>}
      {!isMobile && !isLandscape && <p>Test</p>}
    </div>
  );
}
