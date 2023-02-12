import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { BottomBarAndBgWrapper } from "../components/BottomBarAndBgWrapper/BottomBarAndBgWrapper";
import { Library } from "../components/Subsonic/Library/Library";

export const LibraryScreen: FC = () => {
  return (
    <BottomBarAndBgWrapper viewProps={{ style: styles.container }}>
      <Library />
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
