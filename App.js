import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import configureStore from "./src/store/configureStore";

const store = configureStore();

// Register Screens
Navigation.registerComponentWithRedux(
  "basics.AuthScreen",() => AuthScreen,Provider,store);

  Navigation.registerComponentWithRedux(
  "basics.SharePlaceScreen",
  () => SharePlaceScreen,Provider, store);
Navigation.registerComponentWithRedux(
  "basics.FindPlaceScreen",
  () => FindPlaceScreen,Provider,store);
Navigation.registerComponentWithRedux(
  "basics.PlaceDetails",
  () => PlaceDetailScreen,Provider,store);
Navigation.registerComponentWithRedux(
  "basics.SideDrawer",
  () => SideDrawer,Provider,store);

// Start a App
export default () => Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
          
            component: {
              name: 'basics.AuthScreen'
            },
        options: {
          topBar: {
            title: {
              text: 'Login'
            }
          }
        }
      }
    
  });
});
