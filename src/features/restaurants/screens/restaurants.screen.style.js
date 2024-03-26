import styled from "styled-components";

import { FlatList } from "react-native";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export { SearchContainer, RestaurantList };
