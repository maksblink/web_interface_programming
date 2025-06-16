import "./app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./map.jsx";
import { FavoriteProvider } from "./hooks/FavoriteContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoriteProvider>
        <AppRoutes />
      </FavoriteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
