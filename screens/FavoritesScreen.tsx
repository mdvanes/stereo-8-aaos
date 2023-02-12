import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { BottomBar } from "../components/BottomBar/BottomBar";
import { Favorites } from "../components/Subsonic/Favorites/Favorites";
import { View } from "../components/Themed";

export const FavoritesScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Favorites />
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
