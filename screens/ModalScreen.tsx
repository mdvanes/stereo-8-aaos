import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import Settings from "../components/Settings/Settings";
import { View } from "../components/Themed";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      {/* TODO restore: <Text style={styles.title}>Subsonic</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <Settings path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
