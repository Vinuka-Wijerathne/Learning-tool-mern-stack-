// SpotifyEmbedPanel.js
import React, { useState } from 'react';
import Iframe from 'react-iframe'; // Install using: npm install react-iframe

const SpotifyEmbedPanel = () => {
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editMode, setEditMode] = useState(true);

  const handleInputChange = (e) => {
    setSpotifyUrl(e.target.value);
    setErrorMessage('');
  };

  const getSpotifyEmbedUrl = (url) => {
    // Extract the Spotify URI from the given Spotify URL
    const spotifyUriMatch = url.match(/(?:https:\/\/open\.spotify\.com\/|spotify:)(track|album|playlist)\/([\w\d]+)/);
    
    if (spotifyUriMatch) {
      const [ type, id] = spotifyUriMatch;
      return `https://open.spotify.com/embed/${type}/${id}`;
    } else {
      setErrorMessage('Invalid Spotify URL. Please enter a valid URL for a song, album, or playlist.');
      return null; // Returning null means there's no valid URL to embed
    }
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setSpotifyUrl('');
  };

  const handleEmbed = () => {
    if (spotifyUrl) {
      // Add logic to embed Spotify content (e.g., store the URL in state, send it to a parent component, etc.)
      console.log('Embedding Spotify URL:', spotifyUrl);
      setEditMode(false);
    } else {
      setErrorMessage('Please enter a valid Spotify URL.');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with alpha
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px', // Optional: Add border radius for rounded corners
        backdropFilter: 'blur(10px)', // Glass effect using backdrop filter
        margin: '20px' // Add margin for spacing
      }}
    >
      <h2 style={{ color: 'white' }}>
        Wanna Play some music{' '}
        <span role="img" aria-label="Music Note" style={{ color: 'white' }}>
          🎵
        </span>
      </h2>
      {editMode ? (
        <React.Fragment>
          <input
            type="text"
            placeholder="Paste a Spotify URL"
            value={spotifyUrl}
            onChange={handleInputChange}
            style={{ width: '80%', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button
            onClick={handleEmbed}
            style={{
              padding: '10px',
              background: 'rgba(0, 0, 0, 0.6)', // Light color for button background with alpha
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              color: 'white', // Set text color to black
              margin: '0 5px' // Add margin for spacing
            }}
          >
            Embed URL
          </button>
        </React.Fragment>
      ) : (
        <button
          onClick={handleToggleEditMode}
          style={{
            padding: '10px',
            background: 'rgba(0, 0, 0, 0.8)', // Light color for button background with alpha
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            color: 'white', // Set text color to black
            margin: '0 5px' // Add margin for spacing
          }}
        >
          Change URL
        </button>
      )}
      
      {/* Embed Spotify content automatically when a URL is pasted */}
      {spotifyUrl && !errorMessage && !editMode && (
        <Iframe
          url={getSpotifyEmbedUrl(spotifyUrl)}
          width="100%"
          height="400px" // Adjust the height as needed
          allowFullScreen
          style={{ borderRadius: '10px', marginTop: '10px' }} // Optional: Add border radius and margin for spacing
        />
      )}
    </div>
  );
};

export default SpotifyEmbedPanel;
