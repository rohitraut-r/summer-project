import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns,userNumber} from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";


const Datatable = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  let list = [];
  useEffect(()=> {
    const fetchData = async() => {
      try{
      const querySnapshot = await getDocs(collection(db, "members"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setId(doc.id);
      list.push({id:doc.id, ...doc.data()});

    });
    setData(list);
    console.log(list);
  }catch(err){
    console.log(err);
  }
};
fetchData()
}, []);



  const handleDelete = async(id) => {
    try{
      await deleteDoc(doc(db, "members", id));
      setData(data.filter((item) => item.id !== id));
    }catch(err){
      console.log(err)
    }
   
  };

  const handleView = async(id) => {
    try{
      navigate("/members/single_members", {state:{id}})
      console.log(id);
    }catch(err){
      console.log(err)
    }
   
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           
            {/* <Link to="/users/single" state={{id}} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="viewButton"
              onClick={() => handleView(params.row.id)}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  let num = 1;

  const userColumns = [
  
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
      field: "email",
      headerName: "Email",
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

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Members
        <Link to="/members/new_members" className="link" component>
          Add New
        </Link>
        <Link to="/members/generateReport" className="link" component>
          Generate Report
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
