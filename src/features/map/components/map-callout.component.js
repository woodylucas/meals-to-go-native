import { CompactRestaurantInfo } from "../../../components/restaurant/compact-impact-restaurant-info.component";

export const MapCalloutComponent = ({ restaurant }) => {
  return <CompactRestaurantInfo isMap restaurant={restaurant} />;
};
