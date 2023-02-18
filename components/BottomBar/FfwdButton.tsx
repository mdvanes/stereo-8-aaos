import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";
import useColorScheme from "../../hooks/useColorScheme";
import { PlayContext } from "../context/play-context";
import { useGetNextSong } from "../SoundWrapper/useGetNextSong";

export const FfwdButton: FC = () => {
  const colorScheme = useColorScheme();
  const { getNextSong } = useGetNextSong();
  const context = useContext(PlayContext);

  const handleNext = () => {
    const nextSong = getNextSong();
    if (nextSong) {
      context.setStartSongId(nextSong.id);
    }
  };

  return (
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
};

const styles = StyleSheet.create({
  rightAction: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
