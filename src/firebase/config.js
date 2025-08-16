// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQV2fcV6mSpW2NcDSlf4g-ZMVw89TdM6g",
  authDomain: "jewelery-web-51890.firebaseapp.com",
  projectId: "jewelery-web-51890",
  storageBucket: "jewelery-web-51890.firebasestorage.app",
  messagingSenderId: "60295655630",
  appId: "1:60295655630:web:b78237ed075ed379d6609f",
  measurementId: "G-RCX74BZ06W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and export it
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.log('Analytics not available:', error.message);
}

export { app, analytics };
export default app;
