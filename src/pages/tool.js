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
    // console.log("Save button clicked", image);
  };

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL();

    const link = document.createElement("a");
    link.href = image;
    link.download = "canvas_image.jpg";
    link.click();

    console.log("Save button clicked", image);
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
