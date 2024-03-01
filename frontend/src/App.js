import React, { useState, useEffect } from "react";
import ToDo from "./components/ToDo";
import Navigationbar from "./components/Navigationbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./components/profile/profile";
import SpotifyEmbedPanel from "./components/spotify";
import NoteTakingPage from "./components/NoteTaking/NoteTakingPage";
import WorkspacePage from "./components/NoteTaking/WorkSpacePage";
import Pomodoro from "./components/pomodoro/pomodoro";
import Timer from "./components/pomodoro/Timer";

function App() {
  const user = localStorage.getItem("token");
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notes" element={<NoteTakingPage/>}/>
          <Route path="/workspace" element={<WorkspacePage/>} />
          <Route path="/pomodoro" element={<Pomodoro/>}/>
          <Route path="/timer" element={<Timer/>}/>
          <Route
            path="/todo"
            element={
              user ? (
                <div className="container">
                  <Navigationbar handleLogout={handleLogout} />
                  <h1>HeadQuarters</h1>

                  <div className="top">
                    <input
                      type="text"
                      placeholder="Add a task..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />

                    <div
                      className="add"
                      onClick={
                        isUpdating
                          ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                          : () => addToDo(text, setText, setToDo)
                      }
                    >
                      {isUpdating ? "Update" : "Add"}
                    </div>

                    {/* Input for Spotify Playlist */}
                    
                  </div>

                  {/* Embed Spotify Playlist component */}
                  

                  <div className="list">
                    {toDo.map((item) => (
                      <ToDo
                        key={item._id}
                        text={item.text}
                        updateMode={() => updateMode(item._id, item.text)}
                        deleteToDo={() => deleteToDo(item._id, setToDo)}
                      />
                    ))}
                  </div><br></br>
                  <div><SpotifyEmbedPanel /></div>
                  
                </div>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
