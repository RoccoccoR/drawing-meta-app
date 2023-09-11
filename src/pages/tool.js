import React, { useRef, useState, useEffect } from "react";
import FreeLineOnly from "../../components/Tools/FreeLineOnly";
import { useSession } from "next-auth/react";
import LogInBtnToSave from "../../components/LogInBtn/LogInBtnToSave";

export default function Tool() {
  const canvasRef = useRef(null);
  const [saveMessage, setSaveMessage] = useState(""); // Initialize saveMessage state
  const { data: session } = useSession();
  const [currentColor, setCurrentColor] = useState("black");

  const handleSaveClick = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL();
    // ...

    // Update the save message when the save is successful
    setSaveMessage("Drawing saved in profile page!");
  };

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;

    const newContext = newCanvas.getContext("2d");

    // Fill the new canvas with a white background
    newContext.fillStyle = "white";
    newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw the existing canvas content onto the new canvas
    newContext.drawImage(canvas, 0, 0);

    // Create a data URL for the new canvas (JPEG format)
    const image = newCanvas.toDataURL("image/jpeg");
    console.log("Downloaded image data:", image); // Log the downloaded image data

    // Create a download link for the image
    const link = document.createElement("a");
    link.href = image;
    link.download = "canvas_image.jpg";
    link.click();

    console.log("Download button clicked", image);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="pageWrapper toolPage">
      <div className="toolContainer">
        <div className="colorButtons">
          <button
            className="colorButton  black"
            onClick={() => setCurrentColor("black")}></button>
          <button
            className="colorButton red"
            onClick={() => setCurrentColor("red")}></button>
          <button
            className="colorButton blue"
            onClick={() => setCurrentColor("blue")}></button>
          <button
            className="colorButton green"
            onClick={() => setCurrentColor("green")}></button>
          <button
            className="colorButton yellow"
            onClick={() => setCurrentColor("yellow")}></button>
        </div>
        <FreeLineOnly canvasRef={canvasRef} currentColor={currentColor} />
        <section className="toolButtonsContainer">
          {saveMessage && <p>{saveMessage}</p>}
          {session ? (
            <>
              <button className="saveButton" onClick={handleSaveClick}>
                Save
              </button>
            </>
          ) : (
            <LogInBtnToSave />
          )}
          <button className="downloadButton" onClick={handleDownloadClick}>
            Download
          </button>
          <button className="clearButton" onClick={clearCanvas}>
            Clear
          </button>
        </section>
      </div>
    </div>
  );
}
