import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDu1CiQnjk321gUkAYqVXmMAQEc0B0SlyY",
  authDomain: "contact-app-dd060.firebaseapp.com",
  projectId: "contact-app-dd060",
  storageBucket: "contact-app-dd060.appspot.com",
  messagingSenderId: "414908131057",
  appId: "1:414908131057:web:d664f312f80f415a592b50"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);