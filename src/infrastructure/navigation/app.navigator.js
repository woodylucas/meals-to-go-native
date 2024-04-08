import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RestuarantsNavigator } from "../navigation/restaurants.navigator";
import { SettingNavigator } from "./settings.navigator";
import { MapScreen } from "../../features/map/map.screen";

import { Ionicons } from "@expo/vector-icons";

import FavoritesContextProvider from "../../services/favorites/favorites.context";
import LocationContextProvider from "../../services/location/location.context";
import RestaurantsContextProvider from "../../services/restaurants/restaurants.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurant: "restaurant",
  Map: "map",
  Settings: "settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
    headerShown: false,
  };
};

export const AppNavigator = () => {
  return (
    <FavoritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Restaurant" component={RestuarantsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingNavigator} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  );
};
