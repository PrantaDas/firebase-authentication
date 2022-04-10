// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4h71DfCRJAK3apmzF9Q_UiXPJCNtQn_M",
  authDomain: "fir-auth-practice-2e8a9.firebaseapp.com",
  projectId: "fir-auth-practice-2e8a9",
  storageBucket: "fir-auth-practice-2e8a9.appspot.com",
  messagingSenderId: "547882540831",
  appId: "1:547882540831:web:1b9bf911e69c164f5fda2a",
  measurementId: "G-XS90VNN4M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;