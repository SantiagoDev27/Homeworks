import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgOZw29tzV5gYNsZeQyrhRfddkjv5Yvvo",
  authDomain: "challenge-07-bbd5a.firebaseapp.com",
  projectId: "challenge-07-bbd5a",
  storageBucket: "challenge-07-bbd5a.firebasestorage.app",
  messagingSenderId: "91064014147",
  appId: "1:91064014147:web:bb649490e445e13137cbf6",
  measurementId: "G-B5Z2TBKQPD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);