// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAf0IdwZXdzl2AoH5jyjMAWI1cf-A83lLY",
  authDomain: "helpdeskapp-b8e36.firebaseapp.com",
  projectId: "helpdeskapp-b8e36",
  storageBucket: "helpdeskapp-b8e36.firebasestorage.app",
  messagingSenderId: "27558971777",
  appId: "1:27558971777:web:215cabed8bf379cb8d0080",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
