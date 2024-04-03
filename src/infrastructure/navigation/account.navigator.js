import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const AccountStack = createStackNavigator();

export const AccountNavigator = () => (
  <AccountStack.Navigator screenOptions={{ headerShown: false }}>
    <AccountStack.Screen
      name="Main"
      component={() => (
        <View>
          <Text>Account Screen</Text>
        </View>
      )}
    />
    <AccountStack.Screen
      name="Login"
      component={() => (
        <View>
          <Text>Login</Text>
        </View>
      )}
    />
  </AccountStack.Navigator>
);
