import React, { FC, useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { PlayContext } from "../context/play-context";
import { StationButton } from "../StationButton/StationButton";
import { Text } from "../Themed";
import { useGetNextSong } from "../SoundWrapper/useGetNextSong";
import { BOTTOM_FONT_SIZE, HEADER_ICON_SIZE } from "../../constants/Layout";
import { getSettings, IRadioSetting, ISettings } from "../../getSettings";

const formatSecToTime = (s: number): string => {
  const ss = s % 60;
  const mm = (s - ss) / 60;
  return `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
};

export const BottomBar: FC = () => {
  const colorScheme = useColorScheme();
  const { getNextSong } = useGetNextSong();
  const context = useContext(PlayContext);
  const [radioSetting, setRadioSetting] = useState<IRadioSetting>();

  useEffect(() => {
    const run = async () => {
      const settings: ISettings = await getSettings();
      if (settings.radio && settings.radio.length > 0) {
        setRadioSetting(settings.radio[0]);
      }
    };
    run();
  }, []);

  const getByline = () => {
    if (context.song) {
      const { artist } = context.song;
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

  const handleNext = () => {
    const nextSong = getNextSong();
    if (nextSong) {
      context.setStartSongId(nextSong.id);
    }
  };

  console.log(context.song?.img);

  return (
    <View style={styles.top}>
      <View style={styles.leftAction}>
        {radioSetting && <StationButton config={radioSetting} />}
      </View>
      <View style={styles.status}>
        <Text style={styles.statusH1}>{context.song?.title || ""}</Text>
        <Text style={styles.statusH2}>{getByline()}</Text>
      </View>
      <View style={styles.progress}>
        {context.song?.img && (
          <Image style={styles.image} source={{ uri: context.song.img }} />
        )}
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
  image: {
    width: HEADER_ICON_SIZE * 1.67,
    height: HEADER_ICON_SIZE * 1.67,
    marginHorizontal: 15,
  },
  rightAction: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
