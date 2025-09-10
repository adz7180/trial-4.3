// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBY9qaulVALL5YF1pimyObKABZFncIJfQU",
  authDomain: "hexanest-b2b03.firebaseapp.com",
  projectId: "hexanest-b2b03",
  storageBucket: "hexanest-b2b03.firebasestorage.app",
  messagingSenderId: "588626883380",
  appId: "1:588626883380:web:3c8527476dcedfe12d6b61",
  measurementId: "G-NE1ZKYLC9D"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Email/password register + verification
export async function registerUser(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(cred.user, {
    url: window.location.origin + "/verify",
    handleCodeInApp: false
  });
  await signOut(auth); // optional: require verification first
  return cred;
}

// Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export async function continueWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user; // Google accounts are already verified by Google
}

// Apple provider (requires Apple setup in Firebase console)
const appleProvider = new OAuthProvider('apple.com');
// Optional scopes: appleProvider.addScope('email'); appleProvider.addScope('name');
export async function continueWithApple() {
  const result = await signInWithPopup(auth, appleProvider);
  return result.user; // Apple provides verified identity after sign-in
}
