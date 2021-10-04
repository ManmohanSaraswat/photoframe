import { toast } from "react-toastify";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
const Post = (props) => {
  let history = useHistory();
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
        history.push("/login");
        toast.success("Post Deleted Successfully!", {
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
  function deletePost() {
    func();
  }
  return (
    <>
      <div class="container mt-4 mb-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-5">
            <div class="feed p-2">
              <div class="bg-white border mt-2">
                <div>
                  <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                    <div class="d-flex flex-row align-items-center feed-text px-2">
                      <img
                        class="rounded-circle"
                        src={props.val.url}
                        width="60"
                        height="60"
                      />
                      <div class="d-flex flex-column flex-wrap ml-2">
                        <span class="font-weight-bold">Thomson ben</span>
                        <span class="text-black-50 time">40 minutes ago</span>
                      </div>
                    </div>
                    <div class="feed-icon px-2">
                      <i class="fa fa-ellipsis-v text-black-50"></i>
                    </div>
                  </div>
                </div>
                <div class="feed-image p-2 px-3">
                  <img class="img-fluid img-responsive" src={props.val.url} />
                </div>

                <div class="p-2 px-3">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Name: {props.val.firstname} {props.val.name}{" "}
                  </span>
                </div>
                <div class="d-flex justify-content-between">
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={deletePost}
                  >
                    Delete Post
                  </button>

                  <div class="d-flex justify-content-end socials p-2 py-3">
                    <i class="fa fa-thumbs-up"></i>
                    <i class="fa fa-comments-o"></i>
                    <i class="fa fa-share"></i>
                  </div>
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
