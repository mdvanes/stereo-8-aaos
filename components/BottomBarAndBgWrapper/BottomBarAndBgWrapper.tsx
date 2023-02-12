import { FC, useContext } from "react";
import { BottomBar } from "../BottomBar/BottomBar";
import { PlayContext } from "../context/play-context";
import { View, ViewProps } from "../Themed";
import { ConditionalImageBackground } from "./ConditionalImageBackground";

export const BottomBarAndBgWrapper: FC<{ viewProps?: ViewProps }> = ({
  viewProps,
  children,
}) => {
  const context = useContext(PlayContext);

  return (
    <View {...viewProps}>
      <ConditionalImageBackground img={context.song?.img}>
        {children}
      </ConditionalImageBackground>
      <BottomBar />
    </View>
  );
};
