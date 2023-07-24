import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCIcDAjFt193L86e5QaXYETO6XWiv6CH_8",
    authDomain: "cpi-proyect-b2772.firebaseapp.com",
    projectId: "cpi-proyect-b2772",
    storageBucket: "cpi-proyect-b2772.appspot.com",
    messagingSenderId: "886535039278",
    appId: "1:886535039278:web:3437258c5ef2d0f0e5b2bf"
  }

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp) 
const db = getFirestore(firebaseApp)

export {db as default, storage as storage};