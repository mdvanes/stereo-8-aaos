import React, { FC } from "react";
import { BottomBarAndBgWrapper } from "../components/BottomBarAndBgWrapper/BottomBarAndBgWrapper";
import { RadioTab } from "../components/RadioTab/RadioTab";

export const RadioScreen: FC = () => {
  return (
    <BottomBarAndBgWrapper>
      <RadioTab />
    </BottomBarAndBgWrapper>
  );
};
