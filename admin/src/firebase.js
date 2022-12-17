// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiGJbxmqRCRdX8KD18xePYMuxDaiOliH4",
  authDomain: "shop-375f2.firebaseapp.com",
  projectId: "shop-375f2",
  storageBucket: "shop-375f2.appspot.com",
  messagingSenderId: "940702525143",
  appId: "1:940702525143:web:13fe8fd560c6921b777292"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app