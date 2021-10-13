import Post from "./Post";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import AddImage from "./AddImage";
const Home = (props) => {
  let history = useHistory();
  if(!localStorage.getItem("token")){
    history.push("/login");
  }
  const [data, setData] = useState([]);
  
  useEffect( () => {async function fetchData() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization" : "Bearer "+localStorage.getItem("token")},
    };
    const url = "http://192.168.0.106:8080/image";
    let val = await fetch(url, requestOptions);
    let parsedData = await val.json();
    console.log(parsedData)
    setData(parsedData);
  } if(data.length === 0)fetchData()}, [data]);
  
  return (
    <>
    <NavBar/>
    <AddImage />
    <div className="mt-3 d-flex flex-wrap">
        {data.map((val) => (<Post val={val} key = {val.id}/>))}
    </div>
    
    </>
  );
};
export default Home;
