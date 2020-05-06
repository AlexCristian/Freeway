import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Dimensions,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Header,
  Title,
  Left,
  Right,
  Body,
  Thumbnail,
} from "native-base";
import { GiftedChat, Actions, Bubble, Send } from "react-native-gifted-chat";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";

var { height } = Dimensions.get("window");

class chatScreen extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default connect()(chatScreen);
