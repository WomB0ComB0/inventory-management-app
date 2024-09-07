// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNd6TQmrGOqEeuKOVOXBi2hL78xtlvDjI",
  authDomain: "inventory-management-app-28e30.firebaseapp.com",
  projectId: "inventory-management-app-28e30",
  storageBucket: "inventory-management-app-28e30.appspot.com",
  messagingSenderId: "201898172341",
  appId: "1:201898172341:web:cfae213623494c37ba43fc",
  measurementId: "G-EXE0Q21HMJ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };