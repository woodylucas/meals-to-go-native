import { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication-context";

const useAuth = () => {
  return useContext(AuthenticationContext);
};

export default useAuth;
