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
    const { offsetX, offsetY } = getMousePosition(
      canvasRef.current,
      nativeEvent
    );
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
    const { offsetX, offsetY } = getMousePosition(
      canvasRef.current,
      nativeEvent
    );
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const getMousePosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const offsetX = (event.clientX - rect.left) * scaleX;
    const offsetY = (event.clientY - rect.top) * scaleY;
    return { offsetX, offsetY };
  };

  const [isDrawing, setIsDrawing] = useState(false);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      style={{
        maxWidth: "420px",
        maxHeight: "594px",
        background: "white",
      }}></canvas>
  );
}
