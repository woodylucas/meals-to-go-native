import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import useFavoritesContext from "../../utils/hooks/useFavoritesContext";

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9;
`;

export const Favorite = () => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesContext();

  return (
    <FavoriteButton>
      <AntDesign name="heart" size={24} color="red" />
    </FavoriteButton>
  );
};
