import React, { useState, useRef, useEffect } from 'react';
import { MdMenu, MdNote, MdTimer, MdPerson, MdSettings, MdLogout } from 'react-icons/md';
import { FaRegClock, FaRegCalendarAlt, FaUser } from 'react-icons/fa'; // Import Font Awesome icons
import Logout from './logout'; // Import the Logout component
import { Link } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';

const Navigationbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      document.removeEventListener('mousedown', closeDropdown);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="dropdown" onClick={toggleDropdown}>
        <MdMenu className="dropdown-icon" />
        {showDropdown && (
          <ul className="dropdown-list" ref={dropdownRef}>
            <li className="nav-item">
             <AiOutlineCheck className="nav-icon" />
             <Link to="/todo">Todo</Link>
            </li>
            <li className="nav-item">
              <MdNote className="nav-icon" />
              <Link to="/notes">Take Notes</Link>
            </li>

            <li className="nav-item">
              <MdTimer className="nav-icon" />
              <Link to="/pomodoro">Pomodoro</Link>
            </li>
            <li className="nav-item">
              <MdPerson className="nav-icon" />
              <Link to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <MdSettings className="nav-icon" />
              Settings
            </li>
            <li className="nav-item">
              <MdLogout className="nav-icon" />
              <Logout />
            </li>
          </ul>
        )}
      </div>
      <div className="time-and-date">
        <span className="icon"><FaRegClock /></span> {currentTime.toLocaleTimeString()} - <span className="icon"><FaRegCalendarAlt /></span> {currentTime.toLocaleDateString()}
      </div>
      <div className="greeting-message">
        <span className="icon"><FaUser /></span> Hi, 
      </div>
      <ul className="nav-list"></ul>
    </nav>
  );
};

export default Navigationbar;
