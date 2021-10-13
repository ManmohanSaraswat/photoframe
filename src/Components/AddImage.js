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
  };

  return (
    <>
      <div className="container mt-4 mb-2">
        <div className="d-flex justify-content-center row">
          <div className="col-md-5">
            <section className="panel  timeline-post-to">
              <div className="panel-body">
                <textarea
                  className="form-control"
                  placeholder="What's on your mind?"
                  onChange={changeDescription}
                ></textarea>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-group mb-3">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile01"
                          onChange={changeHandler}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile01"
                        >
                          <a className="btn btn-sm btn-default">
                            <i className="fa fa-camera"></i>
                          </a>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 text-right">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSubmission}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddImage;
