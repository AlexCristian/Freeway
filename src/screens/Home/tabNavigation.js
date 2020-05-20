import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { Icon, Header, FooterTab, Button, Thumbnail } from "native-base";
import { SafeAreaView } from "react-native";
import Profile from "../Profile";
import PhotoCard from "../PhotoCard";
import ChatList from "../ChatList";
import styles from "./styles";
import Volunteer from "../Volunteer";

const HomeTabNavigation = createMaterialTopTabNavigator(
  {
    Profile: { screen: Profile },
    PhotoCard: { screen: PhotoCard },
    Volunteer: { screen: Volunteer },
    Chat: { screen: ChatList },
  },
  {
    tabBarPosition: "top",
    initialRouteName: "PhotoCard",
    lazy: true,
    tabBarComponent: (props) => {
      return (
        <SafeAreaView>
          <Header>
            <FooterTab>
              <Button onPress={() => props.navigation.navigate("Profile")}>
                <Icon
                  name="md-person"
                  size={20}
                  style={
                    props.navigation.state.index === 0
                      ? styles.activeIcon
                      : styles.inActiveIcon
                  }
                />
              </Button>

              <Button onPress={() => props.navigation.navigate("PhotoCard")}>
                <Thumbnail
                  small
                  source={
                    props.navigation.state.index === 1
                      ? require("../../../assets/fw_logo.png")
                      : require("../../../assets/fw_logo_inactive.png")
                  }
                />
              </Button>

              <Button onPress={() => props.navigation.navigate("Volunteer")}>
                <Icon
                  name="md-hand"
                  style={
                    props.navigation.state.index === 2
                      ? styles.activeIcon
                      : styles.inActiveIcon
                  }
                />
              </Button>

              <Button onPress={() => props.navigation.navigate("Chat")}>
                <Icon
                  name="md-chatboxes"
                  style={
                    props.navigation.state.index === 3
                      ? styles.activeIcon
                      : styles.inActiveIcon
                  }
                />
              </Button>
            </FooterTab>
          </Header>
        </SafeAreaView>
      );
    },
  }
);

export default HomeTabNavigation;
