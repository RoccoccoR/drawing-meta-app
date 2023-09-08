import { useState, useEffect, useRef } from "react";

const PathTracker = () => {
  const canvasRef = useRef(null);
  const [path, setPath] = useState([]);

  const handleMove = (event) => {
    const { clientX, clientY } = event.touches ? event.touches[0] : event;
    setPath((prevPath) => [...prevPath, { x: clientX, y: clientY }]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const updateCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      context.clearRect(0, 0, width, height);
      context.strokeStyle = "blue";
      context.lineWidth = 5;

      context.beginPath();
      path.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
      context.stroke();
    };

    const handleResize = () => {
      updateCanvas();
    };

    updateCanvas();

    window.addEventListener("mousemove", handleMove);
    // window.addEventListener("touchmove", handleMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      // window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [path]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
        background: "transparent",
      }}
    />
  );
};

export default PathTracker;
