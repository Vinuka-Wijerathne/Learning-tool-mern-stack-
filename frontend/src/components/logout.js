// components/logout.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from './Utils/cookies';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Perform logout logic, such as making an API request to your server
      // Replace 'YOUR_LOGOUT_API_ENDPOINT' with your actual logout API endpoint
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary headers, like authentication token
          // 'Authorization': `Bearer ${yourAuthToken}`,
        },
        // You can include a request body if needed
        // body: JSON.stringify({}),
      });

      // Check if the server responds with a success status (e.g., 200 OK)
      if (response.ok) {
        // Clear the user token from localStorage or cookies
        removeCookie('token'); // Use the appropriate function based on the library you choose

        // Redirect to the login page
        navigate('/login');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
