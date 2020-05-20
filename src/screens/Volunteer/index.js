import React, { Component } from "react";
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

class Volunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
      opac: 0,
      isLoading: true,
      dataSource: null,
      num: 1,
      swipeResponse: null,
    };
    this._deckSwiper = null;
  }

  async componentDidMount() {
    return await fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/feed/v",
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

  async sendSwipeInfo(volunteerId, swipeVal) {
    swipeVal == "False"
      ? this._deckSwiper._root.swipeLeft()
      : this._deckSwiper._root.swipeRight();

    return await fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/swipe/p/655d2c7a-bccb-4afc-908f-012e5ec65c85/" +
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
    console.log("==============================", this.state.num++);
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      const navigation = this.props.navigation;
      return (
        <Container>
          <Header />
          <View style={styles.deckswiperView}>
            <DeckSwiper
              ref={(c) => (this._deckSwiper = c)}
              dataSource={this.state.dataSource}
              looping={false}
              renderEmpty={() => (
                <View style={{ alignSelf: "center" }}>
                  <Text>No cards to display.</Text>
                </View>
              )}
              renderItem={(item) => (
                <Card style={{ elevation: 3 }}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{ uri: item.photourl }} />
                      <Body>
                        <Text>{item.name}</Text>
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
        </Container>
      );
    }
  }
}

export default Volunteer;
