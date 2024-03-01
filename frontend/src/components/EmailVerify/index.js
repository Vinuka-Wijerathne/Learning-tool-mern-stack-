// Importing necessary React components, hooks, and libraries
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";  // Assuming success.png is an image file
import styles from "./styles.module.css";  // Importing CSS styles

// Functional component for email verification
const EmailVerify = () => {
  // State to track the validity of the verification URL
  const [validUrl, setValidUrl] = useState(true);
  
  // Extracting parameters from the URL
  const param = useParams();

  // useEffect to run the email verification logic when the component mounts
  useEffect(() => {
    // Async function to verify the email URL
    const verifyEmailUrl = async () => {
      try {
        // Constructing the verification URL
        const url = `http://localhost:5000/api/users/${param.id}/verify/${param.token}`;
        
        // Sending a GET request to the server to verify the email
        const { data } = await axios.get(url);
        
        // Logging the server response (for demonstration purposes)
        console.log(data);

        // Setting the validity of the URL to true
        setValidUrl(true);
      } catch (error) {
        // Logging any errors that occur during the verification process
        console.log(error);

        // Setting the validity of the URL to false
        setValidUrl(false);
      }
    };

    // Calling the email verification function
    verifyEmailUrl();
  }, [param]);  // Running the effect whenever the 'param' variable changes

  return (
    <>
      {validUrl ? (
        // Displaying a success message if the URL is valid
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        // Displaying a 404 Not Found message if the URL is invalid
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

// Exporting the EmailVerify component for use in other parts of the application
export default EmailVerify;
