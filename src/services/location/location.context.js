import { useState, createContext, useMemo, useEffect } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext({
  keyword: "",
  error: null,
  isLoading: false,
  location: [],
  search: () => {},
});

const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("San Francisco");
  const [location, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    if (!searchKeyword?.length) {
      // don't do anything
      return;
    }
    locationRequest(searchKeyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
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
    return { error, isLoading, location, search: onSearch, keyword };
  }, [error, isLoading, location, keyword]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
