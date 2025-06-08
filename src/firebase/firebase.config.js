// ✅ File: src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3bjZAQT1F-nlapVIGNbGXAyxRUkkRLnw",
  authDomain: "smart-attendance-2ad3c.firebaseapp.com",
  projectId: "smart-attendance-2ad3c",
  storageBucket: "smart-attendance-2ad3c.appspot.com", // ✅ Fix here: was wrong before
  messagingSenderId: "861158740052",
  appId: "1:861158740052:web:351c643a9cbfea679e5dc1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
