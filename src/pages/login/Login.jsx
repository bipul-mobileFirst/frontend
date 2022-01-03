import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../../contextApi/state";
import ReactLoading from "react-loading";

import "./style.css";
const Login = () => {
  const email = useRef();
  const password = useRef();
  const [{}, dispatch] = useStateValue();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading("loading......");
    const userDetails = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        userDetails
      );
      setIsLoading("");
      localStorage.setItem("user", JSON.stringify(res.data.accesstoken));
      dispatch({
        type: "USER_LOGIN",
        user: res.data,
        token: res.data.accesstoken,
      });
      // Navigate("/");
    } catch (error) {
      setIsLoading("");
      setError(true);
    }
  };
  return (
    <div className="login">
      <div className="loginContainer">
        {error && (
          <span className="error">email and password are not matched!</span>
        )}
        <form onSubmit={handleSubmit} className="loginWrapper">
          <h1>Login</h1>

          <input
            className="input"
            type="email"
            ref={email}
            placeholder="email"
            required
            onChange={() => setError(false)}
          />
          <input
            className="input"
            type="password"
            ref={password}
            placeholder="password"
            required
            onChange={() => setError(false)}
          />
          {isLoading ? (
            <ReactLoading type="bars" color="white" />
          ) : (
            <button type="submit" className="button">
              login
            </button>
          )}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="spanLogin">Create an account? sign In</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
