import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { BookListContext } from "../hooks/BookListContext";
import { addBook } from "../engine/BookService";
import { useUser } from "../engine/UserService";

export default function AddBook() {
  const user = useUser();
  const { bookList, setBookList } = useContext(BookListContext);

  const [newBook, setNewBook] = useState({
    author: "",
    title: "",
    description: "",
    price: 0.0,
    cover: true,
    pages: 0,
    image: "",
    uid: user?.uid || "",
  });

  const handleChange = (field) => (ev) => {
    setNewBook((prev) => ({
      ...prev,
      [field]: field === "price" || field === "pages"
        ? Number(ev.target.value)
        : ev.target.value,
    }));
  };

  const handleNewBook = (e) => {
    e.preventDefault();

    const tempBook = {
      id: bookList.length + 1,
      ...newBook,
      uid: user?.uid || "",
    };

    addBook(tempBook);
    setBookList((prev) => prev.concat([tempBook]));
  };

  return (
    <section className="form-section">
      <h2>Add a New Book</h2>

      <form onSubmit={handleNewBook} className="form">
        <input type="text" placeholder="Author" onChange={handleChange("author")} />
        <input type="text" placeholder="Title" onChange={handleChange("title")} />
        <input type="number" placeholder="Price" onChange={handleChange("price")} />
        <input type="number" placeholder="Pages" onChange={handleChange("pages")} />
        <input type="text" placeholder="Description" onChange={handleChange("description")} />

        <button type="submit">Add Book</button>
      </form>

      <NavLink to="/" className="back-link">← Back to Library</NavLink>
    </section>
  );
}
