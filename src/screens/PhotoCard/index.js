import React, { Component, useRef } from "react";
import { Image, ImageBackground, ActivityIndicator, Alert } from "react-native";
import {
  Container,
  Text,
  Card,
  CardItem,
  DeckSwiper,
  Grid,
  Row,
  Icon,
  Button,
  Right,
  Body,
  Header,
  View,
  Thumbnail,
  Left,
} from "native-base";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";
import data from "./data";
import { NavigationActions } from "react-navigation";

const navigateAction = (name, photourl, bio) =>
  NavigationActions.navigate({
    routeName: "PhotoCardDetails",
    params: { name: name, photoURL: photourl, userBio: bio },
  });

class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      num: 1,
      swipeResponse: null,
      updateFeed: false,
    };
    this._deckSwiper = null;
    this.taskId =
      typeof this.props.navigation.state.params != "undefined"
        ? this.props.navigation.state.params.taskID
        : null;
  }

  async componentDidMount() {
    console.log("In componentDidMount()");
    return await fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/feed/p/" + this.taskId,
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
      .catch((error) => this.setState({ isLoading: false }));
  }

  async componentDidUpdate(prevState, prevProps) {
    if (this.state.updateFeed) {
      console.log("In componentDidUpdate()");
      this.state.updateFeed = false;
      return await fetch(
        "http://freeway.eastus.cloudapp.azure.com:8000/api/feed/p/" +
          this.taskId,
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
          // console.log(result);
          this.setState({
            isLoading: false,
            dataSource: result,
          });
        })
        .catch((error) => this.setState({ isLoading: false }));
    }
  }

  async sendSwipeInfo(volunteerId, swipeVal) {
    console.log("In sendSwipeInfo()");
    swipeVal == "False"
      ? this._deckSwiper._root.swipeLeft()
      : this._deckSwiper._root.swipeRight();

    return await fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/swipe/p/" +
        this.taskId +
        "/" +
        volunteerId +
        "/" +
        swipeVal,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((result) => {
        this.setState({
          isLoading: false,
          swipeResponse: result,
        });
      })
      .catch((error) => console.log("error:", error));
  }

  render() {
    const navigation = this.props.navigation;
    console.log("==============================", this.state.num++);
    this.taskId =
      typeof this.props.navigation.state.params != "undefined"
        ? this.props.navigation.state.params.taskID
        : null;
    console.log(this.taskId);
    // this.state.dataSource
    //   ? console.log(this.state.dataSource[0])
    //   : console.log("no task found");
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      console.log("IN RENDER");
      this.state.dataSource
        ? console.log(this.state.dataSource[0])
        : console.log("no task found");
      if (this.state.dataSource) {
        return (
          <Container>
            <Header />
            <View style={styles.deckswiperView}>
              <DeckSwiper
                ref={(c) => (this._deckSwiper = c)}
                dataSource={this.state.dataSource}
                looping={false}
                renderEmpty={() => (
                  <View style={{ align: "center" }}>
                    <Text>No cards to display!!!!</Text>
                  </View>
                )}
                renderItem={(item) => (
                  <Card style={{ elevation: 3 }}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{ uri: item.photourl }} />
                        <Body>
                          <Text>{item.name}</Text>
                          {console.log(
                            "IN renderItem()",
                            this.state.dataSource[0]
                          )}
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem
                      cardBody
                      button
                      style={styles.deckswiperImageCarditem}
                      activeOpacity={1}
                      cardBody
                      onPress={() =>
                        navigation.dispatch(
                          navigateAction(item.name, item.photourl, item.bio)
                        )
                      }
                    >
                      <Image
                        style={{ height: 300, flex: 1 }}
                        source={{ uri: item.photourl }}
                      />
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Button
                          style={styles.bottomRoundedPills}
                          onPress={() => this.sendSwipeInfo(item.id, "False")}
                        >
                          <Icon
                            name="md-close"
                            style={{
                              color: commonColor.brandDanger,
                              fontSize: 40,
                              lineHeight: 40,
                            }}
                          />
                        </Button>
                      </Body>
                      <Right>
                        <Button
                          style={styles.bottomRoundedPills}
                          onPress={() => this.sendSwipeInfo(item.id, "True")}
                        >
                          <Icon
                            name="md-heart"
                            style={{
                              color: commonColor.brandSuccess,
                              fontSize: 35,
                              lineHeight: 40,
                              marginLeft: 2,
                              marginRight: 2,
                            }}
                          />
                        </Button>
                      </Right>
                    </CardItem>
                  </Card>
                )}
              />
            </View>
            <View style={styles.goingOutView}>
              <Button
                transparent
                style={styles.settingsBtn}
                onPress={() => {
                  this.state.updateFeed = true;
                  navigation.navigate("NewSearch");
                }}
              >
                <Text style={styles.settingsBtnText}>Start new search</Text>
              </Button>
            </View>
          </Container>
        );
      } else {
        return (
          <Container>
            <Header />
            <View style={styles.deckswiperView}>
              <Text>
                No cards to display. Click start new search to look for
                volunteers
              </Text>
            </View>
            <View style={styles.goingOutView}>
              <Button
                transparent
                style={styles.settingsBtn}
                onPress={() => {
                  this.state.updateFeed = true;
                  navigation.navigate("NewSearch");
                }}
              >
                <Text style={styles.settingsBtnText}>Start new search</Text>
              </Button>
            </View>
          </Container>
        );
      }
    }
  }
}

export default PhotoCard;
