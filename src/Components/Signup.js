import React, { useState } from "react";
import { Link } from "react-router-dom";
function Signup() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const editEmail = (e) => {
    setEmail(e.target.value);
    console.log(email)
  };
  const editFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const editLastname = (e) => {
    setLastname(e.target.value);
  };
  const editPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
    <div className="auth-wrapper">
        <div className="auth-inner">
      <form>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={firstname}
            onChange={editFirstname}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input type="text"
           className="form-control" 
           placeholder="Last name" 
           value={lastname}
           onChange={editLastname}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={editEmail}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={editPassword}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered 
          <Link to="/login">  Sign in ?</Link>
        </p>
      </form>
      </div>
      </div>
    </>
  );
}
export default Signup;
