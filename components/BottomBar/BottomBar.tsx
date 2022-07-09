import React, { FC, useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
// import { styles } from "../item.styles";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { PlayContext } from "../context/play-context";
import { StationButton } from "../StationButton/StationButton";
import { Text } from "../Themed";

export const BottomBar: FC = () => {
  const colorScheme = useColorScheme();
  const context = useContext(PlayContext);

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

  return (
    <View style={styles.top}>
      <View style={styles.leftAction}>
        <StationButton
          channelName="NPO Radio 2"
          channelURL="https://icecast.omroep.nl/radio2-bb-mp3"
        />
      </View>
      <View style={styles.status}>
        <Text style={styles.statusH1}>
          {context.song?.title || "Now playing..."}
        </Text>
        <Text style={styles.statusH2}>{getByline()}</Text>
      </View>
      <View style={styles.rightAction}>
        <Pressable
          // onPress={() => navigation.navigate("Modal")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name="play"
            size={25}
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
    padding: "1.5rem",
  },
  status: {
    flex: 1,
    padding: "0.5rem",
    color: "rgb(229, 229, 231)",
    fontWeight: "500",
    fontFamily:
      ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  statusH1: {
    fontSize: 18,
    paddingTop: "0.5rem",
    paddingBottom: 0,
  },
  statusH2: {
    fontSize: 14,
    paddingTop: 0,
  },
  rightAction: {
    padding: "1.5rem",
  },
});
