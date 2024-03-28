import { useState, useEffect } from "react";
import { SearchContainer } from "../screens/restaurants.screen.style";
import { Searchbar } from "react-native-paper";
import useLocationContext from "../../../utils/hooks/useLocationContext";

export const Search = () => {
  const { keyword, search } = useLocationContext();

  const [searchKeyword, setSearchKeyword] = useState(keyword);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
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
