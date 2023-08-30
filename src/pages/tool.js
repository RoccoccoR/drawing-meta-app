import FreeLine from "../../components/Tools/FreeLine";
import { useRef } from "react";

export default function tool() {
  const canvasRef = useRef(null);

  const handleSaveClick = () => {
    // const canvas = canvasRef.current;
    // const image = canvas.toDataURL();
    // const link = document.createElement("a");
    // link.href = image;
    // link.download = "canvas_image.jpg";
    // link.click();
    console.log("Save button clicked");
  };

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;

    const newContext = newCanvas.getContext("2d");

    // Fill the new canvas with white background
    newContext.fillStyle = "white";
    newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw the existing canvas content onto the new canvas
    newContext.drawImage(canvas, 0, 0);

    // Create a data URL for the new canvas (JPEG format)
    const image = newCanvas.toDataURL("image/jpeg");

    // Create a download link for the image
    const link = document.createElement("a");
    link.href = image;
    link.download = "canvas_image.jpg";
    link.click();

    console.log("Download button clicked", image);
  };

  return (
    <div className="toolContainer">
      <FreeLine canvasRef={canvasRef} />
      <button className="saveButton" onClick={handleSaveClick}>
        Save
      </button>
      <button className="downloadButton" onClick={handleDownloadClick}>
        Download
      </button>
    </div>
  );
}
