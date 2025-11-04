import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBoB5-_XvPxhU_sd4Tu850Sg8Ir-V9xepQ",
  authDomain: "agrotrack-71a84.firebaseapp.com",
  projectId: "agrotrack-71a84",
  storageBucket: "agrotrack-71a84.firebasestorage.app",
  messagingSenderId: "731616000245",
  appId: "1:731616000245:web:963dec740df5e2038f2dbc",
  measurementId: "G-B39FVGB7RW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
