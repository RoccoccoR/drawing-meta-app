import React, { useRef, useState } from "react";
import FreeLineOnly from "../../components/Tools/FreeLineOnly";
import { useSession } from "next-auth/react";
import LogInBtnToSave from "../../components/LogInBtn/LogInBtnToSave";
import { CirclePicker } from "react-color";
import ColorPicker from "../../components/ColorPicker/ColorPicker";

export default function Tool() {
  const canvasRef = useRef(null);
  const [saveMessage, setSaveMessage] = useState("");
  const { data: session } = useSession();
  const [currentColor, setCurrentColor] = useState("#000000"); // State for selected color

  const handleSaveClick = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL();

    // Send the drawing data to your API route
    try {
      const response = await fetch("/api/draws", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: image,
          userId: session.user.id /* add other data here */,
          published: false,
        }),
      });

      if (response.ok) {
        console.log("Drawing saved successfully");
        setSaveMessage("Drawing saved in the profile page"); // Set save message

        // Clear the message after 2 seconds
        setTimeout(() => {
          setSaveMessage("");
        }, 2000);

        // Save drawing data to local storage
        const drawingData = {
          imageData: image,
          userId: session.user.id,
          published: false,
          // Add other relevant drawing data here
        };
        localStorage.setItem("savedDrawing", JSON.stringify(drawingData));
      } else {
        console.error("Failed to save drawing");
      }
    } catch (error) {
      console.error("Error saving drawing:", error);
    }
  };

  const handleDownloadClick = () => {
    // ... implement download logic here
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear the canvas by resetting its content
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex); // Update the selected color
  };

  return (
    <div className="pageWrapper toolPage">
      <div className="toolContainer">
        <FreeLineOnly canvasRef={canvasRef} currentColor={currentColor} />
        <section className="toolButtonsContainer">
          {saveMessage && <p className="menubarItem">{saveMessage}</p>}{" "}
          {/* Display save message */}
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
          <div className="colorPickerContainer">
            <CirclePicker color={currentColor} onChange={handleColorChange} />
          </div>
        </section>
      </div>
    </div>
  );
}
