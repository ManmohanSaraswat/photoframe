import React, { useState } from "react";
import {useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddImage() {
  let history = useHistory()
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const forceUpdate = React.useState()[1].bind(null, {})
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("file", selectedFile);
    console.log(formData)
    await fetch("http://localhost:8080/addImage", {
      method: "POST",
      headers:{"Authorization": "Bearer "+localStorage.getItem("token")},
      body: formData
    }).then(
    async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());

      if (response.status === 200) {
        window.location.reload();
        toast.success('Image Uploaded Successfully!', {
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
    }
  );
    
  };

  return (
    <>
      <div class="form-group">
        <label for="exampleFormControlFile1">Create Post</label>
        <input
          type="file"
          class="form-control-file md-3"
          onChange={changeHandler}
          id="exampleFormControlFile1"
        />
        <button
          type="button"
          class="btn btn-secondary mt-3"
          onClick={handleSubmission}
        >
          Post
        </button>
      </div>
    </>
  );
}
export default AddImage;
