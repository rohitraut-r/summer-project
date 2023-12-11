// FolderList.js
import React, { useState, useEffect } from 'react';
import Folder from './Folder';
import FolderContent from './FolderContent';
import { getStorage, ref, uploadString, listAll } from 'firebase/storage';
import { storage } from '../../../firebase';

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('');
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const folderList = [];

  const createFolder = async () => {
    if (newFolderName.trim() === '') return;
    const folderCreated = await createFolderInStorage(newFolderName); // Use a different function name here
  
    if (folderCreated) {
      setFolders([...folders, newFolderName]);
      setNewFolderName('');
    } else {
      alert('Folder creation failed.');
    }
  };
  const createFolderInStorage = async (folderName) => {
    const folderRef = ref(storage, `documents/${folderName}/dummy.txt`);
    // Create a placeholder file to ensure the folder exists in Firebase Storage
    try {
      await uploadString(folderRef, '');
      return true; // Folder creation successful
    } catch (error) {
      console.error('Error creating folder:', error);
      return false; // Folder creation failed
    }
  };

  useEffect(() => {
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, "documents/");

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
            console.log(folderRef.name);
            // setFolders([...folders, folderRef.name]);
            folderList.push(folderRef.name);
            console.log(folderList);;
            setFolders(...folders, folderList);
            console.log(folders);
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        
      });
      setNewFolderName('');
      console.log(folders);
  }, []);

  setTimeout(() => {
    
  }, 2000);

  const handleFolderClick = (folderName) => {
    if (!breadcrumbs.includes(folderName)) {
      setBreadcrumbs([...breadcrumbs, folderName]);
      setCurrentFolder(folderName);
    } else {
      setCurrentFolder(folderName);
    }
  };

  const navigateBack = () => {
    if (breadcrumbs.length > 0) {
      const newBreadcrumbs = [...breadcrumbs];
      newBreadcrumbs.pop();
      setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1] || '');
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  const handleUploadFile = (event) => {
    // Handle file upload here and add the uploaded file to the folder's content
    // You will need to implement the logic to store and display uploaded files.
  };
  
  console.log(folders);

  return (
    <div>
      {currentFolder ? (
        <FolderContent
          currentFolder={currentFolder}
          breadcrumbs={breadcrumbs}
          onBack={navigateBack}
          onUpload={handleUploadFile}
        />
      ) : (
        <div>
          <h2>File Management</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={createFolder}>
              Create Folder
            </button>
          </div>
          <div className="row">
            {folders.map((folderName, index) => (
              <Folder
                key={index}
                folderName={folderName}
                onClick={handleFolderClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderList;
