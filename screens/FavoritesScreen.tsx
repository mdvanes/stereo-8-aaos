import React, { FC } from "react";
import { BottomBarAndBgWrapper } from "../components/BottomBarAndBgWrapper/BottomBarAndBgWrapper";
import { Favorites } from "../components/Subsonic/Favorites/Favorites";

export const FavoritesScreen: FC = () => {
  return (
    <BottomBarAndBgWrapper>
      <Favorites />
    </BottomBarAndBgWrapper>
  );
};
