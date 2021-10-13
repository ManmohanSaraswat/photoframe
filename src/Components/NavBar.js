import React from "react";
import { Link } from "react-router-dom";
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
            <li
              className="nav-item d-flex"
              style={{ fontSize: "30px" }}
              data-toggle="modal"
              data-target="#exampleModalLong"
            >
              <i className="fa fa-camera-retro align-self-center"></i>
              <h4 className="nav-link align-self-center m-0">Add Post</h4>
            </li>
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

          <div
            class="modal fade"
            id="exampleModalLong"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Create Post
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">
                  <div class="mb-3">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="What's on your mind?"
                      rows="3"
                    ></textarea>
                  </div>
                  <p> Hello there</p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
