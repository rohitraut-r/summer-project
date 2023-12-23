import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns,userNumber} from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { deleteUser } from "firebase/auth";
import { reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import { updatePassword } from "firebase/auth";


const Datatable = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  let list = [];
  useEffect(()=> {
    const fetchData = async() => {
      try{
      const querySnapshot = await getDocs(collection(db, "users"));
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



const handleDelete = async () => {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error("User not authenticated.");
      }
  
      // Reauthenticate the user (prompt for password)
      const password = prompt("Please enter your password to confirm deletion:");
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
  
      // Delete the user document from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await deleteDoc(userDocRef);
  
      // Delete the user from Firebase Authentication
      await deleteUser(user);
  
      console.log("User deleted successfully.");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error deleting user: ${errorCode} - ${errorMessage}`);
    }
  };

  const handleView = async () => {
    try {
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("User not authenticated.");
      }
  
      // Reauthenticate the user (prompt for current password)
      const password = prompt("Please enter your current password:");
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
  
      // Prompt for new password
      const newPassword = prompt("Enter your new password:");
  
      // Update the password
      await updatePassword(user, newPassword);
  
      console.log("Password updated successfully.");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error updating password: ${errorCode} - ${errorMessage}`);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           
          
            <div
              className="viewButton"
              onClick={() => handleView(params.row.id)}
            >
              Change Password
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
      
    },
    
    {
      field: "position",
      headerName: "Position",
      width: 200,
    },
  
    
    
    {
      field: "email",
      headerName: "Email",
      width: 180,
     
    }
    
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Users
        <Link to="/admin/new_admin" className="link" component>
          Add New
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
