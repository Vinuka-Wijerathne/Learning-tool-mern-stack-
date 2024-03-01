import React, { useState } from "react";

const TextInput = ({ onPaste, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePaste = () => {
    onPaste(inputValue);
    setInputValue(""); // Clear the input field after pasting
  };

  return (
    <div className="text-input-container">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handlePaste}>Embed</button>
    </div>
  );
};

export default TextInput;
