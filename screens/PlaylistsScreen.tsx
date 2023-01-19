import { BottomTabBar } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { BottomBar } from "../components/BottomBar/BottomBar";
import EditScreenInfo from "../components/EditScreenInfo";
import { HomeList } from "../components/HomeList/HomeList";
import { Playlists } from "../components/SubsonicButton/Playlists";
import { SongsInPlaylist } from "../components/SubsonicButton/SongsInPlaylist";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function PlaylistsScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Playlists />
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
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
