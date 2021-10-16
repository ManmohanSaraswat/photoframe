import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createpost.css";
function AddImage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [description, setDescription] = useState("");
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = async () => {
    if (isFilePicked === false) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("file", selectedFile);
    formData.append("description", description);
    formData.append("userid", localStorage.getItem("userid"));
    console.log(formData);
    await fetch("http://192.168.0.106:8080/addImage", {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      body: formData,
    }).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());

      if (response.status === 200) {
        window.location.reload();
        toast.success("Image Uploaded Successfully!", {
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
        console.log(response.error);
        toast.error(response.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
    setIsFilePicked(false);
  };

  return (
    <>
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
                  onChange={changeDescription}
                ></textarea>
                
                </div>
                <div className="custom-file mb-3">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  onChange={changeHandler}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  <a className="btn btn-sm btn-default">
                    <i className="fa fa-camera"></i>
                  </a>
                </label>
              </div>
              {isFilePicked? <img src=""></img> : <> </>}
            </div>

              

           
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSubmission}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <li
        className="nav-item d-flex"
        style={{ fontSize: "30px" }}
        data-toggle="modal"
        data-target="#exampleModalLong"
      >
        <i className="fa fa-camera-retro align-self-center"></i>
        <h4 className="nav-link align-self-center m-0">Add Post</h4>
      </li>
      
    </>
  );
}
export default AddImage;
