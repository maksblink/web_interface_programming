import { createContext, useEffect, useState } from "react";
import { useUser } from "../engine/UserService";
import { listBooksByUser } from "../engine/BookService";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../engine/init";

export const BookListContext = createContext();

export const BookListProvider = ({ children }) => {
  const [bookList, setBookList] = useState([]);
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const user = useUser();

  const fetchAllBooks = async () => {
    const snapshot = await getDocs(collection(firestore, "books"));
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };

  const toggleShowOnlyMine = (value) => {
    setShowOnlyMine(value);
  };

  useEffect(() => {
    const load = async () => {
      try {
        if (showOnlyMine && user) {
          const books = await listBooksByUser(user.uid);
          setBookList(books);
        } else {
          const books = await fetchAllBooks();
          setBookList(books);
        }
      } catch (err) {
        console.error("Failed to load books:", err.message);
        setBookList([]);
      }
    };

    load();
  }, [user, showOnlyMine]);

  return (
    <BookListContext.Provider
      value={{ bookList, setBookList, showOnlyMine, toggleShowOnlyMine }}
    >
      {children}
    </BookListContext.Provider>
  );
};
