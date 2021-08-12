import firebase from "firebase/app";
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyD04mC03m-Cqtm4IF2MmJAUh5oX2RPoNsU",
    authDomain: "systemticket-c6a4e.firebaseapp.com",
    projectId: "systemticket-c6a4e",
    storageBucket: "systemticket-c6a4e.appspot.com",
    messagingSenderId: "246825924634",
    appId: "1:246825924634:web:ba4a5190bd2b77c0cfb9a3",
    measurementId: "G-1SBSZHPC22"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase
  