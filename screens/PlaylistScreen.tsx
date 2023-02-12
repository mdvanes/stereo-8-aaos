import React from "react";
import { StyleSheet } from "react-native";
import { BottomBarAndBgWrapper } from "../components/BottomBarAndBgWrapper/BottomBarAndBgWrapper";
import { SongsInPlaylist } from "../components/Subsonic/SongsInPlaylist";
import { RootTabScreenProps } from "../types";

export default function PlaylistScreen({
  navigation,
}: RootTabScreenProps<"Playlist">) {
  return (
    <BottomBarAndBgWrapper viewProps={{ style: styles.container }}>
      <SongsInPlaylist />
    </BottomBarAndBgWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    // justifyContent: "center",
    justifyContent: "space-between",
    width: "100%",
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
