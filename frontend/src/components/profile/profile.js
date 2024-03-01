import React, { useState, useEffect } from "react";
import { updateProfile, deleteAccount } from "../../utils/HandleApi";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navigationbar from "../Navigationbar";
import "./profile.css";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("token");

    if (authToken) {
      try {
        // Decode the token to get user information
        const decodedToken = jwtDecode(authToken);

        // Extract user ID from the decoded token
        const userId = decodedToken._id;

        axios
          .get(`http://localhost:5000/api/profile/${userId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            const userData = response.data;

            const fetchedUsername = userData.firstName;
            const fetchedEmail = userData.email;

            setUsername(fetchedUsername);
            setEmail(fetchedEmail);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }
  }, []);

  const handleProfileUpdate = () => {
    updateProfile({ username, profileImage });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  return (
    <div className="profile-container">
      <Navigationbar />
      <h2>Profile Page</h2>
      <form>
        {/* Profile Image Section */}
        <div className="profile-image-container">
          <label className="profile-image-label" htmlFor="profile-image">
            <div className="profile-image-preview">
              {profileImage ? (
                <img
                  src={profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  <i className="fas fa-camera"></i>
                </div>
              )}
            </div>
            <input
              type="file"
              id="profile-image"
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden-input"
            />
          </label>
        </div>
        {/* End of Profile Image Section */}

        {/* Username Section */}
        <div className="label-input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* End of Username Section */}

        {/* Email Section */}
        <div className="label-input-container">
          <label htmlFor="email">Email:</label>
          <span>{email}</span>
        </div>
        {/* End of Email Section */}

        <button type="button" onClick={handleProfileUpdate}>
          Update Profile
        </button>

        {/* Delete Account Button */}
        <button type="button" onClick={handleDeleteAccount} className="delete-account-button">
          Delete Account
        </button>
      </form>
    </div>
  );
}

export default Profile;
