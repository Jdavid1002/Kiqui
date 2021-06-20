import firebase from "firebase/app"
import 'firebase/firestore'

const confi = {
  apiKey: "AIzaSyB-rwqBSjNYm7gIj42b8-iHMIMXlhxZtMM",
  authDomain: "productos-4cb0f.firebaseapp.com",
  projectId: "productos-4cb0f",
  storageBucket: "productos-4cb0f.appspot.com",
  messagingSenderId: "1029195934341",
  appId: "1:1029195934341:web:7b34eb4e5a85f0ca5717ec"
}

const fb = firebase.initializeApp(confi);

const db = {
  Config : confi,
  firestore : fb.firestore()
}

export default db