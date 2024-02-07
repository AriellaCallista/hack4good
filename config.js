// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxnScUJ0fT7e1_OL_WL9O4ByBStcUQy2c",
    authDomain: "heartline-8e0e6.firebaseapp.com",
    projectId: "heartline-8e0e6",
    storageBucket: "heartline-8e0e6.appspot.com",
    messagingSenderId: "591186982910",
    appId: "1:591186982910:web:50ea598a1e2460436db2af"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const authentication = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

export const authentication = getAuth(app)
