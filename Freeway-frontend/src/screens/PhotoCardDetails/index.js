import React, { Component } from "react";
import { View, Image, Platform } from "react-native";
import { Container, Content, Text, Grid, Row, Icon, Button } from "native-base";
import styles from "./styles";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

class PhotoCardDetails extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content style={{ marginTop: Platform.OS === "ios" ? 0 : undefined }}>
          <View style={styles.instagramPhotosCarousel}>
            <Image
              style={styles.image}
              source={require("../../../assets/pankaj.jpeg")}
            />
          </View>
          <View style={styles.subTextView}>
            <Text style={styles.nameText}>Pankaj Rai, Student</Text>
            <Text style={styles.workingText}>Philadelphia</Text>
          </View>
          <View style={styles.quoteView}>
            <Text style={styles.quoteText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>
          <View style={styles.instagramPhotoCountView}>
            <Text>Email: pankaj@drexel.edu</Text>
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
