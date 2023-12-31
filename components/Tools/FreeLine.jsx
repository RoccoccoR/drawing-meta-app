import { useEffect, useRef, useState } from "react";

export default function FreeLine({ canvasRef }) {
  const contextRef = useRef(null);
  const pathRef = useRef([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      context.scale(1, 1);
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 6;
      contextRef.current = context;

      // Call a function to update canvas size when the window is resized
      updateCanvasSize(canvas);
      window.addEventListener("resize", () => updateCanvasSize(canvas));
    }
  }, [canvasRef]);

  const updateCanvasSize = (canvas) => {
    const parent = canvas.parentElement;
    const maxWidth = parent.clientWidth;
    const maxHeight = maxWidth * (1188 / 840);

    // Ensure the canvas size is within the desired range
    const newWidth = Math.max(210, Math.min(900, maxWidth));
    const newHeight = (newWidth * 1188) / 840;

    canvas.width = newWidth;
    canvas.height = newHeight;
    canvas.style.width = newWidth + "px";
    canvas.style.height = newHeight + "px";

    // Redraw the existing path when the canvas size changes
    redrawPath();
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = getPosition(canvasRef.current, nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    // Save the current path to the pathRef
    pathRef.current.push(contextRef.current);
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

  const redrawPath = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    pathRef.current.forEach((path) => {
      context.stroke(path);
    });
  };

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
        background: "white",
        width: "100%",
        height: "auto",
      }}></canvas>
  );
}
