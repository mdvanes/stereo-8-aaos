import React from "react";
import { BottomBarAndBgWrapper } from "../components/BottomBarAndBgWrapper/BottomBarAndBgWrapper";
import { SongsInPlaylist } from "../components/Subsonic/SongsInPlaylist";
import { RootTabScreenProps } from "../types";

export default function PlaylistScreen({
  navigation,
}: RootTabScreenProps<"Playlist">) {
  return (
    <BottomBarAndBgWrapper>
      <SongsInPlaylist />
    </BottomBarAndBgWrapper>
  );
}
