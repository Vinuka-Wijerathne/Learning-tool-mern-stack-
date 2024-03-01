import axios from "axios";

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Update this line with your new server URL
  withCredentials: true, // Include this line if you need to send credentials (like cookies) with your requests
});

// Base URL for the API
const baseUrl = "http://localhost:5000/api/todos";

// Function to get all ToDos
const getAllToDo = (setToDo) => {
  const token = localStorage.getItem('token');

  axiosInstance
    .get(`${baseUrl}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      console.log(data); 
      if (Array.isArray(data)) {
        console.log('data--->', data);
        setToDo(data);
      } else {
        console.error('Invalid data format received from the server.');
      }
    })
    .catch((error) => {
      console.error('Error fetching todos:', error);
    });
};

// Function to add a new ToDo
const addToDo = (text, setText, setToDo) => {
  const token = localStorage.getItem('token');

  // Set isChecked to false initially when creating a new ToDo
  const isChecked = false;

  axiosInstance
    .post(`${baseUrl}/save`, { text, isChecked }, { headers: { Authorization: `Bearer ${token}` } })
    .then((data) => {
      console.log(data);
      // Clear the input text and fetch all ToDos to update the state
      setText("");
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.error('Error adding todo:', error);
      console.log(error.response.data);
    });
};

// Function to update a ToDo
const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  const token = localStorage.getItem('token');

  axiosInstance
    .post(`${baseUrl}/update`, { _id: toDoId, text }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      // Clear the input text, reset the update state, and fetch all ToDos to update the state
      setText("");
      setIsUpdating("");
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.error('Error updating todo:', error);
    });
};

// Function to delete a ToDo
const deleteToDo = (_id, setToDo) => {
  const token = localStorage.getItem('token');

  axiosInstance
    .post(`${baseUrl}/delete`, { _id }, { headers: { Authorization: `Bearer ${token}` } })
    .then((data) => {
      // Fetch all ToDos to update the state after deletion
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.error('Error deleting todo:', error);
      console.log('Server response:', error.response.data);
    });
};

// Function to update user profile
const updateProfile = async (userData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.post(
      `http://localhost:5000/api/profile/update-profile`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Profile updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// Function to delete the user account
const deleteAccount = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.delete(`http://localhost:5000/api/profile/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Account deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting account:", error);
  }
};

// Exporting the functions for use in other parts of the application
export { getAllToDo, addToDo, updateToDo, deleteToDo, updateProfile, deleteAccount };
