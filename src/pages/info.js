import React from "react";
import { isMobile } from "react-device-detect";

export default function Info() {
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;

  return (
    <div>
      {isMobile && isLandscape && <h1>Please rotate your devic :)</h1>}
      {!isMobile && <h1>Test</h1>}
    </div>
  );
}
