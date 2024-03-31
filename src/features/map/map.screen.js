import { useState, useEffect } from "react";

import MapView, { MapMarker } from "react-native-maps";
import styled from "styled-components/native";

import { Search } from "./components/search.component";
import useLocationContext from "../../utils/hooks/useLocationContext";
import useRestaurantContext from "../../utils/hooks/useRestaurantContext";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = () => {
  const { location } = useLocationContext();
  const { restaurants } = useRestaurantContext();
  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;
  console.log(viewport);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <MapMarker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            />
          );
        })}
      </Map>
    </>
  );
};
