import {
  useState,
  createContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../utils/hooks/useAuth";

export const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const saveFavorites = useCallback(async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);
    } catch (e) {}
  }, []);

  const loadFavorites = useCallback(async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favorites-${uid}`);
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (user && user.uid) {
      loadFavorites(user.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user && user.uid && favorites.length) {
      saveFavorites(favorites, user.uid);
    }
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
