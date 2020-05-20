var React = require("react-native");
var { Platform } = React;

import commonColor from "../../theme/variables/commonColor";

export default {
  tabs: {
    backgroundColor: "#FFF",
    height: Platform.OS === "android" ? 55 : 70,
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? 15 : 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10
  },
  iconBtn: {
    backgroundColor: "#D9E0E4",
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7
  },
  activeIcon: {
    color: commonColor.brandPrimary
  },
  inActiveIcon: {
    color: "#D9E0E4"
  }
};
