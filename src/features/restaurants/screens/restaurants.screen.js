import { useState } from "react";
import { MD2Colors } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.components";

import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  RestaurantList,
  Loading,
  LoadingContainer,
} from "./restaurants.screen.style";
import useRestaurantContext from "../../../utils/hooks/useRestaurantContext";
import { Search } from "../components/search.component";
import { TouchableOpacity } from "react-native";
import * as Crypto from "expo-crypto";
import useFavoritesContext from "../../../utils/hooks/useFavoritesContext";
import { FavoritesBar } from "../../../components/favorites/favorites-bar.component";

export const RestaurantScreen = ({ navigation }) => {
  const [isToggled, setIsToggled] = useState(false);
  const { restaurants, isLoading } = useRestaurantContext();
  const { favorites } = useFavoritesContext();

  return (
    <SafeArea>
      <Search
        isFavoriteToggled={isToggled}
        onFavoritesToggled={() => setIsToggled((prevIsToggle) => !prevIsToggle)}
      />
      {isToggled && (
        <FavoritesBar favorites={favorites} onNavigate={navigation.navigate} />
      )}
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} color={MD2Colors.blue300} />
        </LoadingContainer>
      )}
      <RestaurantList
        data={restaurants}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDetails", {
                id: Crypto.randomUUID(),
                restaurant: item,
              })
            }
          >
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={item} />
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
