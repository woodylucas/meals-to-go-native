import { useState, createContext, useMemo, useEffect } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext({
  keyword: "",
  error: null,
  isLoading: false,
  location: null,
  search: () => {},
});

const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("San Francisco");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  const value = useMemo(() => {
    return { isLoading, error, location, keyword, search: onSearch };
  }, [isLoading, error, keyword, location]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
