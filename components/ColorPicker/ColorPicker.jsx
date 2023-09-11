import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [hexInput, setHexInput] = useState("");
  const [recentColors, setRecentColors] = useState([]);

  const handleChange = (color) => {
    setSelectedColor(color.hex);
    // Add the selected color to the recent colors list
    setRecentColors((prevColors) => {
      const newColors = [color.hex, ...prevColors.slice(0, 5)];
      return Array.from(new Set(newColors)); // Remove duplicates
    });
  };

  const handleHexInputChange = (event) => {
    const inputColor = event.target.value;
    setHexInput(inputColor);

    // Check if the input is a valid hex color
    const isValidHex = /^#[0-9A-Fa-f]{6}$/i.test(inputColor);

    if (isValidHex) {
      setSelectedColor(inputColor);
    }
  };

  useEffect(() => {
    // Initialize the recent colors with some default values
    setRecentColors(["#FF5733", "#33FF57", "#5733FF", "#FFFF33", "#33FFFF"]);
  }, []);

  return (
    <div className="color-picker">
      <div className="color-display" style={{ backgroundColor: selectedColor }}>
        <input
          type="text"
          value={hexInput}
          onChange={handleHexInputChange}
          placeholder="Hex code"
        />
        <div className="recent-colors">
          {recentColors.map((color, index) => (
            <div
              key={index}
              className="recent-color"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}></div>
          ))}
        </div>
      </div>
      <SketchPicker color={selectedColor} onChange={handleChange} />
    </div>
  );
}
