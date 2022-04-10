import { useCallback, useState } from "react";

const useNavigation = () => {
  const [route, setRoute] = useState("/home");
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
