import {
  useState,
  createContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const saveFavorites = useCallback(async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favorites", jsonValue);
    } catch (e) {}
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem("@favorites");
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

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
