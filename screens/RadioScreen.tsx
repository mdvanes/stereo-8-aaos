import React, { FC } from "react";
import { BottomBarAndBgWrapper } from "../components/BottomBarAndBgWrapper/BottomBarAndBgWrapper";
import { styles } from "../components/item.styles";
import { RadioTab } from "../components/RadioTab/RadioTab";

export const RadioScreen: FC = () => {
  return (
    <BottomBarAndBgWrapper viewProps={{ style: styles.container }}>
      <RadioTab />
    </BottomBarAndBgWrapper>
  );
};
