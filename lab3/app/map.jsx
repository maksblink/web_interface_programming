import { Route, Routes } from "react-router-dom";

import Home from "./views/home";
import AddBook from "./views/addBook";
import { Welcome } from "./welcome/welcome";
import NotFound from "./views/NotFound";
import NavBar from "./blocks/NavBar";
import { BookListProvider } from "./hooks/BookListContext";

export default function AppRoutes() {
  return (
    <BookListProvider>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<AddBook />} />
          <Route path="/welcome" element={<Welcome />} />

          {/* ⛔ fallback for any unknown route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BookListProvider>
  );
}
