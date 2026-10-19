import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

/**
 * Firebase Project Configuration
 * Project: sahast-foundation
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBBRoKBmLLSIuLusBDQho3-8BBYGQ-Paio',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'sahast-foundation.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'sahast-foundation',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'sahast-foundation.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '360057275243',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:360057275243:web:d4945e4aab18fd66a4822e',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-QTEHYGXYT9'
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'demo-api-key'
);

let app;
let db;
let storage;
let auth;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase initialized in local mock fallback mode:', error);
}

export { app, db, storage, auth };
