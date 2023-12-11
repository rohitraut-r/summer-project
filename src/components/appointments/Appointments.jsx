import "./Appointments.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { doc, getDoc,collection, getDocs,limit,orderBy,query} from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";
import { deleteDoc } from "firebase/firestore";

const Featured =() => {
  const [data, setData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  let id = []; 
  const [ids, setId] = useState([]);



  const [seeAll, setSeeAll] = useState(false);
  const newData =[];
  const newTime = [];

  useEffect(() => {
    const fetchData = async() =>{
  
      const q = query(collection(db, 'appointments'), orderBy("timeStamp","desc"), limit(3));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const serverTimestamp = doc.data().timeStamp.toDate();
   
    console.log(doc.id, " => ", doc.data());
    id.push(doc.id);
    setId(id);
    const formattedDate = serverTimestamp.toLocaleDateString();
  const formattedTime = serverTimestamp.toLocaleTimeString();
  const time = formattedDate.concat(" "+formattedTime);
  console.log(time);
  // doc.data().timeStamp = time;
    console.log(doc.data());
    newTime.push(time);
    // setdata(doc.data().timeStamp);
    newData.push(doc.data());
   
  });
  setData(newData);
 
  setTimeData(newTime);
}
fetchData();
},[]);

const handleDelete = async(id) => {
  try{
    await deleteDoc(doc(db, "appointments", id));
    setData(data.filter((item) => item.id !== id));
    window.location.reload();
  }catch(err){
    console.log(err)
  }
 
};
console.log(data);
console.log(ids);
console.log(timeData);


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Appointments</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
      <div className="card" style={{width: "30rem"}}>
  <div className="card-body">
    <h5 className="font-weight-bold mb-3">Appointments</h5>
  </div>
  {data.map((item, index) => (
  <ul className="list-group list-group-flush" key={index}>
    {/* <p className="mb-0 p-3">{item.purpose}</p> */}
    <li className="list-group-item">{"Name: " + item.name}</li>
    <li className="list-group-item">Email: <a href={"mailto:"+item.email} className="">{item.email}</a></li>
    <li className="list-group-item">{"Purpose: " + item.purpose}</li>
    <li className="list-group-item">{"Booking Date: " + item.bookingDate}</li>
    <li className="list-group-item">{"Booking time: " + item.bookingTime}</li>
    <li className="list-group-item">{"Duration(hours): " + item.duration}</li>
    <li className="list-group-item">{"Phone: " + item.phone}</li>
    <li className="list-group-item">{"Time: " + timeData[index]}</li>
    <li className="list-group-item"><button className="deleteButton" onClick={() => handleDelete(ids[index])}>Delete</button></li>

  </ul>
))}
    
  
</div>
       
      </div>
    </div>
  );
};

export default Featured;
