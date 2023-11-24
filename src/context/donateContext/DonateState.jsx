import React, { useState } from "react";
import DonateContext from "./DonateContext";

const DonateState = (props) => {
 const data = props.data;
  console.log(data);

  return (
    <DonateContext.Provider value={{ data}}>
      {props.children}
    </DonateContext.Provider>
  );
};

export default DonateState;