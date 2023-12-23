import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const [images, setImages] = useState({});
  const navigate = useNavigate();

 

  let id = "";

  useEffect(() => {
    const uploadFile = () => {
      const name = file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

 

//   const handleAge = (e) => {
//     const value = e.target.value;

//     var today = new Date();
//     var birthDate = new Date(value); // create a date object directly from `dob1` argument
//     age_now = today.getFullYear() - birthDate.getFullYear();
//     var m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age_now--;
//     }

//     console.log(age_now);
//     setAge(age_now);
//     setData({ ...data, [id]: value });
//   };

  const handleInput = (e) => {
    id = e.target.id;
    const value = e.target.value;

    // setNewData({'age': age_now})
    // const age = newData.age;
    setData({ ...data, [id]: value,["type"]:"physical" });
  };

  console.log(data);
  // setData({...data, ["type"]:"physical"})
  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "donors"), {
      ...data,
      timeStamp: serverTimestamp(),
    });
    handleDocumentsUpload();

    navigate(-1);
  };

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
          <h1>Add new members</h1>
        </div>
        <div className="bottom">
          <div className="left">
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

              <div className="formInput" key="Name">
                <label>Full Name</label>
                <input id="fullName" type="text" onChange={handleInput} required />
              </div>
              {/* <div className="formInput" key="fullName">
                <label>Full Name</label>
                <input id="fullName" type="text" onChange={handleInput} />
              </div> */}
              <div className="formInput" key="phone">
                <label>Phone No:</label>
                <input id="phone" type="text" onChange={handleInput} required/>
              </div>
              <div className="formInput" key="email">
                <label>Email</label>
                <input id="email" type="text" onChange={handleInput} required/>
              </div>

              <div className="formInput" key="address">
                <label>Address</label>
                <input id="address" type="text" onChange={handleInput} required/>
              </div>
              {/* <div className="formInput" key="date">
                <label>Date</label>
                <input
                  id="date"
                  type="date"
                  onChange={(event) => {
                    handleInput(event);
                  }}
                />
              </div> */}
              {/* <div className="formInput" key="donation_type">
                <label>Donation Type</label>
                <select id="donation_type">
                  <option id="donation_type" onclick={handleInput}>Cash</option>
                  <option id="donation_type" onclick={handleInput}>Groceries</option>
                  <option id="donation_type" onclick={handleInput}>Stationery</option>
                  <option id="donation_type" onclick={handleInput}>Others</option>
                </select>
              </div> */}

              <div className="formInput" key="amount">
                <label>Donation Amount/Worth</label>
                <input id="amount" type="text" onChange={handleInput} required/>
              </div>

              {/* <div className="formInput" key="dateOfJoining">
                <label>Date of Joining</label>
                <input id="dateOfJoining" type="date" onChange={handleInput} />
              </div> */}
              {/* <div className="formInput" key="gender">
                <label>Male</label>
                <input
                  id="gender"
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleInput}
                />
                <label>Female</label>
                <input
                  id="gender"
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleInput}
                />
              </div> */}
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
