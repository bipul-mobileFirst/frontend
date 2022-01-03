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

const App = () => {
  const [{ user, token }, dispatch] = useStateValue();

  const data = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
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
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;
