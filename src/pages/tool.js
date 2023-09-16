import React, { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { isMobile, isBrowser } from "react-device-detect"; // Import isMobile and isBrowser
import LogInBtnToSave from "../../components/LogInBtn/LogInBtnToSave";
import FreeLineOnly from "../../components/Tools/FreeLineOnly";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Tool() {
  const canvasRef = useRef(null);
  const [saveMessage, setSaveMessage] = useState("");
  const { data: session } = useSession();
  const [currentColor, setCurrentColor] = useState("black");
  const [isLandscape, setIsLandscape] = useState(false); // Define isLandscape variable
  const [showColors, setShowColors] = useState(false);
  // Load saved drawing data from local storage when the component mounts
  useEffect(() => {
    // Load saved drawing data from local storage when the component mounts
    const savedDrawingData = localStorage.getItem("savedDrawing");
    if (savedDrawingData) {
      const { imageData } = JSON.parse(savedDrawingData);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
    }

    // Check for landscape orientation on the client side
    const checkOrientation = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };

    // Add an event listener to re-check orientation when the window is resized
    window.addEventListener("resize", checkOrientation);

    // Initial check
    checkOrientation();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

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

  const toggleColorButtons = () => {
    setShowColors(!showColors);
  };

  return (
    <div className={inter.className}>
      {/* ____________________if is isBrowser_________________________ */}

      {isBrowser && (
        <>
          <button
            className="menubarItem navBarMenu colorsBox"
            onClick={toggleColorButtons}>
            {showColors ? (
              <>
                <img
                  className="menuIcon"
                  src="/cross-mark_274c.png"
                  alt="Close Colors"
                />
                {showColors && (
                  <div>
                    <div className="colorButtons">
                      <button
                        className={` ${
                          currentColor === "black" ? "active" : ""
                        }`}
                        onClick={() => setCurrentColor("black")}>
                        <img
                          className="menuIconAC"
                          src="/black-circle_26ab.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={` ${currentColor === "red" ? "active" : ""}`}
                        onClick={() => setCurrentColor("red")}>
                        {" "}
                        <img
                          className="menuIconAC"
                          src="/large-red-circle_1f534.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={` ${
                          currentColor === "blue" ? "active" : ""
                        }`}
                        onClick={() => setCurrentColor("blue")}>
                        <img
                          className="menuIconAC"
                          src="/large-blue-circle_1f535.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={` ${
                          currentColor === "green" ? "active" : ""
                        }`}
                        onClick={() => setCurrentColor("green")}>
                        {" "}
                        <img
                          className="menuIconAC"
                          src="/large-green-circle_1f7e2.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={` ${
                          currentColor === "yellow" ? "active" : ""
                        }`}
                        onClick={() => setCurrentColor("yellow")}>
                        {" "}
                        <img
                          className="menuIconAC"
                          src="/large-yellow-circle_1f7e1.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={` ${
                          currentColor === "white" ? "active" : ""
                        }`}
                        onClick={() => setCurrentColor("white")}>
                        {" "}
                        <img
                          className="menuIconAC"
                          src="/white-circle_26aa.png"
                          alt="Black Circle"
                        />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <img
                  className="menuIcon"
                  src="/artist-palette_1f3a8.png"
                  alt="Open Colors"
                />
                Colors
              </>
            )}
          </button>
          <div className="pageWrapper toolPage">
            <div className="toolContainer">
              <FreeLineOnly canvasRef={canvasRef} currentColor={currentColor} />
              <section className="toolButtonsContainer">
                {saveMessage && <p>{saveMessage}</p>}
                {session ? (
                  <>
                    <button
                      className="menubarItem navBarProfile"
                      onClick={handleSaveClick}>
                      <img
                        className="menuIcon"
                        src="/love-letter_1f48c.png"
                        alt="Profile"
                      />
                      Save
                    </button>
                  </>
                ) : (
                  <LogInBtnToSave />
                )}
                <button className="menubarItem " onClick={handleDownloadClick}>
                  <img
                    className="menuIcon"
                    src="/down-arrow_2b07-fe0f.png"
                    alt="Profile"
                  />
                  Download
                </button>
                <button className="menubarItem " onClick={clearCanvas}>
                  <img
                    className="menuIcon"
                    src="/wastebasket_1f5d1-fe0f.png"
                    alt="clear"
                  />
                  Clear
                </button>
              </section>
            </div>
          </div>
        </>
      )}
      {isMobile && !isLandscape && (
        <>
          <button
            className="menubarItem navBarMenu colorsBox"
            onClick={toggleColorButtons}>
            {showColors ? (
              <>
                <img
                  className="menuIcon"
                  src="/cross-mark_274c.png"
                  alt="Close Colors"
                />
                {showColors && (
                  <div>
                    <div className="colorButtons">
                      <button
                        className={` ${
                          currentColor === "black" ? "active" : ""
                        }`}
                        onClick={() => setCurrentColor("black")}>
                        <img
                          className="menuIconAC"
                          src="/black-circle_26ab.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={`${currentColor === "red" ? "active" : ""}`}
                        onClick={() => setCurrentColor("red")}>
                        {" "}
                        <img
                          className="menuIconAC"
                          src="/large-red-circle_1f534.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={`${currentColor === "blue" ? "active" : ""}`}
                        onClick={() => setCurrentColor("blue")}>
                        <img
                          className="menuIconAC"
                          src="/large-blue-circle_1f535.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={`${
                          currentColor === "green" ? "active" : ""
                        }`}
                        onClick={() => setCurrentColor("green")}>
                        {" "}
                        <img
                          className="menuIconAC"
                          src="/large-green-circle_1f7e2.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={` ${
                          currentColor === "yellow" ? "active" : ""
                        }`}
                        onClick={() => setCurrentColor("yellow")}>
                        {" "}
                        <img
                          className="menuIconAC"
                          src="/large-yellow-circle_1f7e1.png"
                          alt="Black Circle"
                        />
                      </button>
                      <button
                        className={` ${
                          currentColor === "white" ? "active" : ""
                        }`}
                        onClick={() => setCurrentColor("white")}>
                        {" "}
                        <img
                          className="menuIconAC"
                          src="/white-circle_26aa.png"
                          alt="Black Circle"
                        />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <img
                  className="menuIcon"
                  src="/artist-palette_1f3a8.png"
                  alt="Open Colors"
                />
                Colors
              </>
            )}
          </button>
          <div className="pageWrapper toolPage">
            <div className="toolContainer">
              <FreeLineOnly canvasRef={canvasRef} currentColor={currentColor} />
              <section className="toolButtonsContainer">
                {saveMessage && <p>{saveMessage}</p>}
                {session ? (
                  <>
                    <button
                      className="menubarItem navBarProfile"
                      onClick={handleSaveClick}>
                      <img
                        className="menuIcon"
                        src="/love-letter_1f48c.png"
                        alt="Profile"
                      />
                      Save
                    </button>
                  </>
                ) : (
                  <LogInBtnToSave />
                )}
                <button className="menubarItem" onClick={handleDownloadClick}>
                  <img
                    className="menuIcon"
                    src="/down-arrow_2b07-fe0f.png"
                    alt="Profile"
                  />
                  Download
                </button>
                <button className="menubarItem" onClick={clearCanvas}>
                  <img
                    className="menuIcon"
                    src="/wastebasket_1f5d1-fe0f.png"
                    alt=""
                  />
                  Clear
                </button>
              </section>
            </div>
          </div>
        </>
      )}
      {isMobile && isLandscape && (
        <div className="centeredText">Please rotate your device :)</div>
      )}
      {/* {!isMobile && !isLandscape && <p>This is not a mobile device</p>} */}
    </div>
  );
}
