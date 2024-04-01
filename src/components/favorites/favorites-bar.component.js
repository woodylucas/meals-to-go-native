import { ScrollView, TouchableOpacity } from "react-native";

import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import * as Crypto from "expo-crypto";
import { CompactRestaurantInfo } from "../restaurant/compact-impact-restaurant-info.component";
import { Text } from "../typography/text.component";

const FavoritesWrapper = styled.View`
  padding: 10px;
`;

export const FavoritesBar = ({ favorites, onNavigate }) => {
  if (!favorites.length) {
    return null;
  }

  return (
    <FavoritesWrapper>
      <Spacer variant="left.large">
        <Text variant="caption">Favorites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((restaurant) => (
          <Spacer key={Crypto.randomUUID()} position="left" size="medium">
            <TouchableOpacity
              onPress={() => onNavigate("RestaurantDetails", { restaurant })}
            >
              <CompactRestaurantInfo restaurant={restaurant} />
            </TouchableOpacity>
          </Spacer>
        ))}
      </ScrollView>
    </FavoritesWrapper>
  );
};
