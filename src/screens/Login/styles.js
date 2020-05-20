var React = require("react-native");
var { Dimensions } = React;

import commonColor from "../../theme/variables/commonColor";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default {
  swiperDot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 20,
  },
  swiperActiveDot: {
    backgroundColor: commonColor.brandPrimary,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 20,
  },
  swiperSlidesView: {
    flex: 1,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 18,
    color: commonColor.contentTextColor,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
  },
  swiperImageView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  image1: {
    height: deviceHeight / 2.5,
    width: deviceWidth / 1.7,
    marginBottom: 30,
  },
  image: {
    height: deviceHeight / 2,
    width: deviceWidth / 1.7,
  },
  img1: {
    height: deviceHeight / 4,
    width: deviceWidth / 1.7,
  },
  img2: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  loginBtn: {
    alignItems: "center",
    width: deviceWidth - 60,
    alignSelf: "center",
    backgroundColor: "#4285F4",
  },
  loginBtnText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  noteView: {
    marginHorizontal: 30,
    bottom: deviceHeight / 20,
  },
  noteText: {
    color: commonColor.lightTextColor,
    fontSize: 12,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
};
