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

const App = () => {
  const [{ user, token }, dispatch] = useStateValue();

  const data = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      {data && <Navbar />}

      <Routes>
        <Route path="/" element={data ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!data ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!data ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/users"
          element={data.isAdmin ? <User /> : <Navigate to="/" />}
        />
        <Route
          path="/active/user"
          element={data.isAdmin ? <Activeusers /> : <Navigate to="/" />}
        />
        <Route
          path="/create"
          element={data.isAdmin ? <Create /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;
