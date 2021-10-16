import { toast } from "react-toastify";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./Post.css";
import { useState } from "react";
const Post = (props) => {
  let history = useHistory();
  const [comment, setComment] = useState("")
  function add(e){
    setComment(e.target.value)
  }
  const func = async () => {
    console.log(props.val.id);
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    };
    let url = "http://localhost:8080/post/deletePost/id/" + props.val.id;
    await fetch(url, requestOptions).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());
      console.log(data);
      if (response.status === 200) {
        toast.success("Post Deleted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else{
        toast.error(data.message, {
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

  async function addComment(){
    let formData = new FormData();
    formData.append("comment", comment);
    formData.append("postId", props.val.id);
    formData.append("userId", props.val.userId);
    const requestOptions = {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") , "Content-Type": "application/json"},
      body : JSON.stringify({
        "comment": comment,
        "postId": props.val.id,
        "userId" : localStorage.getItem("userid")
      }),
    };
    let url = "http://localhost:8080/image/addcomment";


    await fetch(url, requestOptions).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());
      console.log(data);
      if (response.status === 200) {
        toast.success("Comment added Successfully!", {
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

  }
  function deletePost() {
    func();
  }
  return (
    <>
      <div className="container mt-1 mb-1">
        <div className="d-flex justify-content-center row">
          <div className="col-md-5">
            <div className="feed p-2">
              <div className="bg-white border mt-2">
                <div>
                  <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                    <div className="d-flex flex-row align-items-center feed-text px-2">
                      <img
                        className="rounded-circle"
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        width="60"
                        height="60"
                        alt="here"
                      />
                      <div className="d-flex flex-column flex-wrap ml-2">
                        <span className="font-weight-bold">
                          {props.val.userName}
                        </span>
                      </div>
                    </div>
                    <div className="feed-icon px-2">
                      <i
                        className="fa fa-trash"
                        style={{ cursor: "pointer" }}
                        data-toggle="modal"
                        data-target="#exampleModal"
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="feed-image p-2 px-3">
                  <img className="img-fluid img-responsive" src={props.val.url} alt="here" />
                </div>

                <div className="p-2 px-3">
                  <span>{props.val.description}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Do you want to delete this Post?
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={deletePost}>
                            Delete Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-2">
                  <div className="d-flex flex-row fs-12">
                    <div className="like p-2 cursor">
                      <i className="fa fa-thumbs-o-up"></i>
                      <span className="ml-1">Like</span>
                    </div>
                    <div
                      className="like p-2 cursor action-collapse"
                      data-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="collapse-1"
                      href="#collapse-1"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa fa-commenting-o" id="myGroup"></i>
                      <span className="ml-1">Comment</span>
                    </div>
                    <div
                      className="like p-2 cursor action-collapse"
                      data-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="collapse-2"
                      href="#collapse-2"
                    >
                      <i className="fa fa-share"></i>
                      <span className="ml-1">Share</span>
                    </div>
                  </div>
                </div>
                <div
                  id="collapse-1"
                  className="bg-light p-2 collapse"
                  data-parent="#myGroup"
                >
                  <div className="d-flex flex-row align-items-start">
                    <img
                      className="rounded-circle"
                      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      width="40"
                      alt="here"
                    />
                    <textarea className="form-control ml-1 shadow-none textarea" value={comment} onChange={add}></textarea>
                  </div>

                  <div className="mt-2 text-right">
                    <button
                      className="btn btn-primary btn-sm shadow-none"
                      type="button"
                      onClick={addComment}
                    >
                      Post comment
                    </button>
                    <button
                      className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>


                  
                    {props.val.comments.map((val) => (
                    <div className="d-flex align-content-center flex-wrap">
                    <img
                      className="rounded-circle"
                      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      width="45" alt="here"
                    />
                    <h6 className="p-2 mt-2 align-self-center"> {val.userModel.firstname + " " + val.userModel.lastname}</h6>
                    <p  className=" mt-3 align-self-center"> {val.comment} </p> </div>))
                    }
                    


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      
    </>
  );
};
export default Post;
