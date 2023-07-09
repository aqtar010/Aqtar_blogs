// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "aqtar-s-blog.firebaseapp.com",
  projectId: "aqtar-s-blog",
  storageBucket: "aqtar-s-blog.appspot.com",
  messagingSenderId: "812101236231",
  appId: "1:812101236231:web:0add16588da3e8ab4d5ca2",
  measurementId: "G-0HFC1S96RP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider).then((result) => {
    console.log(result);
  });

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const signOutUser = async () => await signOut(auth);
