var Dimensions = require("Dimensions");
var { width } = Dimensions.get("window");
import commonColor from "../../theme/variables/commonColor";

export default {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginTop: 1,
  },
  profileImageView: {
    alignItems: "center",
    marginTop: 25,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  profileDescriptionView: {
    marginTop: 15,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  cityText: {
    fontSize: 15,
    color: commonColor.contentTextColor,
    textAlign: "center",
    padding: 5,
  },
  emailText: {
    fontSize: 15,
    color: commonColor.contentTextColor,
    textAlign: "left",
    padding: 5,
    paddingHorizontal: 15,
  },
  bioText: {
    fontSize: 15,
    color: commonColor.contentTextColor,
    textAlign: "left",
    padding: 5,
    paddingHorizontal: 15,
  },
  settingsBtn: {
    marginTop: 20,
    alignSelf: "center",
  },
  settingsBtnText: {
    color: commonColor.brandPrimary,
    fontWeight: "600",
    fontSize: 14,
  },
  goingOutView: {
    left: 1,
    width: width,
    alignItems: "center",
  },
  goingOutTextView: {
    justifyContent: "center",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
  },
  logoutBtn: {
    width: width / 1.8,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  logoutBtnText: {
    fontSize: 20,
    fontWeight: "800",
  },
};
