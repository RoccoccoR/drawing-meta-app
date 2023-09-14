import React from "react";
import { isMobile } from "react-device-detect";

export default function Info() {
  const isLandscape = window.innerWidth > window.innerHeight;

  return (
    <div>
      {isMobile && isLandscape && <h1>Please rotate your device</h1>}
      {!isMobile && <h1>Test</h1>}
    </div>
  );
}
