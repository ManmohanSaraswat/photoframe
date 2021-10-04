import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createpost.css";
function AddImage() {
  let history = useHistory();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const forceUpdate = React.useState()[1].bind(null, {});
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("file", selectedFile);
    console.log(formData);
    await fetch("http://localhost:8080/addImage", {
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
        const error = (data && data.message) || response.status;
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
      <div class="container mt-4 mb-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-5">
            <section class="panel  timeline-post-to">
              <div class="panel-body">
                  <textarea
                    class="form-control"
                    placeholder="What's on your mind?"
                  ></textarea>
                  <div class="row">
                    <div class="col-sm-6">
                    <div class="input-group mb-3">
  <div class="custom-file">
  
    <input type="file" class="custom-file-input" id="inputGroupFile01" onChange={changeHandler}/>
    <label class="custom-file-label" for="inputGroupFile01"><a class="btn btn-sm btn-default"><i class="fa fa-camera"></i></a></label>
  </div>
</div>
                    </div>
                    <div class="col-sm-6 text-right">
                      <button type="submit" class="btn btn-primary" onClick={handleSubmission}>
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
