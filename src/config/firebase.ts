
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCOC-PpuFJKb2IQnrsaZP8njV02oXzodQ0",
  authDomain: "om-findyoursoul.firebaseapp.com",
  databaseURL: "https://om-findyoursoul-default-rtdb.firebaseio.com",
  projectId: "om-findyoursoul",
  storageBucket: "om-findyoursoul.firebasestorage.app",
  messagingSenderId: "628824145805",
  appId: "1:628824145805:web:a48f9b352101e64c3147c4",
  measurementId: "G-CY7JSKFLGT"
};

let app;
let auth;
let database;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  console.log('Please replace the Firebase config with your actual project credentials from Firebase Console');
}

export { auth, database };
