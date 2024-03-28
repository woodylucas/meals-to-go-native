import { useContext } from "react";
import { LocationContext } from "../../services/location/location.context";

const useLocationContext = () => {
  const locationContext = useContext(LocationContext);
  return locationContext;
};

export default useLocationContext;
