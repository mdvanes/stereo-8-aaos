import { Button, FlatList, View, StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    // backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: 32,
  },
  col: {
    flex: 3,
  },
  line: {
    fontSize: 24,
  },
  topbarTitle: {
    color: "rgb(229, 229, 231)",
    fontSize: 36,
    fontWeight: "500",
    // fontFamily:
    //   ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
});
