import { useState, createContext, useMemo } from "react";
import { loginRequest, registerRequest } from "./authentication.service";

export const AuthenticationContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: [],
  onLogin: () => {},
  onRegister: () => {},
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

  const onRegister = async (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const currentUser = await registerRequest(email, password);
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
      onRegister,
    };
  }, [user, isLoading, error]);
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
