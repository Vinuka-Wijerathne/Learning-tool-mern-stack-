// Importing React hook for state management
import { useState } from "react";
// Importing Axios library for making HTTP requests
import axios from "axios";
// Importing the Link component from React Router for navigation
import { Link } from "react-router-dom";
// Importing styles from an external CSS module
import styles from "./styles.module.css";

// Functional component for the login page
const Login = () => {
  // State variables to manage form data and error messages
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Function to handle input changes in the form
  const handleChange = ({ currentTarget: input }) => {
    // Updating the state with the input value
    setData({ ...data, [input.name]: input.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    
    try {
      // API endpoint for user authentication
      const url = "http://localhost:5000/api/auth/login";
      
      // Sending a POST request to the server with user data
      const { data: res } = await axios.post(url, data);
      
      // Storing the authentication token in local storage
      localStorage.setItem("token", res.data.token);

      
      // Redirecting to the home page upon successful login
      window.location = "/todo";
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

  // JSX for rendering the login form and related content
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          {/* Login form */}
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
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
            {/* Submit button */}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          {/* Additional options for new users */}
          <h1>New Here?</h1>
          {/* Link to the signup page */}
          <Link to="/signup">
            {/* Button for navigating to the signup page */}
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Exporting the Login component for use in other parts of the application
export default Login;
