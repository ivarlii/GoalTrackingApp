import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginComponent from "./components/login";
import RegisterComponent from "./components/register";
import HomeComponent from "./components/pages/home";
import HealthComponent from "./components/pages/health";
import SportComponent from "./components/pages/sport";
import ImprovementComponent from "./components/pages/improvement";
import DiscoverComponent from "./components/pages/discover";
import UserSettingsComponent from "./components/pages/userSettings";
import NavigationComponent from "./components/navigation";
import SideBarComponent from "./components/sideBar";

function App() {
  return (
    <div className="App font-face-gm">
      <header className="App-header">
        <Router>
          <Route path="/" exact={true}>
            <LoginComponent />
          </Route>
          <div>
            <NavigationComponent />
            <div className="flex-col items-center justify-center py-2">
              <SideBarComponent />
              <div className="p-6 m-auto h-4/5">
                <Switch>
                  <Route path="/register">
                    <RegisterComponent />
                  </Route>
                  <Route path="/home">
                    <HomeComponent />
                  </Route>
                  <Route path="/health">
                    <HealthComponent />
                  </Route>
                  <Route path="/sport">
                    <SportComponent />
                  </Route>
                  <Route path="/discover">
                    <DiscoverComponent />
                  </Route>
                  <Route path="/improvement">
                    <ImprovementComponent />
                  </Route>
                  <Route path="/settings">
                    <UserSettingsComponent />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
