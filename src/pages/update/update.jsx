import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {addDoc, collection, serverTimestamp,setDoc, doc, getDoc} from "firebase/firestore"
import { db, storage } from "../../firebase";
import {ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { useLocation, useNavigate } from "react-router-dom";


const New = ({title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const [images, setImages] = useState({});
  const [singleData, setSingleData] = useState({});

  const [age, setAge] = useState(null);



  const location = useLocation();
  const newId = location.state;

  console.log(newId);

  const navigate = useNavigate(); 

  const docRef = doc(db, "children", newId.ids);

  useEffect(() => {

    const Fetch = async() =>{
      const docSnap = await getDoc(docRef);
        
       
    
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          // list.push(docSnap.data());
          setSingleData(docSnap.data());
          // console.log(docSnap.data())
          // console.log(singleData);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      
    

    const uploadFile = () => {
      const name = file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setPer (progress);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;
    }
  }, 
  (error) => {
    
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setSingleData((prev)=>({...prev, img:downloadURL}));
     
    });
  }
);

    }
    file && uploadFile();
    Fetch();

    },[file]);




    var age_now = "";

    const handleAge = (e) =>{
    const id = e.target.id;
    const value = e.target.value;
    
        var today = new Date();
        var birthDate = new Date(value);  // create a date object directly from `dob1` argument
        age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
            
        }
  
        console.log(age_now);
        setAge(age_now);
    setSingleData({...data, age , [id]: value})

      }
    







    const handleInput = (e) => {
      // id = e.target.id;
      // const valueof = e.currentTarget.value;
  
      const { id, value } = e.target;
      setSingleData((prevFormValues) => ({
        ...prevFormValues,
        [id]: value,
      }));
  
      console.log(id);
      console.log(value);
      
      console.log(data);
    };


// setSingleData(newArray,data);
const gender = singleData.gender;

console.log(singleData);
 

  const handleAdd = async(e) => {
    e.preventDefault();
      await setDoc(doc(db, "children", newId.ids), {
      ...singleData,
      timeStamp: serverTimestamp()
    });
    handleDocumentsUpload();
    navigate(-1);
    
  }
  console.log(singleData.img)

  const handleDocumentsUpload = async (e) => {
    const fullname = data.fullName;
    const name = fullname.replace(/\s/g, "");

    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `/${name}/${images[i].name}`);

      const result = await uploadBytes(imageRef, images[i])
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log(images);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              id="img"
              src={
                file
                  ? URL.createObjectURL(file)
                  : singleData.img
              }
              alt=""
              onChange={handleInput}
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput" key="documents">
                <label>Upload Documents</label>
                <input
                  id="documents"
                  type="file"
                  multiple
                  onChange={(event) => {
                    setImages(event.target.files);
                  }}
                />
              </div>

              
                <div className="formInput" key="parentsStatus">
                  <label>Parents Status</label>
                  <input id="parentsStatus" type="text" value={singleData.parentsStatus} onChange={handleInput}/>
                </div>
                <div className="formInput" key="fullName">
                  <label>Full Name</label>
                  <input id="fullName" type="text" value={singleData.fullName} onChange={handleInput}/>
                </div>
                <div className="formInput" key="guardian">
                  <label>Guardian</label>
                  <input id="guardian" type="text" value={singleData.guardian} onChange={handleInput}/>
                </div>
                <div className="formInput" key="guardian_phone">
                  <label>Guardian's Phone No:</label>
                  <input id="guardian_phone" type="text" value={singleData.guardian_phone} onChange={handleInput}/>
                </div>
                <div className="formInput" key="relation">
                  <label>Relation With Guardian</label>
                  <input id="relation" type="text" value={singleData.relation} onChange={handleInput}/>
                </div>
                
                <div className="formInput" key="address">
                  <label>Address</label>
                  <input id="address" type="text" value={singleData.address} onChange={handleInput}/>
                </div>
                <div className="formInput" key="dateOfBirth">
                  <label>Date of Birth</label>
                  <input id="dateOfBirth" type="date" value={singleData.dateOfBirth} onChange={(event) => { handleAge(event); handleInput(event); }}/>
                </div>
                <div className="formInput" key="class">
                  <label>Class</label>
                  <input id="class" type="text" value={singleData.class} onChange={handleInput}/>
                </div>
                <div className="formInput" key="anyDisabilities">
                  <label>Any Disabilities?</label>
                  <input id="anyDisabilities" type="text" value={singleData.anyDisabilities} onChange={handleInput}/>
                </div>
               
                <div className="formInput" key="dateOfAdmission">
                  <label>Date of Admission</label>
                  <input id="dateOfAdmission" type="date" value={singleData.dateOfBirth} onChange={handleInput}/>
                </div>
                <div className="formInput" key="breifHistory">
                  <label>Brief History</label>
                  <input id="dateOfAdmission" type="text" value={singleData.breifHistory} onChange={handleInput}/>
                </div>
              <div className="formInput" key="gender">
                    <label>Male</label>
                <input id="gender" type="radio" name = "gender" value="Male" checked={gender === "Male"} onChange={handleInput}/>
                <label>Female</label>
                <input id="gender" type="radio" name = "gender" value="Female" checked={gender==="Female"} onChange={handleInput}/>
                    </div>
              <button disabled ={per !== null && per < 100} type="submit" >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
