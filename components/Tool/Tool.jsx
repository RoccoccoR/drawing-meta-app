import { useEffect, useRef, useState } from "react";

export default function Tool() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 420 * 2;
    canvas.height = 594 * 2;

    canvas.style.width = "420px";
    canvas.style.height = "594px";

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

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

// import { useEffect, useRef, useState } from "react";

// export default function Tool() {
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth * 2;
//     canvas.height = window.innerHeight * 2;

//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;

//     const context = canvas.getContext("2d");
//     context.scale(4, 4);
//     context.lineCap = "round";
//     context.strokeStyle = "black";
//     context.lineWidth = 5;
//     contextRef.current = context;
//   }, []);

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const finishDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) {
//       return;
//     }
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   return (
//     <canvas
//       onMouseDown={startDrawing}
//       onMouseUp={finishDrawing}
//       onMouseMove={draw}
//       ref={canvasRef}
//       style={{
//         maxWidth: "420px",
//         maxHeight: "594px",
//         background: "white",
//       }}></canvas>
//   );
// }
