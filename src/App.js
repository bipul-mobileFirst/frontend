import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import { useStateValue } from "./contextApi/state";
import Notfound from "./pages/NotFound";
import Navbar from "./components/navbar/Navbar";
import Activeusers from "./components/activeUsers/ActiveUsers";
import User from "./components/user/User";
import Create from "./components/createPost/Create";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
ReactModal.setAppElement("#root");
const App = () => {
  // const [{ user, token }, dispatch] = useStateValue();
  const { currentUser, isAdmin } = useSelector((state) => state.users);
  console.log("users", currentUser);
  // const data = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      {currentUser && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!currentUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!currentUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/users"
          element={isAdmin ? <User /> : <Navigate to="/" />}
        />
        <Route
          path="/active/user"
          element={isAdmin ? <Activeusers /> : <Navigate to="/" />}
        />
        <Route
          path="/create"
          element={isAdmin ? <Create /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;
