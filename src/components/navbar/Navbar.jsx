import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "../../contextApi/state";
import "./style.css";
const Navbar = () => {
  const [{ user, token }, dispatch] = useStateValue();
  const [logout, setLogout] = useState("");
  const [active, setActive] = useState("");

  const userDetails = JSON.parse(localStorage.getItem("user"));
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOG_OUT",
    });
    localStorage.setItem("user", JSON.stringify(logout));
  };
  const headers = [
    { name: "Home", class: "activeHome", path: "/" },
    { name: "User", class: "activeUsers", path: "/users" },
    { name: "Active user", class: "active-user", path: "/active/user" },
    { name: "Create Post", class: "activeCreate", path: "/create" },
  ];

  return (
    <div className="navbar">
      <div className="left">MOBILE FIRST TASK</div>
      <div className="right" style={{ cursor: "pointer" }}>
        {/* <span onClick={handleLogOut}>Log out</span> */}

        {userDetails.isAdmin &&
          headers.map((title) => (
            <>
              <Link to={title.path}>
                <button
                  value={title.class}
                  className={`headerButton ${
                    active === title.class ? "activeLinks" : ""
                  }`}
                  onClick={(e) => setActive(e.target.value)}
                >
                  {title.name}
                </button>
              </Link>
            </>
          ))}
        <span onClick={handleLogOut} className="logout">
          logout
        </span>
      </div>
    </div>
  );
};

export default Navbar;
