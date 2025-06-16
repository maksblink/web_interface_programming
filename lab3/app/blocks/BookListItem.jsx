import { useFavorites } from "../hooks/FavoriteContext";
import { useContext, useState } from "react";
import placeholderCover from "../assets/OIP.jpg";
import { useUser } from "../engine/UserService";
import { BookListContext } from "../hooks/BookListContext";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../engine/init";

export default function BookListItem({ book }) {
  const { user, loading } = useUser();
  const { bookList = [], setBookList } = useContext(BookListContext);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...book });

  const isOwned = !loading && user?.uid === book.uid;
  const isFavorite = favorites.some(f => f.id === book.id);

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(book.id) : addFavorite(book);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const ref = doc(firestore, "books", book.id);
      const { id, ...data } = draft;
      await updateDoc(ref, data);
      const updatedList = bookList.map((b) => (b.id === book.id ? { ...b, ...data } : b));
      setBookList(updatedList);
      setEditing(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Save error: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const ref = doc(firestore, "books", book.id);
      await deleteDoc(ref);
      const filteredList = bookList.filter((b) => b.id !== book.id);
      setBookList(filteredList);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete error: " + err.message);
    }
  };

  if (loading) return null;

  return (
    <article className="card" data-cy="book-item">
      <img src={placeholderCover} alt="Cover" className="cover" />

      <div className="details">
        {!editing ? (
          <>
            <p>Author: {book.author}</p>
            <p>Price: {book.price}</p>
            <p>Pages: {book.pages}</p>
          </>
        ) : (
          <>
            <input name="title" value={draft.title} onChange={handleChange} placeholder="Title" />
            <input name="author" value={draft.author} onChange={handleChange} placeholder="Author" />
            <input name="description" value={draft.description} onChange={handleChange} placeholder="Description" />
            <input name="price" type="number" value={draft.price} onChange={handleChange} placeholder="0" />
            <input name="pages" type="number" value={draft.pages} onChange={handleChange} placeholder="0" />
          </>
        )}
      </div>

      <div className="extra">
        {!editing && (
          <>
            <h3 className="title">{book.title}</h3>
            <p className="desc">{book.description}</p>
          </>
        )}

        {isOwned && !editing && (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}

        {editing && <button onClick={handleSave}>Save</button>}

        <button onClick={toggleFavorite}>
          {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
        </button>

        <button disabled>Extra</button>
      </div>
    </article>
  );
}
