// Receipt.js
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../assets/logo.png"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    margin: 10,
  },
  section: {
    margin: 50,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 2,
    textAlign: "center"
  },
  address: {
    fontSize: 10,
    marginBottom:30,
    textAlign:"center",
   

  },
  receipt:{
    textAlign:"right",
    fontSize: 12,
    marginBottom: 5,
    fontWeight:"bold"

  },
  donation:{
    fontSize: 15,
    marginBottom:50,
    textAlign:"center",
    border:"1px solid black",
    borderRadius:10
  },

 
  text: {
    fontSize: 12,
    marginBottom: 5,

  },
  image:{
    width:100,
  },
  signature:{
    textAlign:"right",
    fontSize:12
  },
  person:{
    textAlign:"right",
    fontSize:12
  }
});

const Receipt = ( {data} ) => {
    console.log(data);
    return(
  <Document>
    <Page size={[600, 400]} style={styles.page}>
      <View style={styles.section}>
        <Image src={logo} style={styles.image}></Image>
        <Text style={styles.heading}>Mother Nepal Child-Home</Text>
        <Text style={styles.address}>Tarakeshwor-3, KTM</Text>
        <Text style={styles.donation}>Donation-Receipt</Text>
        <Text style={styles.receipt}>Receipt ID: {data.oid}</Text>
        <Text style={styles.text}>Name: {data.fullName}</Text>
        <Text style={styles.text}>Phone: {data.phone}</Text>
        <Text style={styles.text}>Email: {data.email}</Text>
        <Text style={styles.text}>Amount(Rs): {data.amount}</Text>
        <Text style={styles.signature}>Authorized Signature:_____________</Text>
        <Text style={styles.person}>(Rohit Raut)</Text>
        <Text style={styles.person}>(Secretary)</Text>



        {/* Add more details as needed */}
      </View>
    </Page>
  </Document>
    )
};

export default Receipt;
