import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage,auth } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

const New = ({ inputs, title }) => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState({
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [per, setPer] = useState(null);
  const [password, setPassword] = useState({});
  const navigate = useNavigate();

  const [age, setAge] = useState(null);

  let id = "";


  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    // Check password policy
    if (id === 'password') {
      const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);

      if (!isValidPassword) {
        // Set error message
        setPasswordError("Password must be at least 8 characters long and contain one number, one capital letter, and one special character.");
      } else {
        // Clear error message if password is valid
        setPasswordError('');
      }
    }

    // Update the state
    setData({ ...data, [id]: value });
  };

 

  const handleAdd = async (e) => {
    e.preventDefault();
  
    try {
      if (data.password.length < 6) {
        throw new Error("Password should be at least 6 characters long");
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  
      // Retrieve the UID from the userCredential
      const uid = userCredential.user.uid;
      
  
      // Add user data to Firestore using UID as the document ID
      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, {
        ...data,
        timeStamp: serverTimestamp(),
      });
  
      // Navigate or perform other actions after successful registration
      navigate(-1);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      // Display error message
      console.error(`Error creating user: ${errorCode} - ${errorMessage}`);
    }
  };
  

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Admin</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              id="img"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              onChange={handleInput}
            />
          </div> */}
          <div className="right">
            <form onSubmit={handleAdd}>

              <div className="formInput" key="position">
                <label>Position</label>
                <input id="position" type="text" onChange={handleInput} required/>
              </div>
              <div className="formInput" key="fullName">
                <label>Full Name</label>
                <input id="fullName" type="text" onChange={handleInput} required/>
              </div>
              <div className="formInput" key="email">
                <label>email</label>
                <input id="email" type="email" onChange={handleInput} required/>
              </div>
              <div className="formInput" key="password">
                <label>Password</label>
                <input id="password" type="text" onChange={handleInput} required/>
              </div>
              {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
              
              <button type="submit" disabled={passwordError !== ''}>
               Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
