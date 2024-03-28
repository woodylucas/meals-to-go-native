import { createStackNavigator } from "@react-navigation/stack";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screen";
import { Text } from "react-native";

const RestuarantStack = createStackNavigator();

export const RestuarantsNavigator = () => {
  return (
    <RestuarantStack.Navigator screenOptions={{ headerShown: false }}>
      <RestuarantStack.Screen name="Restaurants" component={RestaurantScreen} />
      <RestuarantStack.Screen
        name="RestaurantDetails"
        component={() => <Text>Restaurant Details</Text>}
      />
    </RestuarantStack.Navigator>
  );
};
