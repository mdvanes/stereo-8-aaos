import { Button, FlatList, View, StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    display: "flex",
    flexDirection: "row",
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
    borderBottomWidth: 1
  },
  item_pressable: {
    display: "flex",
    width: "100%",
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
    marginHorizontal: 15,
  },
});
