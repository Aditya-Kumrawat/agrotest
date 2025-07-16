
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { adminAuth, adminDb } from './firebaseAdmin';

const firebaseConfig = {
  apiKey: "AIzaSyDbdqb0hW99n-NvhB4kWDNd7pl2xKe13xQ",
  authDomain: "agrosaarhtii.firebaseapp.com",
  projectId: "agrosaarhtii",
  storageBucket: "agrosaarhtii.appspot.com",
  messagingSenderId: "800786077587",
  appId: "1:800786077587:web:96cb1de9883496e9f9fa66",
  measurementId: "G-KFCLB6Z4MM"
};

const app = initializeApp(firebaseConfig);

export const clientAuth = getAuth(app);
export const db = getFirestore(app);
export const auth = adminAuth; // For server-side auth verification
export const adminDatabase = adminDb;
