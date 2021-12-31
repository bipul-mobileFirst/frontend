import React from "react";
import "./style.css";
const Register = () => {
  return (
    <div className="register">
      <div className="registerContainer">
        <div className="registerWrapper">
          <h1>Register</h1>
          <input className="input" type="text" placeholder="username" />
          <input className="input" type="text" placeholder="email" />
          <input className="input" type="text" placeholder="password" />
          <input className="input" type="text" placeholder="qualification" />
          <input className="input" type="text" placeholder="city" />
          <input className="input" type="text" placeholder="phone no" />
          <button className="button">register</button>
          <span className="spanLogin">Already have an account? Login</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
