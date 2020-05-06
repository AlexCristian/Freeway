import React, { Component } from "react";
import { Image, ImageBackground, View } from "react-native";
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
} from "native-base";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";
import data from "./data";

class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
      opac: 0,
    };
    this._deckSwiper = null;
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.wrapper}>
        <View style={styles.deckswiperView}>
          <DeckSwiper
            activeOpacity={1}
            dataSource={data}
            ref={(c) => (this._deckSwiper = c)}
            onSwiping={(dir, opa) =>
              this.setState({ direction: dir, opac: opa })
            }
            renderTop={(item) => (
              <Card activeOpacity={1} style={{ borderRadius: 10 }}>
                <CardItem
                  button
                  style={styles.deckswiperImageCarditem}
                  activeOpacity={1}
                  cardBody
                  onPress={() => navigation.navigate("PhotoCardDetails")}
                >
                  <ImageBackground style={styles.cardMain} source={item.image}>
                    {this.state.direction === "left" && (
                      <View
                        style={{
                          // opacity: -this.state.opac / 150,
                          position: "absolute",
                          right: 30,
                          top: 40,
                          borderWidth: 2,
                          borderRadius: 5,
                          borderColor: commonColor.brandPrimary,
                          width: 100,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                          transform: [{ rotate: "20deg" }],
                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: "transparent",
                            fontSize: 30,
                            color: commonColor.brandPrimary,
                            fontWeight: "900",
                            textAlign: "center",
                            lineHeight: 35,
                          }}
                        >
                          NOPE
                        </Text>
                      </View>
                    )}
                    {this.state.direction === "right" && (
                      <View
                        style={{
                          // opacity: this.state.opac / 150,
                          position: "absolute",
                          left: 30,
                          top: 40,
                          borderWidth: 2,
                          borderRadius: 5,
                          borderColor: commonColor.brandSuccess,
                          width: 100,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                          transform: [{ rotate: "-20deg" }],
                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: "transparent",
                            fontSize: 30,
                            color: commonColor.brandSuccess,
                            fontWeight: "900",
                            textAlign: "center",
                            lineHeight: 35,
                          }}
                        >
                          Like
                        </Text>
                      </View>
                    )}
                  </ImageBackground>
                </CardItem>
                <CardItem
                  button
                  activeOpacity={1}
                  style={styles.deckswiperDetailsCarditem}
                >
                  <Body>
                    <Text style={styles.text}>
                      {item.name}, {item.profession}
                    </Text>
                    <Text style={styles.subtextLeft}>{item.city}</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Icon name="md-star" style={styles.iconRight} />
                      <Text style={styles.subtextRight}>{item.rating}</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            )}
            renderBottom={(item) => (
              <Card style={{ borderRadius: 10 }}>
                <CardItem
                  style={{
                    borderTopLeftRadius: 10,
                    overflow: "hidden",
                    borderTopRightRadius: 10,
                  }}
                  cardBody
                >
                  <Image style={styles.cardMain} source={item.image} />
                </CardItem>
                <CardItem
                  style={{
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Body>
                    <Text style={styles.text}>
                      {item.name}, {item.profession}
                    </Text>
                    <Text style={styles.subtextLeft}>{item.city}</Text>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      textStyle={{ color: "#797979", fontWeight: "900" }}
                    >
                      <Icon
                        name="md-star"
                        style={{ color: "#797979", paddingRight: 4 }}
                      />
                      <Text style={styles.text}>{item.rating}</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            )}
          />
        </View>
        <Grid style={styles.bottomGrid}>
          <Row style={styles.bottomRowStyle}>
            <Button
              style={styles.bottomRoundedPills}
              onPress={() => this._deckSwiper._root.swipeLeft()}
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
            <Button
              style={styles.bottomRoundedPills}
              onPress={() => this._deckSwiper._root.swipeRight()}
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
          </Row>
        </Grid>
      </Container>
    );
  }
}

export default PhotoCard;
