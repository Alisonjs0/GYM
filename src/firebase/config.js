import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBextjRLMU8V4axN7hfAr30sy3TdaQ4IU8",
  authDomain: "academia-783e8.firebaseapp.com",
  projectId: "academia-783e8",
  storageBucket: "academia-783e8.firebasestorage.app",
  messagingSenderId: "128366775635",
  appId: "1:128366775635:web:51351a1f497e3b989265a6",
  measurementId: "G-94GLXY13K2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };