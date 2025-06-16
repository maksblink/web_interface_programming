import { useFavorites } from "../hooks/FavoriteContext";

export default function FavoritesView() {
  const { favorites } = useFavorites();

  return (
    <section>
      <h2>Favorite Books</h2>
      {favorites.length === 0 && <p>No favorites yet.</p>}

      {favorites.map(book => (
        <article key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </article>
      ))}
    </section>
  );
}
