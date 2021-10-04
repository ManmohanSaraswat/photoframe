import React from 'react';
import { Link } from "react-router-dom";
function NavBar(){
  function logout(){
    localStorage.removeItem("token");
  }
  return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container" id = "user">
          <Link className="navbar-brand" to={"/sign-in"}>PhotoFrame</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={logout}> Logout </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}
export default NavBar;