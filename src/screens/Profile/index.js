import React, { Component } from "react";
import { Image, View, ActivityIndicator } from "react-native";
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
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }
  async componentDidMount() {
    return await fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/profile",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          isLoading: false,
          dataSource: result,
        });
      })
      .catch((error) => console.log("error:", error));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const profileName = this.state.dataSource.name;
      const profileCity = this.state.dataSource.location;
      const profileEmail = this.state.dataSource.email;
      const profileBio = this.state.dataSource.bio;
      const profilePhotoUrl = this.state.dataSource.photourl;

      const navigation = this.props.navigation;
      return (
        <Container style={styles.container}>
          <Content scrollEnabled={true}>
            <View style={styles.profileImageView}>
              <Image
                style={styles.profileImage}
                source={{ uri: profilePhotoUrl }}
              />
            </View>
            <View style={styles.profileDescriptionView}>
              <Text style={styles.nameText}>{profileName}</Text>
              <Text style={styles.cityText}>{profileCity}</Text>
              <Text style={styles.emailText}>
                <Text style={{ fontWeight: "700" }}>Email: </Text>
                {profileEmail}
              </Text>
              <Text style={styles.bioText}>
                <Text style={{ fontWeight: "700" }}>Bio: </Text>
                {profileBio}
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
}

export default Profile;
