import React, { Component } from "react";
import { View, TextInput, Image, Platform } from "react-native";
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Body,
  Grid,
  Row,
  Icon,
  Button,
} from "native-base";
import styles from "./styles";
import { NavigationActions } from "react-navigation";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

const navigateAction = (bio, location) =>
  NavigationActions.navigate({
    routeName: "Profile",
    params: { bioText: bio, locationText: location },
  });

class SetBioAndLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      location: "",
    };
    this.handleBio = (text) => {
      this.setState({ bio: text });
    };
    this.handleLoc = (text) => {
      this.setState({ location: text });
    };
  }

  sendBio(bioText) {
    return fetch("http://freeway.eastus.cloudapp.azure.com:8000/api/setbio", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bio: bioText,
      }),
    }).catch((error) => console.log("error:", error));
  }

  sendLocation(locText) {
    return fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/setlocation",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: locText,
        }),
      }
    ).catch((error) => console.log("error:", error));
  }

  async sendNewProfile(bio, loc) {
    await this.sendBio(bio);
    await this.sendLocation(loc);
    this.props.navigation.navigate("Profile");
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content style={{ marginTop: Platform.OS === "ios" ? 0 : undefined }}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter your new bio"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handleBio}
          ></TextInput>
          <TextInput
            style={styles.inputLoc}
            underlineColorAndroid="transparent"
            placeholder="Enter your new location"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handleLoc}
          ></TextInput>
        </Content>
        <View>
          <Grid style={styles.bottomPillsView}>
            <Row style={styles.bottomRowStyle}>
              <Button
                rounded
                block
                style={styles.logoutBtn}
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <Text style={styles.logoutBtnText}>Cancel</Text>
              </Button>
              <Button
                rounded
                block
                style={styles.logoutBtn}
                onPress={() =>
                  this.sendNewProfile(this.state.bio, this.state.location)
                }
              >
                <Text style={styles.logoutBtnText}>Submit</Text>
              </Button>
            </Row>
          </Grid>
        </View>
      </Container>
    );
  }
}

export default SetBioAndLocation;
