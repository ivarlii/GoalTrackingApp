import {
  AiFillCompass,
  AiFillHeart,
  AiFillHome,
  AiFillSetting,
} from "react-icons/ai";
import { useCallback } from "react";
import classNames from "classnames";
import { BiBaseball } from "react-icons/bi";
import { ImUser } from "react-icons/im";
import { NavLink, useLocation } from "react-router-dom";

const TabBarComponent = ({ navigationData, currentRoute, setCurrentRoute }) => {
  let location = useLocation();
  const getTabIcon = useCallback((item) => {
    switch (item) {
      case "Home":
        return <AiFillHome />;
      case "Health":
        return <AiFillHeart />;
      case "Sport":
        return <BiBaseball />;
      case "Improvement":
        return <ImUser />;
      case "Settings":
        return <AiFillSetting />;
    }
  }, []);

  return (
    <nav
      className={`${["/", "/register"].includes(location.pathname) && "hidden"} 
                            flex md:hidden flex-row items-center justify-around px-8 h-20 bg-white visible md:invisible fixed bottom-0 w-full rounded-t-3xl text-2xl`}
    >
      {navigationData.map(({ url, title }, index) => (
        <span
          key={index}
          className={classNames([
            "text-gray-400 hover:text-gray-700 cursor-pointer w-22 h-full flex items-center justify-center",
            currentRoute === url &&
              "bg-gradient-to-t from-white to-gray-100 border-t-3 border-gray-700 text-gray-700",
            "group",
          ])}
          onClick={() => setCurrentRoute(url)}
        >
          <NavLink exact to={url}>
            <span className="-mb-1">{getTabIcon(title)}</span>
          </NavLink>
          <span
            className={classNames([
              "absolute w-auto min-w-max bottom-16 text-base font-medium hidden",
              "group-hover:inline",
            ])}
          >
            {title}
          </span>
        </span>
      ))}
    </nav>
  );
};

export default TabBarComponent;
