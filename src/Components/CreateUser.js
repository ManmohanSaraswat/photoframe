import {useState, useEffect} from "react"
function CreateUser() {
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const editEmail = (e)=>{ setEmail(e.target.value)}
    const editFirstname = (e)=>{ setFirstname(e.target.value)}
    const editLastname = (e)=>{ setLastname(e.target.value)}
    const editPassword = (e)=>{ setPassword(e.target.value)}
    function signup(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "email": email,
        "password" : password, "firstname" : firstname, "lastname" : lastname })
        };
            fetch('http://localhost:8080/signup', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                console.log(data)
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
            })
            
        
    }
  return (
    <>
    <div className="container mt-3">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={editEmail}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input
            type="text"
            class="form-control"
            id="firstname"
            aria-describedby="emailHelp"
            placeholder="Enter firstname"
            onChange={editFirstname}
            value={firstname}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="lastname"
            aria-describedby="emailHelp"
            placeholder="Enter lastname"
            value={lastname}
            onChange={editLastname}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={editPassword}
          />
        </div>
        <button class="btn btn-primary" onClick={signup}>
          Submit
        </button>
        </div>
    </>
  );
}
export default CreateUser;
