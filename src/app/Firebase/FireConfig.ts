// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import key from  '../Global/env.ts';


const firebaseConfig = { 
  apiKey: key.API_KEY,
  authDomain: key.AUTH_DOMAIN,
  projectId: key.PROJECT_ID,
  storageBucket: key.STORAGE_BUCKET,
  messagingSenderId: key.MESSAGING_SENDER_ID,
  appId: key.APP_ID,
  measurementId: key.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



export default db;
