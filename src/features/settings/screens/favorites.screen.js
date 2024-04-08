import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import useFavoritesContext from "../../../utils/hooks/useFavoritesContext";

import * as Crypto from "expo-crypto";
import { RestaurantList } from "../../restaurants/screens/restaurants.screen.style";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.components";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
export const FavoriteScreen = ({ navigation }) => {
  const { favorites } = useFavoritesContext();
  return favorites.length ? (
    <SafeArea>
      <RestaurantList
        data={favorites}
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
  ) : (
    <NoFavouritesArea>
      <Text center>No favorties</Text>
    </NoFavouritesArea>
  );
};
