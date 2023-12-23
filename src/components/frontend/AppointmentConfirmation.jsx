
import React from "react";

import Header from "../frontend/Header";
import Footer from "../frontend/Footer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Confirmation from "../reports/Confirmation";
import { useLocation } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const data = location.state?.data;
 console.log(data);
  return (
    <div>
      <Header />
      <div className="container">
     
        <div
          className="card-body text-center"
          style={{ marginTop: "10rem", marginBlock: "10rem" }}
        >
          <h3 className="card-title">Your appointment has been confirmed.</h3>
          <p className="card-text" style={{ fontSize: 20 }}>
            Please Don't forget to bring this document while visiting.{" "}
          </p>
          <PDFDownloadLink  document={<Confirmation data={data}/>} filename="report">
            <button className="btn btn-success">Download Confirmation</button>
          </PDFDownloadLink>
        </div>
        {/* <GeneratePDF data={data}/> */}
      </div>
      <Footer />
    </div>
  );
};

export default Success;
