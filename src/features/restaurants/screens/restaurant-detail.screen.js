import { useReducer } from "react";
import { ScrollView } from "react-native";

import { RestaurantInfoCard } from "../components/restaurant-info-card.components";
import { List } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { createAction } from "../../../utils/reducer/reducer.utils";

const DETAILS_ACTION_TYPES = {
  TOGGLE_EXPANDED: "TOGGLE_EXPANDED",
};

const reducer = (state, action) => {
  switch (action.type) {
    case DETAILS_ACTION_TYPES.TOGGLE_EXPANDED:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };

    default:
      return state;
  }
};

export const RestaurantDetailsScreen = ({ route }) => {
  const { restaurant } = route.params;
  const [state, dispatch] = useReducer(reducer, {
    breakfastExpanded: false,
    launchExpanded: false,
    dinnerExpanded: false,
    drinksExpanded: false,
  });

  const toggleExpanded = (key) => {
    dispatch(createAction(DETAILS_ACTION_TYPES.TOGGLE_EXPANDED, key));
  };

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={state.breakfastExpanded}
          onPress={() => toggleExpanded("breakfastExpanded")}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>
        <List.Accordion
          title="Lunch"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={state.lunchExpanded}
          onPress={() => toggleExpanded("lunchExpanded")}
        >
          <List.Item title="Burger W/ Fries" />
          <List.Item title="Steak Sandwich" />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>
        <List.Accordion
          title="Dinner"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={state.dinnerExpanded}
          onPress={() => toggleExpanded("dinnerExpanded")}
        >
          <List.Item title="Chicken Parmesan" />
          <List.Item title="Veal Cutlet W/ Chicken Mushrooms" />
          <List.Item title="Steak Frites" />
        </List.Accordion>
        <List.Accordion
          title="Drinks"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={state.drinksExpanded}
          onPress={() => toggleExpanded("drinksExpanded")}
        >
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Lemonade" />
          <List.Item title="Sprite" />
          <List.Item title="Cola Champagne" />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};
