import NavBarComponent from "./panel/NavBarComponent";
import navigationData from "./panel/MenuList";
import TabBarComponent from "./panel/TabBarComponent";
import useNavigation from "./panel/useNavigation";

const NavigationComponent = (props) => {
  const { currentRoute, setCurrentRoute } = useNavigation();

  return (
    <div className="bg-#c4d6c4-200">
      <NavBarComponent
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <TabBarComponent
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      {props.children}
    </div>
  );
};

export default NavigationComponent;
