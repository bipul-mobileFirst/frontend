import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "../../contextApi/state";
import { logOutUsers } from "../../redux/AdminRedux";
import "./style.css";
const Navbar = () => {
  // const [{ user, token }, dispatch] = useStateValue();
  const { isAdmin } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // const [logout, setLogout] = useState("");
  const [active, setActive] = useState("");

  // const userDetails = JSON.parse(localStorage.getItem("user"));
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutUsers());
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

        {isAdmin &&
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
        {!isAdmin && (
          <span onClick={handleLogOut} className="logout">
            liked Post
          </span>
        )}

        <span onClick={handleLogOut} className="logout">
          logout
        </span>
      </div>
    </div>
  );
};

export default Navbar;
