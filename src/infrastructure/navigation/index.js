import { AppNavigator } from "./app.navigator";
import { NavigationContainer } from "@react-navigation/native";
import useAuth from "../../utils/hooks/useAuth";
import { AccountNavigator } from "./account.navigator";

export const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
