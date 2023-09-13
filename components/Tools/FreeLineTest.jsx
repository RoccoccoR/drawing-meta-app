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
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const context = canvas.getContext("2d");
      context.scale(1, 1);
      context.lineCap = "round";
      context.lineWidth = 6;
      contextRef.current = context;

      canvas.addEventListener("touchstart", startDrawing);
      canvas.addEventListener("touchend", finishDrawing);
      canvas.addEventListener("touchmove", draw);
    }

    return () => {
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchend", finishDrawing);
      canvas.removeEventListener("touchmove", draw);
    };
  }, [canvasRef]);

  const startDrawing = ({ touches }) => {
    const { clientX, clientY } = touches[0];
    const { offsetX, offsetY } = getPosition(canvasRef.current, {
      clientX,
      clientY,
    });
    contextRef.current.strokeStyle = currentColor;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ touches }) => {
    if (!isDrawing) {
      return;
    }
    const { clientX, clientY } = touches[0];
    const { offsetX, offsetY } = getPosition(canvasRef.current, {
      clientX,
      clientY,
    });
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const getPosition = (canvas, { clientX, clientY }) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const offsetX = (clientX - rect.left) * scaleX;
    const offsetY = (clientY - rect.top) * scaleY;
    return { offsetX, offsetY };
  };

  return (
    <div id="canvasContainer">
      <canvas
        id="canvas"
        onTouchStart={startDrawing}
        onTouchEnd={finishDrawing}
        onTouchMove={draw}
        ref={canvasRef}
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          cursor: "crosshair",
        }}></canvas>
    </div>
  );
}
