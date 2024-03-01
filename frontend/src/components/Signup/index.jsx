// Importing React hook for state management
import { useState } from "react";
// Importing Axios library for making HTTP requests
import axios from "axios";
// Importing the Link component from React Router for navigation
import { Link } from "react-router-dom";
// Importing styles from an external CSS module
import styles from "./styles.module.css";

// Functional component for the signup page
const Signup = () => {
  // State variables to manage form data, error messages, and success message
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  // Function to handle input changes in the form
  const handleChange = ({ currentTarget: input }) => {
    // Updating the state with the input value
    setData({ ...data, [input.name]: input.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    
    try {
      // API endpoint for user registration
      const url = "http://localhost:5000/api/users";
      
      // Sending a POST request to the server with user data
      const { data: res } = await axios.post(url, data);
      
      // Setting success message state with the response message
      setMsg(res.message);
    } catch (error) {
      // Handling errors from the server response
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // Setting the error state with the error message from the server
        setError(error.response.data.message);
      }
    }
  };

  // JSX for rendering the signup form and related content
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          {/* Additional options for users who already have an account */}
          <h1>Welcome Back</h1>
          {/* Link to the login page */}
          <Link to="/login">
            {/* Button for navigating to the login page */}
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          {/* Signup form */}
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            {/* First Name input */}
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            {/* Last Name input */}
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            {/* Email input */}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            {/* Password input */}
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {/* Displaying error message if there is an error */}
            {error && <div className={styles.error_msg}>{error}</div>}
            {/* Displaying success message if the registration is successful */}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            {/* Submit button */}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Exporting the Signup component for use in other parts of the application
export default Signup;
