import React from "react";
import { BottomBarAndBgWrapper } from "../components/BottomBarAndBgWrapper/BottomBarAndBgWrapper";
import { Playlists } from "../components/Subsonic/Playlists";
import { RootTabScreenProps } from "../types";

export default function PlaylistsScreen({
  navigation,
}: RootTabScreenProps<"Playlists">) {
  return (
    <BottomBarAndBgWrapper>
      <Playlists />
    </BottomBarAndBgWrapper>
  );
}
