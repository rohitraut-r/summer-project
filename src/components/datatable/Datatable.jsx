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
      const querySnapshot = await getDocs(collection(db, "children"));
      querySnapshot.forEach((doc) => {
        
        setId(doc.id);
      list.push({id:doc.id, ...doc.data()});

    });
    setData(list);
   
  }catch(err){
    console.log(err);
  }
};
fetchData()
}, []);



  const handleDelete = async(id) => {
    try{
      await deleteDoc(doc(db, "children", id));
      setData(data.filter((item) => item.id !== id));
    }catch(err){
      console.log(err)
    }
   
  };

  const handleView = async(id) => {
    try{
      navigate("/users/single", {state:{id}})
      
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

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Children
        <Link to="/users/new_children" className="link" component>
          Add New
        </Link>
        <Link to="/users/generateReport" className="link" component>
          Generate Report
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
