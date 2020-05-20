import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, SafeAreaView, ActivityIndicator, View } from "react-native";
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

const navigateAction = (id, name, photourl, lastmsg) =>
  NavigationActions.navigate({
    routeName: "ChatScreen",
    params: { convId: id, name: name, photoURL: photourl, lastMsg: lastmsg },
  });

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  async componentDidMount() {
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
            <List
              removeClippedSubviews={false}
              style={{ marginTop: 7 }}
              dataArray={this.state.dataSource}
              renderRow={(dataRow) => (
                <ListItem
                  avatar
                  button
                  style={{ marginLeft: 15 }}
                  onPress={() =>
                    navigation.dispatch(
                      navigateAction(
                        dataRow.id,
                        dataRow.name,
                        dataRow.photourl,
                        dataRow.lastmsg
                      )
                    )
                  }
                >
                  <Left>
                    <Thumbnail round source={{ uri: dataRow.photourl }} />
                  </Left>
                  <Body>
                    <Text style={styles.userNameText}>{dataRow.name}</Text>
                    <Text style={styles.distanceText}>{dataRow.lastmsg}</Text>
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
