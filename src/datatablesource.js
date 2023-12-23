export const userColumns = [
  
  {
    field: "fullName",
    headerName: "Full Name",
    width: 150,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.username}
    //     </div>
    //   );
    // },
  },
  {
    field: "age",
    headerName: "Age",
    width: 40,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
  },

  {
    field: "dateOfBirth",
    headerName: "DOB",
    width: 120,
  },
  {
    field: "guardian",
    headerName: "Guardian",
    width: 160,
    // renderCell: (params) => {
    //   return (
    //     <div className={`cellWithStatus ${params.row.status}`}>
    //       {params.row.status}
    //     </div>
    //   );
    // },
  },
];

//temporary data
export const userRows = [
  {
   
  },
];
