import "./ContactUsMessages.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { doc, getDoc,collection, getDocs,limit,orderBy,query} from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";

const Featured =() => {
  const [data, setData] = useState([]);
  const [timeData, setTimeData] = useState([]);


  const [seeAll, setSeeAll] = useState(false);
  const newData =[];
  const newTime = [];

  useEffect(() => {
    const order = orderBy("timeStamo","desc");
    const fetchData = async() =>{
  
      const q = query(collection(db, 'contactUsMessage'), orderBy("timeStamp","desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const serverTimestamp = doc.data().timeStamp.toDate();
   
    // console.log(doc.id, " => ", doc.data());
    const formattedDate = serverTimestamp.toLocaleDateString();
  const formattedTime = serverTimestamp.toLocaleTimeString();
  const time = formattedDate.concat(" "+formattedTime);
  // console.log(time);
  // doc.data().timeStamp = time;
    // console.log(doc.data());
    newTime.push(time);
    // setdata(doc.data().timeStamp);
    newData.push(doc.data());
  });
  setData(newData);
  setTimeData(newTime);
}
fetchData();
},[]);
// console.log(data);
// console.log(timeData);


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Messages</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
      <div className="card" style={{width: "30rem"}}>
  <div className="card-body">
    <h5 className="font-weight-bold mb-3">Messages from Contact Us page</h5>
  </div>
  {data.map((item, index) => (
  <ul className="list-group list-group-flush" key={index}>
    <p className="mb-0 p-3">{item.message}</p>
    <li className="list-group-item">{"Name: " + item.name}</li>
    <li className="list-group-item">Email: <a href={"mailto:"+item.email} className="">{item.email}</a></li>
    <li className="list-group-item">{"Phone: " + item.phone}</li>
    <li className="list-group-item">{"Time: " + timeData[index]}</li>
  </ul>
))}
    
  {/* <div className="card-body">
    <a href="#!" className="card-link">Card link</a>
    <a href="#!" className="card-link">Another link</a>
  </div> */}
</div>
        {/* <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">$420</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Featured;
