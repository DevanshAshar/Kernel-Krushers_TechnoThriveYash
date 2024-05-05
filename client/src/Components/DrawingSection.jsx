import React, { useRef, useState } from 'react';
import Layout from '../Layout/Layout';
import '../css/DrawingSection.css'; // Import CSS file for styling

const DrawingSection = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000'); // Default color
  const [brushSize, setBrushSize] = useState(5); // Default brush size

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = event.nativeEvent;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = event.nativeEvent;

    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  const changeBrushSize = (newSize) => {
    setBrushSize(newSize);
  };

  return (
    <Layout>
      <div className="drawing-section">
        <div className="drawing-tools">
          <button className="tool-button" onClick={clearCanvas}>Clear</button>
          <input className="color-picker" type="color" value={color} onChange={(e) => changeColor(e.target.value)} />
          <input className="brush-size" type="range" min="1" max="50" value={brushSize} onChange={(e) => changeBrushSize(parseInt(e.target.value))} />
          <button className="tool-button" onClick={() => changeColor('#ffffff')}>Eraser</button>
        </div>
        <canvas
          ref={canvasRef}
          className="canvas"
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </div>
    </Layout>
  );
}

export default DrawingSection;
