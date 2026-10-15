import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';


export const firebaseConfig = {
  apiKey: "AIzaSyDRPtjxZKBaTkJID9a-YVxJjoIxuGuCKK4",
  authDomain: "parcialdos-ae035.firebaseapp.com",
  projectId: "parcialdos-ae035",
  storageBucket: "parcialdos-ae035.firebasestorage.app",
  messagingSenderId: "761397376557",
  appId: "1:761397376557:web:c3369d17e79a32c30baaa4",
  databaseURL: "https://parcialdos-ae035-default-rtdb.firebaseio.com",
};


export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
