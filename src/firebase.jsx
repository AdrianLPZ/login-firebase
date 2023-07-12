
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNCkFAUWkxN4k8ue3W9mz035fVUzcfTWU",
  authDomain: "fir-login-b50bb.firebaseapp.com",
  projectId: "fir-login-b50bb",
  storageBucket: "fir-login-b50bb.appspot.com",
  messagingSenderId: "630878641925",
  appId: "1:630878641925:web:8bee333a705e2f67b2e16c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app, auth};