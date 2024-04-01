import { useState, createContext, useMemo } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const onAdd = (restaurant) => {
    setFavorites((prevFavorites) => [...prevFavorites, restaurant]);
  };

  const onRemove = (restaurant) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => {
        return favorite.placeId !== restaurant.placeId;
      })
    );
  };

  const value = useMemo(() => {
    return { favorites, addToFavorites: onAdd, removeFromFavorites: onRemove };
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
