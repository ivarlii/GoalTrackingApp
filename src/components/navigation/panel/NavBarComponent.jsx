import classNames from "classnames";
import logoImage from "../../../assets/images/logo.png";
import { NavLink, useHistory, useLocation } from "react-router-dom";

const NavBarComponent = ({ navigationData, currentRoute, setCurrentRoute }) => {
  let location = useLocation();
  const initialPageUrl = "/home";
  const menuList = navigationData.map(({ url, title }, index) => {
    return (
      <li key={index} onClick={() => setCurrentRoute(url)}>
        <NavLink
          exact
          to={url}
          className={classNames([
            "w-28 h-12 text-gray-400 hover:text-gray-700 cursor-pointer font-medium tracking-wide text-sm flex items-start justify-center",
            currentRoute === url &&
              "text-gray-700 border-b-30 border-gray-700 bg-gradient-to-b from-white to-gray-100",
          ])}
        >
          {title}
        </NavLink>
      </li>
    );
  });

  let history = useHistory();
  return (
    <div
      className={`${
        ["/", "/register"].includes(location.pathname) && "hidden"
      }`}
    >
      <nav
        className={`hidden md:flex flex-row items-center justify-between px-8 h-20 rounded-b-3xl bg-white`}
      >
        <span className="flex justify-between text-5xl text-gray-800 -mb-1">
          <img
            src={logoImage}
            className="h-10 cursor-pointer"
            alt="goal-tracking-app-logo"
            onClick={() => {
              history.push(initialPageUrl);
              setCurrentRoute(initialPageUrl);
            }}
          />
          <a
            onClick={() => {
              history.push(initialPageUrl);
              setCurrentRoute(initialPageUrl);
            }}
            className="text-xl font-bold no-underline text-gray-800 p-3 hover:text-gray-600"
          >
            Goal Tracking
          </a>
        </span>
        <ul className="flex flex-row self-end w-6/12 justify-between h-12">
          {menuList}
        </ul>
        <button
          className="bg-white hover:bg-gray-50 border-2 border-gray-900 text-sm text-gray-900 py-3 px-5 rounded-lg font-medium tracking-wide leading-none"
          onClick={() => history.push("/")}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default NavBarComponent;
