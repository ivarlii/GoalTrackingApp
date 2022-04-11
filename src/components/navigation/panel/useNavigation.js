import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

const useNavigation = () => {
  let location = useLocation();
  const [route, setRoute] = useState(
    location.pathname ? location.pathname : "/home"
  );
  const selectAction = useCallback(
    (option) => {
      if (route === option) return;
      setRoute(option);
    },
    [route]
  );

  return { currentRoute: route, setCurrentRoute: selectAction };
};

export default useNavigation;
