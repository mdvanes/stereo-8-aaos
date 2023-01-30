import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { BottomBar } from "../components/BottomBar/BottomBar";
import { Library } from "../components/Subsonic/Library/Library";
import { View } from "../components/Themed";

export const LibraryScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Library />
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
});
