import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { FavoriteScreen } from "../../features/settings/screens/favorites.screen";
import { CameraScreen } from "../../features/settings/screens/camera.screen";

const SettingsStack = createStackNavigator();

export const SettingNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerMode: "screen",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favorites" component={FavoriteScreen} />
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};
