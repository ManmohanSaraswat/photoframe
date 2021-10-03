import User from "./User";
import { useEffect, useState } from "react";
import { unmountComponentAtNode, render } from "react-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization" : "Bearer "+localStorage.token},
  };
  useEffect( () => {async function fetchData() {
    const url = "http://localhost:8080/image";
    let val = await fetch(url, requestOptions);
    let parsedData = await val.json();
    console.log(parsedData)
    setData(parsedData);
  } if(data.length === 0)fetchData()}, [data]);

  return (
    <div className="mt-3 d-flex flex-wrap">
        {data.map((val) => (<User val={val} />))}
    </div>
  );
};
export default Home;
