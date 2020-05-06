import React, { Component } from "react";
import { Dimensions, Image, StatusBar, Platform } from "react-native";
import { Container, Content, Text, Button, View } from "native-base";
import Swiper from "react-native-swiper";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";

var deviceHeight = Dimensions.get("window").height;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      loginAttempt: false,
    };
  }

  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ email: "a@gmail.com", oauthid: "123456" });

    var requestOptions = {
      method: "POST",
      credentials: "include",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/login",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        this.setState({
          isLoading: false,
          dataSource: result,
        });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <StatusBar
          backgroundColor={
            Platform.OS === "android"
              ? commonColor.statusBarColor
              : "transparent"
          }
          barStyle="dark-content"
        />
        <Content scrollEnabled={false}>
          <Swiper
            height={deviceHeight / 1.5}
            loop={false}
            dot={<View style={styles.swiperDot} />}
            activeDot={<View style={styles.swiperActiveDot} />}
          >
            <View style={styles.swiperSlidesView}>
              <View style={styles.swiperImageView}>
                <Image source={require("../../../assets/fw_logo.png")} />
              </View>
              <Text style={styles.loginText}>
                Freeway - Connecting People in Need (PiN) with Volunteers
              </Text>
            </View>
          </Swiper>

          <Button
            block
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate("HomeTabNavigation")}
          >
            <Text style={styles.loginBtnText}>Sign in with Google</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Login;
