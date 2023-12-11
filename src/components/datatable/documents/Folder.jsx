// Folder.js
import React from "react";
import { getStorage, ref, listAll } from "firebase/storage";
import { useEffect } from "react";
import FolderIcon from '@mui/icons-material/Folder';

const Folder = ({ folderName, onClick }) => {
  const handleFolderClick = () => {
    onClick(folderName);
  };


 

  return (
    <div className="col-md-3" onClick={handleFolderClick}>
      <div className="card" style={{marginBottom:'30px'}}>
        <div className="card-body">
          <h5 className="card-title"> <FolderIcon/>{folderName}</h5>
        </div>
      </div>
    </div>
  );
};

export default Folder;
