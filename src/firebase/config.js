import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCH8sZCjFNmXMaO12AEphJcwKgDZHNH_Yc",
  authDomain: "mymoney-10567.firebaseapp.com",
  projectId: "mymoney-10567",
  storageBucket: "mymoney-10567.appspot.com",
  messagingSenderId: "830544640593",
  appId: "1:830544640593:web:b76a617038200acc221670",
};

//init firebase
initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const auth = getAuth();
const timestamp = Timestamp;

export { db, auth, timestamp };
