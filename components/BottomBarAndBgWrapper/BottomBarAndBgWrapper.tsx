import { FC, useContext } from "react";
import { BottomBar } from "../BottomBar/BottomBar";
import { PlayContext } from "../context/play-context";
import { View, ViewProps } from "../Themed";
import { ConditionalImageBackground } from "./ConditionalImageBackground";
import { StyleSheet } from "react-native";

export const BottomBarAndBgWrapper: FC<{ viewProps?: ViewProps }> = ({
  viewProps,
  children,
}) => {
  const context = useContext(PlayContext);

  return (
    <View {...viewProps} style={[styles.container, viewProps?.style]}>
      <ConditionalImageBackground img={context.song?.img}>
        {children}
      </ConditionalImageBackground>
      <BottomBar />
    </View>
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
