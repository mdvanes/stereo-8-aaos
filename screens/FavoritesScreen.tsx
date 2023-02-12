import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { BottomBarAndBgWrapper } from "../components/BottomBarAndBgWrapper/BottomBarAndBgWrapper";
import { Favorites } from "../components/Subsonic/Favorites/Favorites";

export const FavoritesScreen: FC = () => {
  return (
    <BottomBarAndBgWrapper viewProps={{ style: styles.container }}>
      <Favorites />
    </BottomBarAndBgWrapper>
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
