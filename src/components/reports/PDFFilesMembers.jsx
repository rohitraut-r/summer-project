import React from 'react';
import { Page, Text,Document, StyleSheet, View} from '@react-pdf/renderer';


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
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    flex: 1,
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
    flex: 0.5,
    textAlign: 'center',
  },
  genderCell:{
    
    padding: 5,
    flex: 0.5,
    textAlign: 'center',
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
  
  console.log(data);



  return (
  //  <Document>
  //       <Page style={styles.body}>
  //       <Text>List of All childrens</Text>
  //     <View style={styles.table}> 
     
  //       <View style={styles.tableRow}> 
        
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>S.N.</Text> 
  //         </View> 
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>Full Name</Text> 
  //         </View>
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>Gender</Text> 
  //         </View> 
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>Age</Text> 
  //         </View> 
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>Date Of Birth</Text> 
  //         </View> 
  //       </View>

  //       {data.map(doc => (
  //         <View style={styles.tableRow}> 
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>{i++}</Text> 
  //         </View> 
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>{doc.fullName}</Text> 
  //         </View> 
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>{doc.gender}</Text> 
  //         </View> 
  //         <View style={styles.tableCol}>
  //           <Text style={styles.tableCell}>{doc.age}</Text> 
  //         </View>
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>{doc.dateOfBirth}</Text> 
  //         </View> 
  //       </View> 
        
  //     ))}

  //       {/* <View style={styles.tableRow}> 
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>React-PDF</Text> 
  //         </View> 
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>3 User </Text> 
  //         </View> 
  //         <View style={styles.tableCol}>
  //           <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
  //         </View>
  //         <View style={styles.tableCol}> 
  //           <Text style={styles.tableCell}>5€</Text> 
  //         </View> 
  //       </View>  */}
  //     </View>
  //   </Page>

  //  </Document>


  <Document>
  <Page style={styles.page}>
    <Text style={styles.title}>Member Information</Text>
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <Text style={styles.snHeader}>S.N</Text>
        <Text style={styles.tableHeaderCell}>Name</Text>
        <Text style={styles.genderHeader}>Gender</Text>
        <Text style={styles.ageHeader}>Age</Text>
        <Text style={styles.tableHeaderCell}>Position</Text>
        <Text style={styles.tableHeaderCell}>Address</Text>
        <Text style={styles.tableHeaderCell}>Phone</Text>
        <Text style={styles.tableHeaderCell}>Email</Text>
      </View>

      {/* Table Rows */}
      {data.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={styles.snCell
          }>{index + 1}</Text>
          <Text style={styles.tableCell}>{row.fullName}</Text>
          <Text style={styles.genderCell}>{row.gender}</Text>
          <Text style={styles.ageCell}>{row.age}</Text>
          <Text style={styles.tableCell}>{row.position}</Text>
          <Text style={styles.tableCell}>{row.address}</Text>
          <Text style={styles.tableCell}>{row.phone}</Text>
          <Text style={styles.tableCell}>{row.email}</Text>
        </View>
      ))}
    </View>
  </Page>
</Document>




  )
}

export default PDFFiles