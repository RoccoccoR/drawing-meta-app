import FreeLine from "../../components/Tools/FreeLine";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LogInBtnToSave from "../../components/LogInBtn/LogInBtnToSave";

export default function Tool() {
  const canvasRef = useRef(null);
  const [saveMessage, setSaveMessage] = useState(""); // State for save message

  const { data: session } = useSession();

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

  useEffect(() => {
    // Load drawing data from local storage on page load
    const savedDrawingData = localStorage.getItem("savedDrawing");
    if (savedDrawingData) {
      const parsedData = JSON.parse(savedDrawingData);

      // Restore the drawing on the canvas or use the data as needed
      // Example: Load the image onto the canvas
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const image = new Image();
      image.src = parsedData.imageData;
      image.onload = () => {
        context.drawImage(image, 0, 0);
      };
    }
  }, []);

  return (
    <div className="pageWrapper toolPage">
      <div className="toolContainer">
        <FreeLine canvasRef={canvasRef} />
        {saveMessage && <p>{saveMessage}</p>} {/* Display save message */}
        <section className="toolButtonsContainer">
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
