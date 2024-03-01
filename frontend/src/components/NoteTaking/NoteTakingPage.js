// NoteTakingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './note.css';
import Navigationbar from '../Navigationbar';

const NoteTakingPage = () => {
  return (
    <div className="note-taking-container">
      <Navigationbar />
      <h1>Take Notes</h1>
      <div className="add-note">
        <div className="plus-icon">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <span className="create-note">
          <Link to="/workspace" className="create-note-link">
            Create Notes <FontAwesomeIcon icon={faPencilAlt} />
          </Link>
        </span>
      </div>
      {/* Additional content for the note-taking page can be added here */}
    </div>
  );
};

export default NoteTakingPage;
