import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const qualification = useRef();
  const city = useRef();
  const phoneNumber = useRef();

  const handleClick = async (e) => {
    e.preventDefault();

    const userDetails = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      qualification: qualification.current.value,
      city: city.current.value,
      phone_no: phoneNumber.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        userDetails
      );
      setSuccess(!success);
    } catch (error) {
      console.log(error);
      setError("Email already registered! please login");
    }
  };
  return (
    <div className="register">
      <div className="registerContainer">
        {error && <span className="error">{error}</span>}
        {success && (
          <span className="success">
            Register success please{" "}
            <Link style={{ color: "white" }} to="/login">
              login
            </Link>{" "}
          </span>
        )}
        <form onSubmit={handleClick} className="registerWrapper">
          <h1>Register</h1>
          <input
            className="input"
            type="text"
            ref={username}
            placeholder="username"
            required
          />
          <input
            className="input"
            type="email"
            ref={email}
            onChange={() => setError("")}
            placeholder="email"
            required
          />
          <input
            className="input"
            type="password"
            ref={password}
            placeholder="password"
            required
          />
          <input
            className="input"
            type="text"
            ref={qualification}
            placeholder="qualification"
            required
          />
          <input
            className="input"
            type="text"
            ref={city}
            placeholder="city"
            required
          />
          <input
            className="input"
            type="number"
            ref={phoneNumber}
            maxLength="10"
            placeholder="phone no"
            required
          />
          <button type="submit" className="button">
            register
          </button>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <span className="spanLogin">Already have an account? Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
