import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  let history = useHistory();
  if(localStorage.getItem("token")){
    history.push("/home");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const editEmail = (e) => {
    setEmail(e.target.value);
  };
  const editPassword = (e) => {
    setPassword(e.target.value);
  };

  function authLogin() {
      
      if(email.length < 6 || password < 8){
        toast.error('Length of Email/Password should be greater than 8', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return;
      }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("http://localhost:8080/login", requestOptions).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        if (response.status === 200) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userid", data.userId);
          localStorage.setItem("username", data.userName);
          localStorage.setItem("email", email);
          history.push("/home");
          setEmail("");
          setPassword("");
          toast.success('Logged In Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        if (!response.ok) {
          setEmail("");
          setPassword("");
          toast.error('Invalid Credentials!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      }
    );
  }

  return (
    <>
    
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Sign In</h3>

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

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={authLogin}
          >
            Submit
          </button>
          <div className="d-flex justify-content-between mt-2">
          <p className="forgot-password text-left">
            <Link to="/signup">Create Account</Link>
          </p>
          <p className="forgot-password text-right">
            <Link to="/signup">Forgot Password ?</Link>
          </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
