import React, { useState } from 'react';
import CustomButton from './CustomButton';

const TextAdder = ({ addText }) => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const generateTextImage = (text) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Customize canvas size and text styling as needed
    const canvasWidth = 256;
    const canvasHeight = 128;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.font = '36px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center'; // Align the text to the center horizontally

    // Calculate the position to center the text vertically
    const textX = canvasWidth / 2;
    const textY = canvasHeight / 2;

    // Fill the canvas with the text
    ctx.fillText(text, textX, textY);

    // Convert the canvas to a data URL (image representation of the canvas)
    const dataUrl = canvas.toDataURL();

    // Call the addText function provided as a prop to update state.textDecal
    addText(dataUrl);
  };

  const handleApplyText = (e) => {
    e.preventDefault(); // Prevent form submission causing a page refresh

    // Perform any text processing or validation if needed

    // Pass the text to the parent component (Customizer) via the addText prop
    addText(text);

    // Clear the input field after applying the text
    setText("");
  };

  return (
    <div className="text-adder-container">
      <div className="flex-1 flex flex-col left-full absolute ml-3 ">
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here"
        className="text-input"
      />
      <CustomButton
        type="filled"
        title="Apply"
        handleClick={handleApplyText}
        customStyles="text-xs mt-4 flex flex-wrap items-center justify-center"
      />
    </div>
    </div>
  );
};

export default TextAdder;
