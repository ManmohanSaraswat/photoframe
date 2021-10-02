const User = (props) => {
  const func = async () => {
    let url = "http://localhost:8080/delete/" + props.val.email;
    console.log(url);
    fetch(url, { method: 'DELETE' })
    .then(response => {
      //do something with response
      console.log("completed")
    })
    .catch(err => {
      throw new Error(err)
    })
  };
  function handleOnClick() {
    func();
  }
  return (
    <div className="card mr-3" style={{ width: 18 + "rem" }}>
      <img
        src="https://cdn-icons.flaticon.com/png/512/561/premium/561845.png?token=exp=1633002679~hmac=37a3f37fbf71fbf7f86b041a013d6472"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">
          Name: {props.val.firstname} {props.val.lastname}{" "}
        </h5>
        <p className="card-text">Email : {props.val.email}</p>
        <button type="button" class="btn btn-dark" onClick={handleOnClick}>
          Delete User
        </button>
      </div>
    </div>
  );
};
export default User;
