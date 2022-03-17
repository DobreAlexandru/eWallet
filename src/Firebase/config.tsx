import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as any,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as any,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as any,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as any,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as any,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as any,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
