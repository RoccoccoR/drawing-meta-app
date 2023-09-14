import React, { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LogInBtnToSave from "../../components/LogInBtn/LogInBtnToSave";
import FreeLineOnly from "../../components/Tools/FreeLineOnly";

export default function Tool() {
  const canvasRef = useRef(null);
  const [saveMessage, setSaveMessage] = useState("");
  const { data: session } = useSession();
  const [currentColor, setCurrentColor] = useState("black");
  const [currentOrientation, setCurrentOrientation] = useState(null);

  const handleOrientationChange = () => {
    setCurrentOrientation(screen.orientation.type);
  };

  useEffect(() => {
    // Check if window and screen objects are available (client-side)
    if (typeof window !== "undefined" && window.screen) {
      setCurrentOrientation(window.screen.orientation.type);

      // Add event listener for orientation change
      window.addEventListener("orientationchange", handleOrientationChange);

      // Clean up by removing the event listener when the component unmounts
      return () => {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      };
    }
  }, []);

  useEffect(() => {
    // Check if the device is in landscape orientation and is a touch device
    if (
      currentOrientation === "landscape-primary" ||
      currentOrientation === "landscape-secondary"
    ) {
      // Check if it's a touch device
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        // Display a message to the user
        document.body.innerHTML = "<div>Please go back to portrait view</div>";
      }
    }
  }, [currentOrientation]);

  const saveDrawingToLocalStorage = (imageData) => {
    const drawingData = {
      imageData,
      userId: session.user.id,
      published: false,
    };
    localStorage.setItem("savedDrawing", JSON.stringify(drawingData));
  };

  const handleSaveClick = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL();

    // Send the drawing data to API route
    try {
      const response = await fetch("/api/draws", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: image,
          userId: session.user.id,
          published: false,
        }),
      });

      if (response.ok) {
        console.log("Drawing saved successfully");

        // Save drawing data to local storage
        saveDrawingToLocalStorage(image);

        setSaveMessage("Drawing saved in the profile page"); // Set save message

        // Clear the message after 2 seconds
        setTimeout(() => {
          setSaveMessage("");
        }, 2000);
      } else {
        console.error("Failed to save drawing");
      }
    } catch (error) {
      console.error("Error saving drawing:", error);
    }
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
          <button
            className="colorButton white"
            onClick={() => setCurrentColor("white")}></button>
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
