import { addDoc, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { firestore } from "./init";

const col = collection(firestore, "books");

// ✅ GŁÓWNA POPRAWA: dodanie user.uid do dokumentu
export const addBook = async (book, user) => {
  try {
    const docRef = doc(col);
    const newBook = {
      ...book,
      id: docRef.id,
      uid: user?.uid || "anonymous", // zapobiega błędowi jeśli user = null
    };

    await setDoc(docRef, newBook);
  } catch (error) {
    alert("Save error: " + error.message);
    console.error("Firestore Save Error:", error);
  }
};

export const updateBook = async (book) => {
  if (!book.id) {
    throw new Error("Book must have an id to be updated.");
  }

  const docRef = doc(firestore, "books", book.id);
  await setDoc(docRef, book); // nadpisuje cały dokument
};

// ✅ poprawna funkcja: listowanie książek użytkownika
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
