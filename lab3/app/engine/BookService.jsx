import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "./init";

const col = collection(firestore, "books");

export const addBook = async (book, user) => {
  try {
    const docRef = doc(col);
    const newBook = {
      ...book,
      id: docRef.id,
      uid: user?.uid || "anonymous",
    };

    await setDoc(docRef, newBook);
    return newBook;
  } catch (error) {
    alert("Save error: " + error.message);
    console.error("Firestore Save Error:", error);
    return null;
  }
};

export const updateBook = async (book) => {
  try {
    if (!book.id) {
      throw new Error("Book must have an id to be updated.");
    }

    const docRef = doc(firestore, "books", book.id);
    await setDoc(docRef, book);
  } catch (error) {
    console.error("Update error:", error);
    alert("Update error: " + error.message);
  }
};

export const listBooksByUser = async (uid) => {
  try {
    const q = query(col, where("uid", "==", uid));
    const snap = await getDocs(q);

    return snap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error loading books for user:", error);
    return [];
  }
};
