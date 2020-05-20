import React, { Component } from "react";
import { View, Image, Platform } from "react-native";
import { Container, Content, Text, Grid, Row, Icon, Button } from "native-base";
import styles from "./styles";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

class PhotoCardDetails extends Component {
  constructor(props) {
    super(props);
    this.userName = this.props.navigation.state.params.name;
    this.photoURL = this.props.navigation.state.params.photoURL;
    this.userBio = this.props.navigation.state.params.userBio;
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content style={{ marginTop: Platform.OS === "ios" ? 0 : undefined }}>
          <View style={styles.instagramPhotosCarousel}>
            <Image style={styles.image} source={{ uri: this.photoURL }} />
          </View>
          <View style={styles.subTextView}>
            <Text style={styles.nameText}>{this.userName}</Text>
          </View>
          <View style={styles.quoteView}>
            <Text style={styles.quoteText}>{this.userBio}</Text>
          </View>
        </Content>
        <View>
          <Grid style={styles.bottomPillsView}>
            <Row style={styles.bottomRowStyle}>
              <Button
                danger
                onPress={() => this.props.navigation.goBack()}
                style={styles.bottomRoundedPillsBtn}
              >
                <Icon
                  active
                  name="md-arrow-round-back"
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

export default PhotoCardDetails;
