import { useContext } from "react";
import { LocationContext } from "../../services/location/location.context";

const useLocationContext = () => {
  return useContext(LocationContext);
};

export default useLocationContext;
