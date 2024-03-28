import { useState, createContext, useMemo, useEffect } from "react";

import { locationRequest, locationTransform } from "./locastion.service";

export const LocationContext = createContext({
  error: null,
  isLoading: false,
  location: [],
  search: () => null,
  keyword: "",
});

const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("san francisco");
  const [location, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword = "Antwerp") => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    locationRequest(searchKeyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocations(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    onSearch();
  }, []);

  const value = useMemo(() => {
    return { error, isLoading, location, search: () => null, keyword };
  }, [error, isLoading, location, keyword]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
