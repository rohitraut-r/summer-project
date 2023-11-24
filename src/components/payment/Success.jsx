import { Link } from "react-router-dom";
import React from "react";
import { useContext, useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import DonateContext from "../../context/donateContext/DonateContext";
import PassingData from "./PassingData";
import GeneratePDF from "../reports/GenerateReceipt";
import Header from "../frontend/Header";
import Footer from "../frontend/Footer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Receipt from "../reports/Receipt";
import { addDoc, collection, serverTimestamp,getDocs,query,where } from "firebase/firestore";
import { db, storage } from "../../firebase";

const Success = () => {

  const [same, setSame] = useState(false);
  const location = useLocation();
  const storedData = JSON.parse(localStorage.getItem("myData"));
  const data = storedData;

  const searchParams = new URLSearchParams(location.search);

  // Get the values of oid, amt, and refId from the URL parameters
  const oid = searchParams.get("oid");
  // const amt = searchParams.get('amt');
  const refId = searchParams.get("refId");
  // storedData.push({"oid":oid, "refId":refId});
  data.oid = oid;

  data.refId = refId;
  console.log(data);

  useEffect(() => {
    const q = query(collection(db, 'donors'), where('oid', '==', data.oid));

    const handleAdd = async () => {
      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
         
    
          await addDoc(collection(db, 'donors'), {
            ...data,
            timeStamp: serverTimestamp(),
          });
        
        } else {
          // Matching documents found, setSame to true
          setSame(true);
          console.log('Data already exists in the database');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    handleAdd();
  }, []);

  
  setTimeout(() => {
    localStorage.removeItem("myData");
  }, 100 * 60 * 1000);

  return (
    <div>
      <Header />
      <div className="container">
        {/* <p>oid: {oid}</p>
      <p>amt: {amt}</p>
      <p>refId: {refId}</p> */}
        {/* <p>name: {storedData.name}</p>
      <p>phone: {storedData.phone}</p>
      <p>email: {storedData.email}</p> */}

        <div
          className="card-body text-center"
          style={{ marginTop: "10rem", marginBlock: "10rem" }}
        >
          <h3 className="card-title">Thank You, {data.fullName}</h3>
          <p className="card-text" style={{ fontSize: 20 }}>
            For your generous donation of Rs. {data.amount}. This donation will
            tremendously help the children residing in this orphanage.{" "}
          </p>
          <PDFDownloadLink document={<Receipt data={data} />} filename="report">
            <button className="btn btn-success">Download Receipt</button>
          </PDFDownloadLink>
        </div>
        {/* <GeneratePDF data={data}/> */}
      </div>
      <Footer />
    </div>
  );
};

export default Success;
