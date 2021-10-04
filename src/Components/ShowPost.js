import Post from "./Post";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
const ShowUser = () => {
  const [data, setData] = useState([]);
  let history = useHistory();
  if(!localStorage.getItem("token")){
    history.push("/login");
  }
  useEffect( () => {async function fetchData() {
    const url = "http://localhost:8080/image";
    let val = await fetch(url);
    let parsedData = await val.json();
    setData(parsedData);
  } if(data.length === 0)fetchData()}, [data]);
  return (
    <div className="mt-3 d-flex flex-wrap">
        {data.map((val) => (<Post val={val} />))}
    </div>
  );
};
export default ShowUser;
