
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbdqb0hW99n-NvhB4kWDNd7pl2xKe13xQ",
    authDomain: "agrosaarhtii.firebaseapp.com",
    projectId: "agrosaarhtii",
    storageBucket: "agrosaarhtii.firebasestorage.app",
    messagingSenderId: "800786077587",
    appId: "1:800786077587:web:96cb1de9883496e9f9fa66",
    measurementId: "G-KFCLB6Z4MM"
};

// Initialize Firebase only if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth, app };
