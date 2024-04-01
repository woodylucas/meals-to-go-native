import { useContext } from "react";
import { FavoritesContext } from "../../services/favorites/favorites.context";

const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};

export default useFavoritesContext;
