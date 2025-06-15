import { useContext, useState } from "react";
import BookListItem from "../blocks/BookListItem";
import FilterList from "../blocks/FilterList";
import { BookListContext } from "../hooks/BookListContext";

export default function Home() {
  const { bookList } = useContext(BookListContext);

  const [query, setQuery] = useState({
    author: "",
    priceMin: 0,
    priceMax: 110,
    hardCover: false,
    pageCountMin: 0,
    pageCountMax: Number.MAX_VALUE,
    descriptionWord: "",
  });

  const handleFilterChange = (key) => (ev) => {
    const value =
      key === "priceMin" || key === "priceMax" || key.includes("pageCount")
        ? Number(ev.target.value || 0)
        : ev.target.value;
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const filteredBooks = bookList
    .filter((book) =>
      book.author.toLowerCase().includes(query.author.toLowerCase())
    )
    .filter((book) => query.priceMin <= book.price && book.price <= query.priceMax)
    .filter(
      (book) =>
        query.pageCountMin <= book.pages && book.pages <= query.pageCountMax
    )
    .filter((book) =>
      book.description.toLowerCase().includes(query.descriptionWord.toLowerCase())
    )
    .map((book) => <BookListItem key={book.id} book={book} />);

  return (
    <section className="home-view">
      <div className="filter-area">
        <FilterList
          filterAuthor={handleFilterChange("author")}
          filterHardCover={handleFilterChange("hardCover")}
          filterDescriptionWord={handleFilterChange("descriptionWord")}
          filterPriceMin={handleFilterChange("priceMin")}
          filterPriceMax={handleFilterChange("priceMax")}
          filterPageCountMin={handleFilterChange("pageCountMin")}
          filterPageCountMax={handleFilterChange("pageCountMax")}
        />
      </div>

      <div className="book-list">{filteredBooks}</div>
    </section>
  );
}
