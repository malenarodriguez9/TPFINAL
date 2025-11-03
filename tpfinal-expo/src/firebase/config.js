import app from "firebase/app"
import firebase from "firebase" 

const firebaseConfig = {
    apiKey: "AIzaSyBLHsLE_zWjbco_FTDvxBaMxctv6eK1N9o",
    authDomain: "proyectointegrador-77f49.firebaseapp.com",
    projectId: "proyectointegrador-77f49",
    storageBucket: "proyectointegrador-77f49.firebasestorage.app",
    messagingSenderId: "681091464023",
    appId: "1:681091464023:web:7d8aa97f7430dfe1a99c12"
  };
  
app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()

