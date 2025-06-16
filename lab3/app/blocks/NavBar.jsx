import { NavLink } from "react-router-dom";
import { loginWithGoogle, logOut, useUser } from "../engine/UserService";
import { useFavorites } from "../hooks/FavoriteContext"; // dodane

export default function NavBar() {
  const { user, loading } = useUser();
  const { favorites } = useFavorites(); // dodane

  if (loading) return null;

  return (
    <nav id="nav-bar" className="nav">
      <NavLink to="/new" className="nav-link">
        Add Book
      </NavLink>

      <NavLink to="/" className="nav-link">
        Library
      </NavLink>

      <NavLink to="/favorites" className="nav-link">
        Favorites ({favorites.length})
      </NavLink>

      {!user ? (
        <button className="nav-link" onClick={loginWithGoogle}>
          Sign in with Google
        </button>
      ) : (
        <>
          <span className="nav-user">Welcome: {user.displayName}</span>
          <button className="nav-link" onClick={logOut}>
            Sign out
          </button>
        </>
      )}
    </nav>
  );
}
