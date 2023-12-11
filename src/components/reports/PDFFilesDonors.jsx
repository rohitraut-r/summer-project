import React from 'react';
import { Page, Text,Document, StyleSheet, View} from '@react-pdf/renderer';
import { useEffect } from 'react';


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize:15,
    padding:10,
  },
  page: {
    fontSize: 10,
    padding: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    
  },
  tableHeaderCell: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    flex: 0.3,
    textAlign: 'center',
  },
  tableCell: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    flex: 0.3,
    textAlign: 'center',
  },
  ageHeader:{
    backgroundColor: '#f0f0f0',
    padding: 5,
    flex: 0.3,
    textAlign: 'center',
  },
  ageCell:{
    padding: 5,
    flex: 0.3,
    textAlign: 'center',
  },
  snHeader:{
    backgroundColor: '#f0f0f0',
    padding: 5,
    flex: 0.2,
    textAlign: 'center',
  },
  snCell:{
    
    padding: 5,
    flex: 0.2,
    textAlign: 'center',
  },
  genderHeader:{
    backgroundColor: '#f0f0f0',
    padding: 5,
    flex: 0.3,
    textAlign: 'center',
  },
  genderCell:{
    
    padding: 5,
    flex: 0.3,
    textAlign: 'center',
  },
  total:{
    fontSize:15,
    textAlign:'center'
  }



    // table: { 
    //     margin: 20,
    //     display: "table", 
    //     width: "auto", 
    //     borderStyle: "solid", 
    //     borderWidth: 1, 
    //     borderRightWidth: 0, 
    //     borderBottomWidth: 0 
    //   }, 
    //   tableRow: { 
    //     margin: "auto", 
    //     flexDirection: "row" 
    //   }, 
    //   tableCol: { 
    //     flexDirection: "column",
    //     width: "20%", 
    //     borderStyle: "solid", 
    //     borderWidth: 1, 
    //     borderLeftWidth: 0, 
    //     borderTopWidth: 0 
    //   }, 
    //   tableCell: { 
    //     margin: "auto", 
    //     marginTop: 5, 
    //     fontSize: 10 
    //   },
    //   sn:{
      
    //     width:10
    //   }
});



const PDFFiles = ({data}) => {
 let total = 0;
 data.map((item) => {
  total += parseInt(item.amount,10);
  console.log(item.timeStamp);
 })
  

 
  



  return (


  <Document>
  <Page style={styles.page}>
    <Text style={styles.title}>Donor Information</Text>
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <Text style={styles.snHeader}>S.N</Text>
        <Text style={styles.tableHeaderCell}>Name</Text>
        <Text style={styles.genderHeader}>Address</Text>
        <Text style={styles.ageHeader}>Type</Text>
        <Text style={styles.tableHeaderCell}>Amount</Text>
        <Text style={styles.ageHeader}>Date</Text>
        <Text style={styles.tableHeaderCell}>Receipt No.</Text>
        <Text style={styles.tableHeaderCell}>Email</Text>
      </View>

      {/* Table Rows */}
      {data.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={styles.snCell
          }>{index + 1}</Text>
          <Text style={styles.tableCell}>{row.fullName}</Text>
          <Text style={styles.genderCell}>{row.address}</Text>
          <Text style={styles.ageCell}>{row.type}</Text>
          <Text style={styles.tableCell}>{row.amount}</Text>
          <Text style={styles.ageCell}>{row.timeStamp.toDate().toString()}</Text>
          <Text style={styles.tableCell}>{row.oid}</Text>
          <Text style={styles.tableCell}>{row.email}</Text>
         

        </View>
      ))}
    </View>
    <Text style={styles.total}>Total Donation = {total}</Text>
  </Page>
</Document>




  )
}

export default PDFFiles