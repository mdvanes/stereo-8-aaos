import React, { FC } from "react";
import { BottomBarAndBgWrapper } from "../components/BottomBarAndBgWrapper/BottomBarAndBgWrapper";
import { Library } from "../components/Subsonic/Library/Library";

export const LibraryScreen: FC = () => {
  return (
    <BottomBarAndBgWrapper>
      <Library />
    </BottomBarAndBgWrapper>
  );
};
