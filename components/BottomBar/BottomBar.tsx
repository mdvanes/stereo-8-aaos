import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { BOTTOM_FONT_SIZE, HEADER_ICON_SIZE } from "../../constants/Layout";
import useColorScheme from "../../hooks/useColorScheme";
import { RootState } from "../../store/store";
import { PlayContext } from "../context/play-context";
import { useGetNextSong } from "../SoundWrapper/useGetNextSong";
import { setIsRadioPlaying } from "../StationButton/radioSlice";
import { StationButton } from "../StationButton/StationButton";
import { Text } from "../Themed";
import { ProgressClock } from "./ProgressClock";

export const BottomBar: FC = () => {
  const colorScheme = useColorScheme();
  const { getNextSong } = useGetNextSong();
  const context = useContext(PlayContext);
  const isRadioPlaying = useSelector(
    (state: RootState) => state.radio.isRadioPlaying
  );
  const dispatch = useDispatch();

  const getByline = () => {
    if (context.song) {
      const { artist } = context.song;
      return artist;
    }
    return "";
  };

  const handlePlayPause = async () => {
    if (context.pbo && context.startSongId) {
      dispatch(setIsRadioPlaying(false));
      if (context.isPlaying || isRadioPlaying) {
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

  const ffwdView = (
    <View style={styles.rightAction}>
      <Pressable
        onPress={handleNext}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome
          name="forward"
          size={HEADER_ICON_SIZE}
          color={Colors[colorScheme].text}
          style={{ marginRight: 15 }}
        />
      </Pressable>
    </View>
  );

  const playView = (
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
  );

  const broadcastInfo = [context.song?.broadcastTitle, context.song?.presenters]
    .filter((n) => n && n.length > 0)
    .join(" - ")
    .slice(0, 100);

  return (
    <View style={styles.top}>
      <View style={styles.leftAction}>
        {context.radioSetting && <StationButton />}
      </View>

      <View style={styles.status}>
        <Text style={styles.statusH1}>
          {(context.song?.title || "").slice(0, 70)}
        </Text>
        <Text style={styles.statusH2}>{getByline().slice(0, 70)}</Text>
        {Boolean(broadcastInfo) && (
          <Text style={styles.statusH3}>{broadcastInfo}</Text>
        )}
      </View>

      <View>
        <ProgressClock />
        <View style={{ flexDirection: "row" }}>
          {ffwdView}
          {playView}
        </View>
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
    alignItems: "flex-end",
  },
  leftAction: {
    padding: 20,
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
  statusH3: {
    fontSize: BOTTOM_FONT_SIZE * 0.5,
    paddingTop: 0,
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
