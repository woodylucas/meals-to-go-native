import { useState, createContext, useMemo } from "react";
import { loginRequest, registerRequest, auth } from "./authentication.service";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthenticationContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: [],
  onLogin: () => {},
  onLogout: () => {},
  onRegister: () => {},
});

const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

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

  const onLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err, "error");
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
      onLogout,
    };
  }, [user, isLoading, error]);
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
