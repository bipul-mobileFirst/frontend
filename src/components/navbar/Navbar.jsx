import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useStateValue } from "../../contextApi/state";
import "./style.css";
const Navbar = () => {
  const [{ user, token }, dispatch] = useStateValue();
  const [logout, setLogout] = useState("");
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOG_OUT",
    });
    localStorage.setItem("user", JSON.stringify(logout));
  };
  return (
    <div className="navbar">
      <div className="left">MOBILE FIRST TASK</div>
      <div className="right" style={{ cursor: "pointer" }}>
        <span onClick={handleLogOut}>Log out</span>
      </div>
    </div>
  );
};

export default Navbar;
