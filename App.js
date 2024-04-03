import { useState, useEffect } from "react";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { ThemeProvider } from "styled-components/native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import RestaurantsContextProvider from "./src/services/restaurants/restaurants.context";
import LocationContextProvider from "./src/services/location/location.context";
import FavoritesContextProvider from "./src/services/favorites/favorites.context";
import { Navigation } from "./src/infrastructure/navigation";

const firebaseConfig = {
  apiKey: "AIzaSyAsVF3rVYNn75_8HBzKrj88e692OZLTbgo",
  authDomain: "mealstogo-ccf49.firebaseapp.com",
  projectId: "mealstogo-ccf49",
  storageBucket: "mealstogo-ccf49.appspot.com",
  messagingSenderId: "126082072918",
  appId: "1:126082072918:web:47e421ea7beba4ccbfd6f7",
};

const app = initializeApp(firebaseConfig);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log();

  useEffect(() => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, "mo@binni.io", "test123")
      .then((user) => {
        console.log(user);
        setIsAuthenticated(true);
      })
      .catch((e) => console.log(e));
  }, []);

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <FavoritesContextProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <Navigation />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FavoritesContextProvider>
        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
