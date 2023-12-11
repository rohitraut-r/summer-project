// FolderContent.js
import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../firebase";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const FolderContent = ({ currentFolder, breadcrumbs, onBack, onUpload }) => {
  const [files, setFiles] = useState({});
  const [fetchedFiles, setFetchedFiles] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteCondition, setDeleteCondition] = useState(false);
  const fileList = [];
  const handleUploadFile = async (event) => {
    const storage = getStorage();
    for (let i = 0; i < files.length; i++) {
      const storageRef = ref(
        storage,
        `documents/${currentFolder}/${files[i].name}`
      );

      const result = await uploadBytes(storageRef, files[i])
        .then(() => {
          console.log("success");
          setFiles({});
        })
        .catch((error) => {
          console.log(error);
        });
    }
    alert("Uploaded Files Successfully");
    window.location.reload();
  };
 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderRef = ref(storage, `documents/${currentFolder}`);
        const images = await listAll(folderRef);

        const imageUrlsPromises = images.items.map(async (item) => {
          const imageUrl = await getDownloadURL(item);
          return imageUrl;
        });

        // Fetch and set file names separately
        const fileNames = images.items.map((item) => item.name);
        setFileName(fileNames);

        const urls = await Promise.all(imageUrlsPromises);
        setFetchedFiles(urls);
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };
    console.log(fileName);
    fetchImages();
  }, []);

  const deleteSelector = () => {
    setDeleteCondition(true);
  };

  const handleDeleteImages = async (fileToDelete) => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `documents/${currentFolder}/${fileToDelete}`
    );

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
     alert(fileToDelete+" deleted Successfully")
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={onBack}>
        Back
      </button>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => (
            <li className="breadcrumb-item" key={index}>
              {breadcrumb}
            </li>
          ))}
          <li className="breadcrumb-item active" aria-current="page">
            {currentFolder}
          </li>
        </ol>
      </nav>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={onUpload}
      />
      <input
        id="documents"
        type="file"
        multiple
        onChange={(event) => {
          setFiles(event.target.files);
        }}
      />
      <button className="btn btn-primary" onClick={handleUploadFile}>
        Upload
      </button>
      {/* <button className="btn btn-danger mx-5" onClick={deleteSelector}>
        Delete Files
      </button> */}

      <div className="container mt-4">
        <div className="row">
          {fetchedFiles.map((url, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={url}
                  className="card-img-top"
                  alt={`Image ${index}`}
                  onClick={() => setSelectedImage(url)}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <a
                      href={url}
                      target="_blank"
                      download
                      style={{ textDecoration: "none" }}
                    >
                      <button style={{ border: 0, backgroundColor: "white" }}>
                        {fileName[index]}
                      </button>
                    </a>
                    <button
                      style={{ border: "none" }}
                      onClick={() => handleDeleteImages(fileName[index])}
                    >
                      <DeleteForeverIcon></DeleteForeverIcon>
                    </button>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FolderContent;
