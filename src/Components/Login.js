import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
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
          localStorage.setItem("token", data.message);
          history.push("/home");
          console.log("saved in local storage");
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
          const error = (data && data.message) || response.status;
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
          <p className="forgot-password text-right">
            <Link to="/signup">Forgot Password ?</Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;
