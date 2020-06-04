import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { Container, Content, Text, Button, View } from "native-base";
import Swiper from "react-native-swiper";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";
import * as Google from "expo-google-app-auth";
import Expo from "expo";
var deviceHeight = Dimensions.get("window").height;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      signedIn: false,
      name: "",
      photoUrl: "",
      email: "",
      idToken: null,
    };
  }

  enrollUser() {
    makeLogin(this).catch((error) => {
      // User needs to sign up first
      signUpUser(this).then((resp) => {
        makeLogin(this);
      });
    });
  }

  getGoogleProfile = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "742738163356-k88p31d2uhgq45uk98p740einc3eff2m.apps.googleusercontent.com",
        androidStandaloneAppClientId:
          "742738163356-k88p31d2uhgq45uk98p740einc3eff2m.apps.googleusercontent.com",
        iosClientId:
          "742738163356-tpo7qt8cvqno2cs739k8uh7sp9c9oq58.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.setState({
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          email: result.user.email,
          idToken: result.idToken,
        });

        this.enrollUser();
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("Get Google profile error", e);
    }
  };

  sendLoginRequest() {
    return fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/login-legacy",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "a@gmail.com",
          oauthid: "123456",
        }),
      }
    )
      .then((response) => response.text())
      .then((result) => {
        this.setState({
          isLoading: false,
          dataSource: result,
        });
      })
      .catch((error) => console.log("error:", error));
  }

  async login() {
    await this.sendLoginRequest();
    if (!this.state.isLoading) {
      console.log(this.state.dataSource);
      if (this.state.dataSource === "Login acknowledged") {
        this.props.navigation.navigate("HomeTabNavigation");
      } else {
        Alert.alert("Invalid login credential! Please try again");
      }
    }
  }

  // render() {
  //   return (
  //     <Container style={{ backgroundColor: "#fff" }}>
  //       <StatusBar
  //         backgroundColor={
  //           Platform.OS === "android"
  //             ? commonColor.statusBarColor
  //             : "transparent"
  //         }
  //         barStyle="dark-content"
  //       />
  //       <Content scrollEnabled={false}>
  //         <Swiper
  //           height={deviceHeight / 1.5}
  //           loop={false}
  //           dot={<View style={styles.swiperDot} />}
  //           activeDot={<View style={styles.swiperActiveDot} />}
  //         >
  //           <View style={styles.swiperSlidesView}>
  //             <View style={styles.swiperImageView}>
  //               <Image source={require("../../../assets/fw_logo.png")} />
  //             </View>
  //             <Text style={styles.loginText}>
  //               Freeway - Connecting People in Need (PiN) with Volunteers
  //             </Text>
  //           </View>
  //         </Swiper>

  //         <Button
  //           block
  //           style={styles.loginBtn}
  //           onPress={() => {
  //             this.login();
  //           }}
  //         >
  //           <Text style={styles.loginBtnText}>Sign in with Google</Text>
  //         </Button>
  //       </Content>
  //     </Container>
  //   );
  // }

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          this.props.navigation.navigate("HomeTabNavigation")
        ) : (
          <LoginPage getGoogleProfile={this.getGoogleProfile} />
        )}
      </View>
    );
  }
}

function makeLogin(context) {
  return new Promise(function(resolve, reject) {
    email = context.state.email;
    idToken = context.state.idToken;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(idToken);
    var raw = JSON.stringify({ email: email, oauthid: idToken });
    var requestOptions = {
      method: "POST",
      credentials: "include",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/login",
      requestOptions
    )
      .then((result) => {
        if (result.ok) {
          context.setState({ signedIn: true });
          console.log("Login success.");
          resolve(result.text);
        } else {
          console.log("Login fail.");
          reject(result.status);
        }
      })
      .catch((error) => console.log("Login error", error));
  });
}

function signUpUser(context) {
  return new Promise(function(resolve, reject) {
    console.log("signup");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    name = context.state.name;
    photoURL = context.state.photoUrl;
    email = context.state.email;
    idToken = context.state.idToken;
    var raw = JSON.stringify({
      email: email,
      oauthid: idToken,
      name: name,
      photourl: photoURL,
      location: " ",
      bio: " ",
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      credentials: "include",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/signup",
      requestOptions
    )
      .then((result) => {
        if (result.ok) {
          console.log("Signup success.");
          resolve(result.text);
        } else {
          console.log("Signup fail.");
          reject(result.status);
        }
      })
      .catch((error) => console.log("Signup error", error));
  });
}

const LoginPage = (props) => {
  return (
    <View style={styles.swiperSlidesView}>
      <Image source={require("../../../assets/fw_logo.png")} />
      <Text style={styles.loginText}>
        Freeway - Connecting People in Need (PiN) with Volunteers
      </Text>
      <Button
        style={styles.loginBtn}
        onPress={() => {
          props.getGoogleProfile();
        }}
      >
        <Text style={styles.loginBtnText}>Sign In With Google</Text>
      </Button>
    </View>
  );
};

export default Login;
