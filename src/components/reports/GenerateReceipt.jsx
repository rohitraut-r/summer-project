// GeneratePDF.js
import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Receipt from "./Receipt";

const GeneratePDF = ( {data} ) => {
    console.log(data);

return(
  <PDFViewer width="1000" height="600">
    <Receipt data={data} />
  </PDFViewer>
)

};

export default GeneratePDF;
