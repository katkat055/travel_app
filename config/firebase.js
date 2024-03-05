import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: "AIzaSyAIdiPCPVc_UrwjaZTin2BgWQM-iXeCqnQ",
  authDomain: "itas274finalproject-642b8.firebaseapp.com",
  projectId: "itas274finalproject-642b8",
  storageBucket: "itas274finalproject-642b8.appspot.com",
  messagingSenderId: "103790494714",
  appId: "1:103790494714:web:bf67bee7a9a61ec4819a43",
  measurementId: "G-486XHBNJ8L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();