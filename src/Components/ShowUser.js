import User from "./User";
import { useEffect, useState } from "react";
const ShowUser = () => {
  const [data, setData] = useState([]);

  useEffect( () => {async function fetchData() {
    const url = "http://localhost:8080/getAll";
    let val = await fetch(url);
    let parsedData = await val.json();
    setData(parsedData);
  } if(data.length === 0)fetchData()}, [data]);
  return (
    <div className="mt-3 d-flex">
        {data.map((val) => (<User val={val} />))}
    </div>
  );
};
export default ShowUser;
