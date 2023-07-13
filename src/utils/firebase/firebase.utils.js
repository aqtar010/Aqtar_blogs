/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  addDoc,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
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

export const createBlogDoc = async (blogData) => {
  const collectionName = "blogs";
  try {
    const docRef = await addDoc(collection(db, collectionName), blogData);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
};
export const queryBlog = async (currentUserEmail) => {
  console.log(currentUserEmail);
  const q = query(
    collection(db, "blogs"),
    where("userEmail", "==", currentUserEmail)
  );
  const querySnapshot = await getDocs(q);
  let bloglist = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    bloglist = [...bloglist, [doc.data(), doc.id]];
  });
  return bloglist;
};
export const deleteBlog = async (refId) => {
  try {
    await deleteDoc(doc(db, "blogs", refId));
    return true;
  } catch (err) {
    console.log(err);
  }
};
export const updateBlog = async (refId, updateData) => {
  try {
    const docRef = doc(db, "blogs", refId);
    await updateDoc(docRef, updateData);
  } catch (err) {
    console.log(err);
  }
};

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider).then((result) => {
    console.log(result);
  });

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const signOutUser = async () => await signOut(auth);
