import { StatusBar, StyleSheet } from "react-native";
import { HEADER_FONT_SIZE, HEADER_ICON_SIZE } from "../constants/Layout";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  item__loading: {
    backgroundColor: "rgba(33,150,243,0.4)",
  },
  item__active: {
    backgroundColor: "rgba(33,150,243,0.2)",
  },
  item__offline: {
    borderRightColor: "#0885ff",
    borderRightWidth: 10,
  },
  title: {
    fontSize: 32,
  },
  col: {
    flex: 3,
  },
  line: {
    fontSize: 24,
    padding: 28,
    marginHorizontal: 16,
    display: "flex",
    width: "100%",
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  item_pressable: {
    display: "flex",
    width: "100%",
  },
  topbarTitle: {
    color: "rgb(229, 229, 231)",
    fontSize: HEADER_FONT_SIZE,
    fontWeight: "500",
    // fontFamily:
    //   ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  logo: {
    width: HEADER_ICON_SIZE,
    height: HEADER_ICON_SIZE,
    marginHorizontal: 15,
  },
});
