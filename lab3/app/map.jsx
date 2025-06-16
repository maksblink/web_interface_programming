import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import AddBook from "./views/addBook";
import Favorites from "./views/favorites";
import { Welcome } from "./welcome/welcome";
import NotFound from "./views/NotFound";
import NavBar from "./blocks/NavBar";
import { BookListProvider } from "./hooks/BookListContext";
import { FavoriteProvider } from "./hooks/FavoriteContext";

export default function AppRoutes() {
  return (
    <BookListProvider>
      <FavoriteProvider>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<AddBook />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </FavoriteProvider>
    </BookListProvider>
  );
}
