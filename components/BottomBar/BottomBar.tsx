import React, { FC, useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
// import { styles } from "../item.styles";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { PlayContext } from "../context/play-context";
import { StationButton } from "../StationButton/StationButton";
import { Text } from "../Themed";
import { useGetNextSong } from "../SoundWrapper/useGetNextSong";
import { BOTTOM_FONT_SIZE, HEADER_ICON_SIZE } from "../../constants/Layout";

const formatSecToTime = (s: number): string => {
  const ss = s % 60;
  const mm = (s - ss) / 60;
  return `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
};

export const BottomBar: FC = () => {
  const colorScheme = useColorScheme();
  const { getNextSong } = useGetNextSong();
  const context = useContext(PlayContext);
  //   const [progress, setProgress] = useState(0);
  //   const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();

  const getByline = () => {
    if (context.song) {
      const { artist, album } = context.song;
      //   if (album) {
      //     return `${artist} (${album})`;
      //   }
      return artist;
    }
    return "";
  };

  const getProgress = () => {
    if (context.song) {
      const { duration } = context.song;
      const time =
        duration > 0
          ? `${formatSecToTime(
              Math.floor(context.progress / 1000)
            )} / ${formatSecToTime(duration)}`
          : "";
      return time;
    }
    return "";
  };

  const handlePlayPause = async () => {
    if (context.pbo && context.startSongId) {
      context.setIsRadioPlaying(false);
      if (context.isPlaying || context.isRadioPlaying) {
        await context.pbo.pauseAsync();
      } else {
        await context.pbo.playAsync();
      }
      context.setIsPlaying(!context.isPlaying);
    }
  };

  //   useEffect(() => {
  //     if (context.isPlaying) {
  //       const interval = setInterval(() => {
  //         setProgress((old) => old + 1);
  //       }, 1000);
  //       setTimer(interval);
  //     } else {
  //       clearInterval(timer);
  //     }
  //   }, [context.isPlaying]);

  //   useEffect(() => {
  //     clearInterval(timer);
  //     setProgress(0);
  //   }, [context.startSongId]);

  const handleNext = () => {
    const nextSong = getNextSong();
    if (nextSong) {
      context.setStartSongId(nextSong.id);
    }
  };

  return (
    <View style={styles.top}>
      <View style={styles.leftAction}>
        <StationButton
          channelName="NPO Radio 2"
          channelURL="https://icecast.omroep.nl/radio2-bb-mp3"
        />
      </View>
      <View style={styles.status}>
        <Text style={styles.statusH1}>{context.song?.title || ""}</Text>
        <Text style={styles.statusH2}>{getByline()}</Text>
      </View>
      <View style={styles.progress}>
        <Text
          style={{
            fontFamily: "sans-serif",
            fontSize: BOTTOM_FONT_SIZE,
            fontVariant: ["tabular-nums"],
          }}
        >
          {getProgress()}
        </Text>
      </View>
      <View style={styles.rightAction}>
        <Pressable
          onPress={handleNext}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name={"arrow-right"}
            size={HEADER_ICON_SIZE}
            color={Colors[colorScheme].text}
            style={{ marginRight: 15 }}
          />
        </Pressable>
      </View>
      <View style={styles.rightAction}>
        <Pressable
          onPress={handlePlayPause}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name={context.isPlaying ? "pause" : "play"}
            size={HEADER_ICON_SIZE}
            color={Colors[colorScheme].text}
            style={{ marginRight: 15 }}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    backgroundColor: "#121212",
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  leftAction: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  status: {
    flex: 1,
    padding: 7,
    color: "rgb(229, 229, 231)",
    fontWeight: "500",
    // fontFamily:
    //   ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  statusH1: {
    fontSize: BOTTOM_FONT_SIZE * 1.145,
    paddingTop: 7,
    paddingBottom: 0,
  },
  statusH2: {
    fontSize: BOTTOM_FONT_SIZE,
    fontStyle: "italic",
    paddingTop: 0,
  },
  progress: {
    // padding: 7,
    fontFamily: "monospace",
    fontSize: 28,
    justifyContent: "center",
  },
  rightAction: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
