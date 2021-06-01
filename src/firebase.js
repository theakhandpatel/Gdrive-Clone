import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"
let firebaseConfig = {
  apiKey: "AIzaSyDlyQl6U0chlc6IzdR7MQZGBWOINztmxoY",
  authDomain: "playground-2a7d4.firebaseapp.com",
  projectId: "playground-2a7d4",
  storageBucket: "playground-2a7d4.appspot.com",
  messagingSenderId: "800429479284",
  appId: "1:800429479284:web:d6e4bf1b75b3b8cf51c821",
}
firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
export const db = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() }
  },
}

export const auth = firebase.auth()
export const storage = firebase.storage()
export default firebase
