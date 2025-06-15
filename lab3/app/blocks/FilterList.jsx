import { useContext, useState } from "react";
import { BookListContext } from "../hooks/BookListContext";
import { useUser } from "../engine/UserService";

export default function Filters({
  filterAuthor,
  filterPriceMin,
  filterPriceMax,
  filterHardCover,
  filterPageCountMin,
  filterPageCountMax,
  filterDescriptionWord,
}) {
  const [showMine, setShowMine] = useState(false);
  const { toggleUserBooks } = useContext(BookListContext);
  const user = useUser();

  const handleToggle = () => {
    setShowMine((prev) => {
      const updated = !prev;
      toggleUserBooks(updated);
      return updated;
    });
  };

  return (
    <section id="filter-bar" className="filter-panel">
      <input
        type="text"
        placeholder="Author"
        id="filter-author"
        onChange={filterAuthor}
      />

      <div className="filter-group">
        <input type="number" placeholder="Price min" onChange={filterPriceMin} />
        <input type="number" placeholder="Price max" max={10000} onChange={filterPriceMax} />
      </div>

      {/* Uncomment if hardcover filter becomes active
      <div className="filter-group">
        <label htmlFor="hardCover">Hard cover</label>
        <input type="checkbox" id="hardCover" onChange={filterHardCover} />
      </div>
      */}

      <div className="filter-group">
        <input type="number" placeholder="Pages min" id="filter-pages-min" onChange={filterPageCountMin} />
        <input type="number" placeholder="Pages max" max={10000} onChange={filterPageCountMax} />
      </div>

      <input
        type="text"
        placeholder="Description"
        id="filter-description"
        onChange={filterDescriptionWord}
      />

      {user && (
        <button onClick={handleToggle}>
          My Books
        </button>
      )}
    </section>
  );
}
