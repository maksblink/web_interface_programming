import { NavLink } from "react-router-dom";
import { loginWithGoogle, logOut, useUser } from "../engine/UserService";

export default function NavBar() {
  const user = useUser();

  return (
    <nav id="nav-bar" className="nav">
      <NavLink to="/new" className="nav-link">
        Add Book
      </NavLink>

      <NavLink to="/" className="nav-link">
        Library
      </NavLink>

      {!user && (
        <button className="nav-link" onClick={loginWithGoogle}>
          Sign in with Google
        </button>
      )}

      {user && (
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
