import { useState, createContext, useMemo } from "react";
import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext({
  user: null,
  isLoading: false,
  error: [],
  onLogin: () => {},
});

const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);

  const onLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const currentUser = await loginRequest(email, password);
      setUser(currentUser);
    } catch (err) {
      console.log("error", err);
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(() => {
    return {
      isAuthenticated: !!user,
      user,
      isLoading,
      error,
      onLogin,
    };
  }, [user, isLoading, error]);
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
