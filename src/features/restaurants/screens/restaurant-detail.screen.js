import { RestaurantInfoCard } from "../components/restaurant-info-card.components";

import { SafeArea } from "../../../components/utility/safe-area.component";

export const RestaurantDetailsScreen = ({ route }) => {
  const { restaurant } = route.params;
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
    </SafeArea>
  );
};
