import {
  useState,
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  restaurantsRequest,
  restaurantsTransform,
} from "./restaurants.service";

export const RestaurantsContext = createContext({
  restaurants: [],
  isLoading: false,
  error: null,
});

const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveRestaurants = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      restaurantsRequest()
        .then(restaurantsTransform)
        .then((results) => {
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  }, []);

  useEffect(() => {
    retrieveRestaurants();
  }, []);

  const value = useMemo(() => {
    return { restaurants, isLoading, error };
  }, [restaurants, isLoading, error]);

  return (
    <RestaurantsContext.Provider value={value}>
      {children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContextProvider;
