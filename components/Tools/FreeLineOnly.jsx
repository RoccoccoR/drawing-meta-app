import React, { useEffect, useRef, useState } from "react";

export default function FreeLineTest({ canvasRef, currentColor }) {
  const contextRef = useRef(null);
  const pathsRef = useRef([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      // Increase the canvas resolution
      const scaleFactor = window.devicePixelRatio;
      canvas.width = canvas.offsetWidth * scaleFactor;
      canvas.height = canvas.offsetHeight * scaleFactor;

      const context = canvas.getContext("2d");

      // Scale the context down to the display size
      context.scale(scaleFactor, scaleFactor);

      context.lineCap = "round";
      context.lineWidth = 4;

      // Enable anti-aliasing
      context.imageSmoothingEnabled = true;

      contextRef.current = context;

      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mouseup", finishDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("touchstart", startDrawing);
      canvas.addEventListener("touchend", finishDrawing);
      canvas.addEventListener("touchmove", draw);
    }

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", finishDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchend", finishDrawing);
      canvas.removeEventListener("touchmove", draw);
    };
  }, [canvasRef]);

  const startDrawing = (event) => {
    const { offsetX, offsetY } = getPosition(canvasRef.current, event);
    contextRef.current.strokeStyle = currentColor;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    pathsRef.current.push({ x: offsetX, y: offsetY });
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    pathsRef.current = [];
  };

  const draw = (event) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = getPosition(canvasRef.current, event);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    pathsRef.current.push({ x: offsetX, y: offsetY });
  };

  const getPosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;

    if (event.type.startsWith("touch")) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const offsetX = (clientX - rect.left) * scaleX;
    const offsetY = (clientY - rect.top) * scaleY;
    return { offsetX, offsetY };
  };

  return (
    <div id="canvasContainer">
      <canvas
        id="canvas"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={finishDrawing}
        onTouchMove={draw}
        ref={canvasRef}
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          cursor: "crosshair",
          touchAction: "none",
        }}></canvas>
    </div>
  );
}
