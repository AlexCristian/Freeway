import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, SafeAreaView } from "react-native";
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

const navigateAction = (name) =>
  NavigationActions.navigate({
    routeName: "ChatScreen",
    params: { name: name },
  });

class ChatList extends Component {
  render() {
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
            dataArray={data}
            renderRow={(dataRow) => (
              <ListItem
                avatar
                button
                style={{ marginLeft: 15 }}
                onPress={() =>
                  navigation.dispatch(navigateAction(dataRow.name))
                }
              >
                <Left>
                  <Thumbnail round source={dataRow.thumbnail} />
                </Left>
                <Body>
                  <Text style={styles.userNameText}>{dataRow.name}</Text>
                  <Text style={styles.distanceText}>
                    {dataRow.last_message}
                  </Text>
                </Body>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default connect()(ChatList);
