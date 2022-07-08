import { BottomTabBar } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { BottomBar } from "../components/BottomBar/BottomBar";

import EditScreenInfo from "../components/EditScreenInfo";
import { HomeList } from "../components/HomeList/HomeList";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Stereo 8</Text> */}
      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      <HomeList />
      <BottomBar />
      {/* <BottomTabBar>

      </BottomTabBar> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
