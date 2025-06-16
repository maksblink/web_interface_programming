import { createContext, useReducer, useContext } from "react";

const FavoriteContext = createContext();

const initialState = {
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        favorites: [...state.favorites, action.book],
      };
    case "REMOVE":
      return {
        ...state,
        favorites: state.favorites.filter(b => b.id !== action.id),
      };
    default:
      return state;
  }
}

export const FavoriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFavorite = (book) => dispatch({ type: "ADD", book });
  const removeFavorite = (id) => dispatch({ type: "REMOVE", id });

  return (
    <FavoriteContext.Provider value={{ favorites: state.favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
