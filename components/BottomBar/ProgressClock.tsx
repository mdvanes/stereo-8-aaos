import React, { FC, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { BOTTOM_FONT_SIZE } from "../../constants/Layout";
import { PlayContext } from "../context/play-context";
import { ProgressContext } from "../context/progress-context";
import { Text } from "../Themed";

const formatSecToTime = (s: number): string => {
  const ss = s % 60;
  const mm = (s - ss) / 60;
  return `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
};

export const ProgressClock: FC = () => {
  const context = useContext(PlayContext);
  const progressContext = useContext(ProgressContext);

  const getProgress = () => {
    if (context.song) {
      const { duration } = context.song;
      const time =
        duration > 0
          ? `${formatSecToTime(
              Math.floor(progressContext.progress / 1000)
            )} / ${formatSecToTime(duration)}`
          : "";
      return time;
    }
    return "";
  };

  return (
    <View style={styles.progress}>
      {/* {context.song?.img && (
        <Image style={styles.image} source={{ uri: context.song.img }} />
      )} */}
      <Text style={styles.progressText}>{getProgress()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    margin: 0,
  },
  progressText: {
    fontFamily: "sans-serif",
    fontSize: BOTTOM_FONT_SIZE * 0.9,
    fontVariant: ["tabular-nums"],
    textAlign: "center",
  },
});
