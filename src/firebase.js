import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage";
import firebase from "firebase/compat/app"
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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
