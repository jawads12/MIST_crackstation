// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyD0QghixMFNZ3Bn22ONI-Fx-ZF3C1DcWoM",
  authDomain: "dual-lead-ecg.firebaseapp.com",
  databaseURL: "https://dual-lead-ecg-default-rtdb.firebaseio.com",
  projectId: "dual-lead-ecg",
  storageBucket: "dual-lead-ecg.appspot.com",
  messagingSenderId: "748706230808",
  appId: "1:748706230808:web:f318ee21b62c16c1a7096d",
  measurementId: "G-CJ8F6X8VF7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
