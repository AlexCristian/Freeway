import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { Container, Content, Icon, Button, Text } from "native-base";
import { NavigationActions, StackActions } from "react-navigation";
import styles from "./styles";
import data from "./data";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })],
});

const profile = data[0];

class Profile extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content scrollEnabled={true}>
          <View style={styles.profileImageView}>
            <Image
              source={require("../../../assets/harun.jpeg")}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.profileDescriptionView}>
            <Text style={styles.nameText}>{profile.name}</Text>
            <Text style={styles.cityText}>{profile.profession}</Text>
            <Text style={styles.cityText}>{profile.city}</Text>
            <Text style={styles.emailText}>
              <Text style={{ fontWeight: "700" }}>Email: </Text>
              {profile.email}
            </Text>
            <Text style={styles.bioText}>
              <Text style={{ fontWeight: "700" }}>Bio: </Text>
              {profile.bio}
            </Text>
          </View>
        </Content>
        <View style={styles.goingOutView}>
          <View style={styles.goingOutTextView}>
            <Button
              transparent
              style={styles.settingsBtn}
              onPress={() => navigation.navigate("Faq")}
            >
              <Text style={styles.settingsBtnText}>FAQs</Text>
            </Button>
            <Button
              block
              rounded
              style={styles.logoutBtn}
              onPress={() => navigation.dispatch(resetAction)}
            >
              <Text style={styles.logoutBtnText}>Logout</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

export default Profile;
