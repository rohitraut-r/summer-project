import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage";
import firebase from "firebase/compat/app"
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD6RlBqtZTUBi8xikyc0U97Rw9WQPTAXmE",
  authDomain: "oims-71786.firebaseapp.com",
  projectId: "oims-71786",
  storageBucket: "oims-71786.appspot.com",
  messagingSenderId: "706605013331",
  appId: "1:706605013331:web:3ea1f98dbd6ab5142369a6",
  measurementId: "G-JR6W1S8RXW"
};

const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const createFolder = async (folderName) => {
  const folderRef = ref(storage, `documents/${folderName}/thumbnails`);
  // Create a placeholder file to ensure the folder exists in Firebase Storage
  try {
    await uploadString(folderRef, '');
    return true; // Folder creation successful
  } catch (error) {
    console.error('Error creating folder:', error);
    return false; // Folder creation failed
  }
};

 export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app);
export default firebase;
