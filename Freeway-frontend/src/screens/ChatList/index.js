import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
  FlatList,
} from "react-native";
import {
  Container,
  Content,
  Button,
  Icon,
  Header,
  Title,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Body,
  List,
} from "native-base";
import { NavigationActions } from "react-navigation";
import styles from "./styles";
import data from "./data";

const navigateAction = (id, name, photourl, partnerid) =>
  NavigationActions.navigate({
    routeName: "ChatScreen",
    params: {
      convId: id,
      name: name,
      photoURL: photourl,
      partnerID: partnerid,
    },
  });

class ChatList extends Component {
  // intervalID;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
    this.num = 1;
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("IN componentDidUpdate", this.num++);
  // }

  async getChatList() {
    return await fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/conversations",
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

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  componentDidMount() {
    this.getChatList();
    // this.intervalID = setInterval(() => this.getChatList(), 1000);
    // return await fetch(
    //   "http://freeway.eastus.cloudapp.azure.com:8000/api/conversations",
    //   {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     this.setState({
    //       isLoading: false,
    //       dataSource: result,
    //     });
    //   })
    //   .catch((error) => console.log("error:", error));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const navigation = this.props.navigation;
      return (
        <Container style={{ backgroundColor: "#FFF" }}>
          <SafeAreaView />
          <Header>
            <Title>Matches</Title>
          </Header>
          <Content>
            <FlatList
              extraData={this.state}
              data={this.state.dataSource}
              keyExtractor={(data, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  avatar
                  button
                  style={{ marginLeft: 15 }}
                  onPress={() =>
                    navigation.dispatch(
                      navigateAction(
                        item.id,
                        item.name,
                        item.photourl,
                        item.partnerid
                      )
                    )
                  }
                >
                  <Left>
                    <Thumbnail round source={{ uri: item.photourl }} />
                  </Left>
                  <Body>
                    <Text style={styles.userNameText}>{item.name}</Text>
                    <Text style={styles.distanceText}>{item.lastmsg}</Text>
                  </Body>
                </ListItem>
              )}
            />
          </Content>
        </Container>
      );
    }
  }
}

export default connect()(ChatList);
