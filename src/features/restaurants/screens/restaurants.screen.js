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

export const RestaurantScreen = () => {
  const { restaurants, error, isLoading } = useRestaurantContext();

  return (
    <SafeArea>
      <Search />
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.blue300} />
        </LoadingContainer>
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => (
          <Spacer position="bottom" size="large">
            <RestaurantInfoCard restaurant={item} />
          </Spacer>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
