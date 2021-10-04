import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
  let history = useHistory()
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const editEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
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
  function signup() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      }),
    };
    fetch("http://localhost:8080/signup", requestOptions).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(data);
        if (!response.ok) {
          console.log(response)
          const error = (data && data.message) || response.status;
          toast.warning(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          return Promise.reject(error);
        }else{
          toast.success(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            history.push("/home")
        }
      }
    );
  }
  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
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
              <input
                type="text"
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

            <button type="submit" className="btn btn-primary btn-block" onClick={signup}>
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered
              <Link to="/login"> Sign in ?</Link>
            </p>
        </div>
      </div>
    </>
  );
}
export default Signup;
