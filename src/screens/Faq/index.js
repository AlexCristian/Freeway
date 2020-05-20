import React, { Component } from "react";
import { View, Image, Platform } from "react-native";
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

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

class Faq extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content style={{ marginTop: Platform.OS === "ios" ? 0 : undefined }}>
          <List
            removeClippedSubviews={false}
            style={{ marginTop: 7 }}
            dataArray={data}
            renderRow={(dataRow) => (
              <ListItem>
                <Body>
                  <Text style={styles.userNameText}>{dataRow.question}</Text>
                  <Text style={styles.distanceText}>{dataRow.answer}</Text>
                </Body>
              </ListItem>
            )}
          />
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

export default Faq;
