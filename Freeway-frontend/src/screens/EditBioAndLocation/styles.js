import { Platform } from "react-native";
import commonColor from "../../theme/variables/commonColor";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

export default {
  userNameText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  logoutBtn: {
    width: width / 4,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  logoutBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
  distanceText: {
    fontSize: 12,
    color: commonColor.lightTextColor,
  },
  instagramPhotosCarousel: {
    height: height / 1.5,
    justifyContent: "space-between",
    borderBottomColor: "rgba(0,0,0,0.3)",
    borderBottomWidth: 0.8,
    backgroundColor: "white",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  slideView: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: height / 1.5,
    width: width,
  },
  input: {
    margin: 15,
    height: 100,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  inputLoc: {
    margin: 15,
    height: 50,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtnIcon: {
    backgroundColor: "#000000",
    alignSelf: "center",
    width: 20,
  },
  subTextView: {
    backgroundColor: "white",
    width: width,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  nameText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  workingText: {
    color: "rgba(0,0,0,0.75)",
  },
  distanceAwayText: {
    fontSize: 12,
    color: commonColor.lightTextColor,
    fontWeight: "bold",
    paddingTop: 3,
  },
  quoteView: {
    padding: 15,
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  quoteText: {
    color: "#444",
  },
  instagramPhotoCountView: {
    backgroundColor: "white",
    padding: 15,
  },
  swiperPaginationStyle: {
    position: "absolute",
    width: Platform.OS === "android" ? width : width - 30,
    justifyContent: Platform.OS === "android" ? "center" : "flex-end",
    alignSelf: Platform.OS === "android" ? "center" : "flex-end",
    height: 30,
    top: Platform.OS === "android" ? undefined : -39,
    bottom: Platform.OS === "android" ? 10 : undefined,
    right: Platform.OS === "android" ? 0 : 20,
  },
  thumbnailDot: {
    width: Platform.OS === "android" ? 10 : 6,
    height: Platform.OS === "android" ? 10 : 6,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  instagramCarouselView: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 5,
  },
  thumbnail: {
    width: width / 3 - 15,
    height: width / 3 - 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  interestTextHeadingView: {
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "white",
  },
  interestsView: {
    flexDirection: "row",
    backgroundColor: "white",
    flexWrap: "wrap",
    padding: 13,
    paddingBottom: 80,
  },
  interestTextView: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FC432F",
    height: 50,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  interestText: {
    color: "#F7524C",
    margin: 10,
  },
  bottomPillsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    position: "absolute",
    bottom: 0,
  },
  bottomRowStyle: {
    justifyContent: "space-around",
    padding: 18,
    paddingVertical: 10,
  },
  bottomRoundedPillsBtn: {
    borderRadius: 27.5,
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomRoundedPillsCloseIcon: {
    fontSize: 30,
    marginLeft: -1,
    marginRight: -1,
  },
  bottomRoundedPillsStarIcon: {
    fontSize: 30,
    marginLeft: -1,
    marginRight: -1,
  },
  bottomRoundedPillsHeartIcon: {
    fontSize: 30,
    marginLeft: -1,
    marginRight: -2,
    top: 1,
  },
};
