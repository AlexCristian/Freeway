import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import commonColor from "../../theme/variables/commonColor";

var Dimensions = require("Dimensions");
var { height } = Dimensions.get("window");

export default class Home extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 1000);
  }
  render() {
    if (!this.state.show) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size="large"
            color={commonColor.brandPrimary}
            style={{ top: height / 2.2 }}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }
}
