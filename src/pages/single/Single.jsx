// import "./single.scss";
import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import { db, storage } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import firebase from "../../firebase";
import { ref, listAll, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { Padding } from "@mui/icons-material";

const Single = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataId = location.state;
  const ids = dataId.id;
  const [imageUrls, setImageUrls] = useState([]);

  const [singleData, setSingleData] = useState({});

  const docRef = doc(db, "children", dataId.id);

  const userNameRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSingleData(docSnap.data());
          userNameRef.current = docSnap.data().fullName;

          const name = userNameRef.current
            ? userNameRef.current.split(" ").join("")
            : "";
          const folderRef = ref(storage, `gs://oims-71786.appspot.com/${name}`);
          const images = await listAll(folderRef);

          const imageUrlsPromises = images.items.map(async (item) => {
            const imageUrl = await getDownloadURL(item);
            return imageUrl;
          });

          const urls = await Promise.all(imageUrlsPromises);
          setImageUrls(urls);
        }
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleEdit = async () => {
    try {
      navigate("/users/update", { state: { ids } });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(singleData);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleDeleteImages = async () => {
    const storage = getStorage();

// Create a reference to the file to delete
const desertRef = ref(storage, selectedImage);

// Delete the file
deleteObject(desertRef).then(() => {
  setSelectedImage(null);
  // File deleted successfully
}).catch((error) => {
  // Uh-oh, an error occurred!
});
  }


  var num = 0;
  var temp = "";
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              onClick={() => handleEdit(singleData.id)}
            >
              Edit
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={singleData.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{singleData.fullName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{singleData.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Class:</span>
                  <span className="itemValue">{singleData.class}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Age:</span>
                  <span className="itemValue">{singleData.age}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date of Birth:</span>
                  <span className="itemValue">{singleData.dateOfBirth}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender: </span>
                  <span className="itemValue">{singleData.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Guardian:</span>
                  <span className="itemValue">{singleData.guardian}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Guardian Phone:</span>
                  <span className="itemValue">{singleData.guardian_phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Disabilities:</span>
                  <span className="itemValue">
                    {singleData.anyDisabilities}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Parents Status:</span>
                  <span className="itemValue">{singleData.parentsStatus}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date of Admission:</span>
                  <span className="itemValue">
                    {singleData.dateOfAdmission}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Brief History:</span>
                  <span className="itemValue">{singleData.breifHistory}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        <div className="bottom">
          <h1 className="title">Documents:</h1>
          <div>
            {imageUrls.map((url) => (
              <img
                className="documents"
                style={{ width: "300px", padding: "20px", cursor: "pointer" }}
                key={url}
                src={url}
                alt="Gallery"
                onClick={() => setSelectedImage(url)}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedImage && (
        <div
          className="fullscreen-overlay"
          style={
            {
              /*position:'absolute', top:'30px', left: '50%',transform: 'translateX(-50%)'*/
            }
          }
        >
          <div className="fullscreen-content">
            <img
              src={selectedImage}
              alt="Full Screen"
              style={{ width: "600px" }}
            />
            <button onClick={() => window.open(selectedImage, "_blank")}>
              Download
            </button>
            <button onClick={() => handleDeleteImages(null)}>Delete</button>

            <button onClick={() => setSelectedImage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Single;
