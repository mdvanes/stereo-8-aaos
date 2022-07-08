import React, { FC, useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import { ListItemButton } from "./ListItemButton";
import {
  Button,
  FlatList,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { Text } from "../Themed";
import { styles } from "../item.styles";
// import MediaMeta from "react-native-media-meta";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { PlayContext } from "../context/play-context";

// const getMovies = async () => {
//   try {
//     const response = await fetch("https://reactnative.dev/movies.json");
//     const json = await response.json();
//     console.log(json);
//     //  setData(json.movies);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     //  setLoading(false);
//   }
// };

const getMediaMeta = async (channelURL: string): Promise<string> => {
  try {
    // console.log(MediaMeta.get(channelUrl));
    // return "";
    // const metadata = await MediaMeta.get(channelURL);
    // console.log(metadata);
    return ""; // JSON.stringify(metadata);
  } catch (err) {
    console.error(err);
    return "No metadata";
  }
};

interface IStationButtonProps {
  channelURL: string;
  channelName: string;
}

export const StationButton: FC<IStationButtonProps> = ({
  channelName,
  channelURL,
}) => {
  const [meta, setMeta] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);
  const colorScheme = useColorScheme();
  const context = useContext(PlayContext);

  const init = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: channelURL },
      { shouldPlay: false }
    );
    playbackObject.setOnMetadataUpdate((title) => {
      setMeta(`pbometa ${title}`);
    });
    setPbo(playbackObject);
    const newMeta = await getMediaMeta(channelURL);
    setMeta(newMeta);
  };

  useEffect(() => {
    init();
    // getMovies();
  }, []);

  const onToggle = async () => {
    if (pbo) {
      if (isPlaying) {
        await pbo.pauseAsync();
      } else {
        await pbo.playAsync();
      }
      setIsPlaying(!isPlaying);
      context.setTitle(channelName);
    }
  };

  // return (
  //   <ListItemButton
  //     text={`${channelName}${meta && `: ${meta}`}`}
  //     title={isPlaying ? "pause" : "play"}
  //     onClick={onToggle}
  //   />
  // );

  return (
    <View
    // style={styles.item}
    >
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={25}
          color={Colors[colorScheme].text}
        />
      </Pressable>
    </View>
  );
};
