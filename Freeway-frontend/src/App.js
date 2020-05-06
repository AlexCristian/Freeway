import { createAppContainer, createStackNavigator } from "react-navigation";

import Login from "./screens/Login/";
import HomeTabNavigation from "./screens/Home/tabNavigation";
import ChatList from "./screens/ChatList/";
import ChatScreen from "./screens/ChatScreen";
import PhotoCardDetails from "./screens/PhotoCardDetails";
import Faq from "./screens/Faq";

const App = createStackNavigator(
  {
    Login: { screen: Login },
    HomeTabNavigation: { screen: HomeTabNavigation },
    ChatList: { screen: ChatList },
    ChatScreen: { screen: ChatScreen },
    PhotoCardDetails: { screen: PhotoCardDetails },
    Faq: { screen: Faq },
  },
  {
    index: 0,
    initialRouteName: "Login",
    headerMode: "none",
  }
);

export default createAppContainer(App);
