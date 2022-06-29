// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-t0pwBy5jAbQVvQXi_89BZommxg5VsPw",
  authDomain: "esdn-site.firebaseapp.com",
  projectId: "esdn-site",
  storageBucket: "esdn-site.appspot.com",
  messagingSenderId: "737809182436",
  appId: "1:737809182436:web:c024dcb35624b50e3a86f1",
  measurementId: "G-H563PEVWKF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);