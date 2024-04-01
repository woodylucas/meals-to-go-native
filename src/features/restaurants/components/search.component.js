import { useState, useEffect } from "react";
import { SearchContainer } from "../screens/restaurants.screen.style";
import { Searchbar } from "react-native-paper";
import useLocationContext from "../../../utils/hooks/useLocationContext";

export const Search = ({ isFavoriteToggled, onFavoritesToggled }) => {
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const { keyword, search } = useLocationContext();

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        icon={isFavoriteToggled ? "heart" : "heart-outline"}
        onIconPress={onFavoritesToggled}
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
