import { useContext, useState } from "react";
import placeholderCover from "../assets/OIP.jpg";
import { useUser } from "../engine/UserService";
import { BookListContext } from "../hooks/BookListContext";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../engine/init";

export default function ItemCard({ book }) {
  const user = useUser();
  const { setBookList, bookList } = useContext(BookListContext);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...book });

  const isOwned = user && book.uid === user.uid;

  const handleDelete = async () => {
    try {
      const ref = doc(firestore, "books", book.id);
      await deleteDoc(ref);
      setBookList(bookList.filter(b => b.id !== book.id));
    } catch (err) {
      alert("Delete error: ", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const ref = doc(firestore, "books", book.id);
      const { id, uid, ...data } = draft;
      await updateDoc(ref, data);
      setBookList(bookList.map(b => (b.id === book.id ? { ...b, ...data } : b)));
      setEditing(false);
    } catch (err) {
      alert("Save error: ", err);
    }
  };

  return (
    <article id="item-card" className="card">
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

        <button>Extra</button>
      </div>
    </article>
  );
}
