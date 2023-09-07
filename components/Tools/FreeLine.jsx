import { useEffect, useRef, useState } from "react";

export default function FreeLine({ canvasRef }) {
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 840;
      canvas.height = 1188;

      canvas.style.width = "840px";
      canvas.style.height = "1188px";

      const context = canvas.getContext("2d");
      context.scale(1, 1);
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 6;
      contextRef.current = context;
    }
  }, [canvasRef]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = getPosition(canvasRef.current, nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = getPosition(canvasRef.current, nativeEvent);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const getPosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let offsetX, offsetY;

    if (event.touches && event.touches.length === 1) {
      offsetX = (event.touches[0].clientX - rect.left) * scaleX;
      offsetY = (event.touches[0].clientY - rect.top) * scaleY;
    } else {
      offsetX = (event.clientX - rect.left) * scaleX;
      offsetY = (event.clientY - rect.top) * scaleY;
    }

    return { offsetX, offsetY };
  };

  const [isDrawing, setIsDrawing] = useState(false);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={finishDrawing}
      onTouchMove={draw}
      ref={canvasRef}
      style={{
        maxWidth: "420px",
        maxHeight: "594px",
        background: "white",
      }}></canvas>
  );
}
