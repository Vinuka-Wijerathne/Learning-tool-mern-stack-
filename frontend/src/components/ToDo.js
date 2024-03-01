import React, { useState, useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

// ToDo component
const ToDo = ({ text, updateMode, deleteToDo }) => {
  // State to manage the checked state of the checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox state change
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    // Save the checked state to local storage
    localStorage.setItem(`todo-${text}`, JSON.stringify({ isChecked: newCheckedState }));
  };

  // Effect to load the checked state from local storage when the component mounts
  useEffect(() => {
    const storedCheckedState = localStorage.getItem(`todo-${text}`);
    if (storedCheckedState) {
      setIsChecked(JSON.parse(storedCheckedState).isChecked);
    }
  }, [text]);

  // JSX for rendering the ToDo item
  return (
    <div className={`todo ${isChecked ? 'completed' : ''}`}>
      {/* Checkbox input */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        id={`checkbox-${text}`}
        className="checkbox"
      />
      {/* Label for styling the checkbox */}
      <label htmlFor={`checkbox-${text}`} className="checkbox-label"></label>
      {/* Text content with conditional line-through styling */}
      <div className="text" style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
        {text}
      </div>
      {/* Icons for editing and deleting */}
      <div className="icons">
        {/* Edit icon with click handler to activate updateMode */}
        <BiEdit className="icon" onClick={updateMode} />
        {/* Delete icon with click handler to trigger deleteToDo */}
        <AiFillDelete className="icon" onClick={deleteToDo} />
      </div>
    </div>
  );
};

// Exporting the ToDo component for use in other parts of the application
export default ToDo;
