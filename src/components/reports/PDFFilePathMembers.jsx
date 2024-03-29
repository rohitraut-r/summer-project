import React from "react";
import {
 

  PDFDownloadLink,
  PDFViewer
  
} from "@react-pdf/renderer";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import PDFFilesMembers from "./PDFFilesMembers";
import { collection, getDocs,query, where} from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";


let list = [];

const PDFFilePath = () => {
  const [refresh, setRefresh] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState(''); // Default value '1' for ALL
  const [minAge, setMinAge] =  useState('');
  const [maxAge, setMaxAge] =  useState('');
  const [data, setData] =  useState([]);


  const refreshComponent = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  }
  const handleMinAgeChange = (event) =>{
    setMinAge(event.target.value);
  }
  const handleMaxAgeChange = (event) =>{
    setMaxAge(event.target.value);
  }
  

  useEffect(() => {
    const fetchData = async (e) => {
      
      try {
        if(selectedFilter === "male"){
        list = [];
        const q = query(collection(db, "members"), where("gender", "==", "Male"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list);
      }
      else if(selectedFilter === "female"){
        list = [];
        const q = query(collection(db, "members"), where("gender", "==", "Female"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
      
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
       
        console.log(list);
      }
      else{
        list = [];
        // const q = query(collection(db, "children"), where("gender", "==", "Feale"));
        const querySnapshot = await getDocs(collection(db, "members"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
      
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);

        console.log(list);
      }

      } catch (err) {
        console.log(err);
      }

    

    };
    fetchData();
  }, [selectedFilter,]);

  console.log(data);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        
      <h2 style={{textAlign:'center', marginTop:'20px'}}>Apply Filters</h2>

        <div className="row justify-content-evenly" style={{margin:'100px'}}>
          <div className="col-2">
      <select className="select" value={selectedFilter} onChange={handleFilterChange} style={{padding:'5px', borderRadius:'10px'}}>
        <option value="">ALL</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    {/* <div className="col-1">
      <input type="number" value={minAge} placeholder="Min Age" style={{width:'90px'}} onChange={handleMinAgeChange}></input>
      <input type="number" value={maxAge} placeholder="Max Age" style={{width:'90px'}}></input>
    </div>
    <div className="col-1">
    <input type="number" value={maxAge} placeholder="Max Age" style={{width:'90px'}} onChange={handleMaxAgeChange}></input>
    </div> */}
    <div className="col-2">
      
        <PDFDownloadLink document={<PDFFilesMembers data={list} />} filename="report">
          {({ loading }) =>
            loading ? (
              <button className="btn btn-primary" component>Loading Document...</button>
            ) : (
              <button className="btn btn-primary" component>Download</button>
            )
          }
        </PDFDownloadLink>
        {console.log(list)}
        {/* <PDFViewer width="800" height="600">
        <PDFFilesMembers data={data} />
      </PDFViewer> */}
      </div>
      </div>
      </div>
    </div>
  );
};

export default PDFFilePath;
