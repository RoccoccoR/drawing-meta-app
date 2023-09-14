import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export default function Info() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    function handleOrientationChange() {
      setIsLandscape(window.innerWidth > window.innerHeight);
    }

    window.addEventListener("orientationchange", handleOrientationChange);
    handleOrientationChange(); // Initial check

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <div>
      {isMobile && isLandscape && <h1>Please rotate your device :)</h1>}
      {!isMobile && <h1>Test</h1>}
    </div>
  );
}
