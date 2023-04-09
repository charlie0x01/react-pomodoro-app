// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHTsswt1NvEukW_NDwQD3jf1RnCcOZ2T4",
  authDomain: "mr-pomodoro.firebaseapp.com",
  databaseURL: "https://mr-pomodoro-default-rtdb.firebaseio.com",
  projectId: "mr-pomodoro",
  storageBucket: "mr-pomodoro.appspot.com",
  messagingSenderId: "696151619311",
  appId: "1:696151619311:web:3b2147648cf52651da8d1a",
  measurementId: "G-QMMXPMYBW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;