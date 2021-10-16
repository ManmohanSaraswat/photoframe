import React from "react";
import { Link } from "react-router-dom";
import AddImage from "./AddImage";
function NavBar() {
  function logout() {
    localStorage.removeItem("token");
  }

  
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container" id="user">
        <Link
          className="navbar-brand"
          to={"/sign-in"}
          style={{ fontSize: "30px" }}
        >
          PhotoFrame
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto d-flex">
            <li className="nav-item align-self-center">
              <h4 className="nav-link align-self-center m-0">
                Welcome! {localStorage.getItem("username")}{" "}
              </h4>
            </li>
    
    <AddImage/>

            <li className="nav-item align-self-center d-flex mr-5">
              <div class="dropdown show">
                <a
                  class="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    class="fa fa-user align-self-center m-0"
                    aria-hidden="true"
                    style={{ fontSize: "25px" }}
                  ></i>
                </a>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">
                    View Profile
                  </a>
                  <Link className="dropdown-item" to="/login" onClick={logout}>
                    Logout{" "}
                  </Link>
                </div>
              </div>
            </li>
          </ul>

          
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
