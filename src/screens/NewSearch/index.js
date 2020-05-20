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
import data from "./data";
import { NavigationActions } from "react-navigation";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

const navigateAction = (taskId) =>
  NavigationActions.navigate({
    routeName: "PhotoCard",
    params: { taskID: taskId },
  });

class NewSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDesc: "",
      newTaskResponse: null,
    };
    this.handleTask = (text) => {
      this.setState({ taskDesc: text });
    };
  }

  sendTask(taskDescription) {
    return fetch("http://freeway.eastus.cloudapp.azure.com:8000/api/task", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: taskDescription,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          newTaskResponse: result.id,
        });
      })
      .catch((error) => console.log("error:", error));
  }

  async getTaskId(taskDescription) {
    const navigation = this.props.navigation;
    await this.sendTask(taskDescription);
    navigation.dispatch(navigateAction(this.state.newTaskResponse));
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content style={{ marginTop: Platform.OS === "ios" ? 0 : undefined }}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter task description"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handleTask}
          ></TextInput>
        </Content>
        <View>
          <Grid style={styles.bottomPillsView}>
            <Row style={styles.bottomRowStyle}>
              <Button
                danger
                onPress={() => this.getTaskId(this.state.taskDesc)}
                style={styles.bottomRoundedPillsBtn}
              >
                <Icon
                  active
                  name="md-search"
                  style={styles.bottomRoundedPillsCloseIcon}
                />
              </Button>
            </Row>
          </Grid>
        </View>
      </Container>
    );
  }
}

export default NewSearch;
