// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGgRn0EU_6D1_UTcnXNYoMi0jJugs7SQw",
  authDomain: "django-assigment.firebaseapp.com",
  projectId: "django-assigment",
  storageBucket: "django-assigment.appspot.com",
  messagingSenderId: "389012773502",
  appId: "1:389012773502:web:5d53c666c8a027e317962f",
  measurementId: "G-MF9EQ9E8WX",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();

export { app, analytics, auth };
export default firebase;
