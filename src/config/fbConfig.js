import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPsYGzXGaPJlX7k_PAfilNo2gfNdW7GJI",
  authDomain: "geoguesser-331612.firebaseapp.com",
  projectId: "geoguesser-331612",
  storageBucket: "geoguesser-331612.appspot.com",
  messagingSenderId: "784845408095",
  appId: "1:784845408095:web:a85ee2d18a809ae2be98ea",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
