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
});
