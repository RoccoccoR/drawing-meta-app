import FreeLine from "../../components/Tools/FreeLine";
import { useRef, useState } from "react";
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

  return (
    <div className="pageWrapper">
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
        </section>
      </div>
    </div>
  );
}
