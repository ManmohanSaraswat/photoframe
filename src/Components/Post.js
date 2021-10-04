import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
const Post = (props) => {
  let history = useHistory();
  const func = async () => {
    console.log(props.val.id)
    const requestOptions = {
      method: "GET",
      headers: {"Authorization" : "Bearer "+localStorage.getItem("token"),
      }
    };
    let url = "http://localhost:8080/post/deletePost/id/"+props.val.id;
    await fetch(url, requestOptions).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(data);
        if (response.status === 200) {
          history.push("/login");
          toast.success('Post Deleted Successfully!', {
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
  function deletePost() {
    func();
  }
  return (
    <div className="card mr-3 mb-3" style={{ width: 18 + "rem" }}>
      <img
        src={props.val.url}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">
          Name: {props.val.firstname} {props.val.name}{" "}
        </h5>
        <button type="button" class="btn btn-dark" onClick={deletePost}>
          Delete Post
        </button>
      </div>
    </div>
  );
};
export default Post;
