import React from 'react';
import { Link } from "react-router-dom";
function NavBar() {
  return (
    // <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container" id = "user">
          <Link className="navbar-brand" to={"/sign-in"}>PhotoFrame</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    // </div>
  );
}
export default NavBar;