import { Audio } from "expo-av";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  SafeAreaView,
  SectionList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
// import { styles } from "../item.styles";
import { ListItemButton } from "../StationButton/ListItemButton";
import { Text } from "../Themed";
import useColorScheme from "../../hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { PlayContext } from "../context/play-context";
import { StationButton } from "../StationButton/StationButton";

export const BottomBar: FC = () => {
  const colorScheme = useColorScheme();
  const context = useContext(PlayContext);

  return (
    <View style={styles.top}>
      <View style={styles.leftAction}>
        <StationButton
          channelName="NPO Radio 2"
          channelURL="https://icecast.omroep.nl/radio2-bb-mp3"
        />
        {/* <Pressable
          onPress={() => {
            context.setTitle("Playing NPO Radio 2");
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name="play-circle"
            size={25}
            color={Colors[colorScheme].text}
            style={{ marginRight: 15 }}
          />
        </Pressable> */}
      </View>
      <View style={styles.status}>
        <Text
        // style={styles.header}
        >
          Now playing... {context.title}
        </Text>
        <Text
        // style={styles.header}
        >
          Artist...
        </Text>
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
  status: { flex: 1, padding: "0.5rem" },
  rightAction: {
    padding: "1.5rem",
  },
});
