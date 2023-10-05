// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAir81m-r2uldU7kPZYXnF6gL87MT95j6g",
    authDomain: "foro-alura-img-storage.firebaseapp.com",
    projectId: "foro-alura-img-storage",
    storageBucket: "foro-alura-img-storage.appspot.com",
    messagingSenderId: "972785494352",
    appId: "1:972785494352:web:988603654b8fdf7cc06455"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();