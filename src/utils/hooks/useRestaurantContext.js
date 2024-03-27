import { useContext } from "react";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";

const useRestaurantContext = () => {
  return useContext(RestaurantsContext);
};

export default useRestaurantContext;
