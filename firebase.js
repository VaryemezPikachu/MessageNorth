import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCK42F_XyOd_OdAGXOEzAE41jx7JVR6DmM",
  authDomain: "messagenorth-7615d.firebaseapp.com",
  projectId: "messagenorth-7615d",
  storageBucket: "messagenorth-7615d.appspot.com",
  messagingSenderId: "95165828444",
  appId: "1:95165828444:android:a6a680d7fbde1362f38599"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore
export const db = getFirestore(app);