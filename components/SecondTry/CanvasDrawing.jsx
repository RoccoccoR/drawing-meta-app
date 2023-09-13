import React, { Component } from "react";

class CanvasDrawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawingColor: "red", // Initial drawing color
      isDrawing: false,
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = this.state.drawingColor;
    this.canvas.addEventListener("mousedown", this.startDrawing);
    this.canvas.addEventListener("mousemove", this.draw);
    this.canvas.addEventListener("mouseup", this.endDrawing);
    this.canvas.addEventListener("touchstart", this.startDrawing);
    this.canvas.addEventListener("touchmove", this.draw);
    this.canvas.addEventListener("touchend", this.endDrawing);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener("mousedown", this.startDrawing);
    this.canvas.removeEventListener("mousemove", this.draw);
    this.canvas.removeEventListener("mouseup", this.endDrawing);
    this.canvas.removeEventListener("touchstart", this.startDrawing);
    this.canvas.removeEventListener("touchmove", this.draw);
    this.canvas.removeEventListener("touchend", this.endDrawing);
  }

  startDrawing = (e) => {
    e.preventDefault(); // Prevents scrolling on touch devices
    this.setState({ isDrawing: true });
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.clientX - this.canvas.offsetLeft ||
        e.touches[0].clientX - this.canvas.offsetLeft,
      e.clientY - this.canvas.offsetTop ||
        e.touches[0].clientY - this.canvas.offsetTop
    );
  };

  draw = (e) => {
    if (!this.state.isDrawing) return;
    this.ctx.lineTo(
      e.clientX - this.canvas.offsetLeft ||
        e.touches[0].clientX - this.canvas.offsetLeft,
      e.clientY - this.canvas.offsetTop ||
        e.touches[0].clientY - this.canvas.offsetTop
    );
    this.ctx.stroke();
  };

  endDrawing = () => {
    this.setState({ isDrawing: false });
    this.ctx.closePath();
  };

  changeColor = (color) => {
    this.ctx.strokeStyle = color;
    this.setState({ drawingColor: color });
  };

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          width={500}
          height={500}
          style={{ border: "1px solid black" }}
          onTouchStart={this.startDrawing}
          onTouchMove={this.draw}
          onTouchEnd={this.endDrawing}
        />
        <div>
          <button onClick={() => this.changeColor("red")}>Red</button>
          <button onClick={() => this.changeColor("blue")}>Blue</button>
        </div>
      </div>
    );
  }
}

export default CanvasDrawing;
