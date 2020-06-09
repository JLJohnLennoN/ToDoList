import firebase from 'firebase/app';
import 'firebase/database' ;

let firebaseConfig = {
    apiKey: "AIzaSyAfT2DwRXFQsg9TrlE9ZQrD0V4pV4kohKc",
    authDomain: "todolist-e40dd.firebaseapp.com",
    databaseURL: "https://todolist-e40dd.firebaseio.com",
    projectId: "todolist-e40dd",
    storageBucket: "todolist-e40dd.appspot.com",
    messagingSenderId: "247632300449",
    appId: "1:247632300449:web:d05eeff25f1a9ba0bb63e0",
    measurementId: "G-1SLTJDM8K5"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export default firebase;
