import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyD24qAbaS2R-hvD6YTFfnrNh4sLuyCPngA",
    authDomain: "snow-net-26d1e.firebaseapp.com",
    projectId: "snow-net-26d1e",
    storageBucket: "snow-net-26d1e.appspot.com",
    messagingSenderId: "571666999048",
    appId: "1:571666999048:web:15ff9a6edcc2e17633aebd",
    measurementId: "G-R3SNG827ZH"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {
    projectStorage,
    projectFirestore,
    timestamp
}