import React, { useEffect, useRef, useState } from "react";
import { Button, View } from "react-native";
import { Audio } from "expo-av";
import { Text } from "../Themed";
import { styles } from "../item.styles";

const channelUrl = `https://icecast.omroep.nl/radio2-bb-mp3`;

const getMovies = async () => {
  try {
    const response = await fetch("https://reactnative.dev/movies.json");
    const json = await response.json();
    console.log(json);
    //  setData(json.movies);
  } catch (error) {
    console.error(error);
  } finally {
    //  setLoading(false);
  }
};

// TODO extract channelUrl and label to props
export const StationButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);

  const init = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: channelUrl },
      { shouldPlay: false }
    );
    setPbo(playbackObject);
  };

  useEffect(() => {
    init();
    getMovies();
  }, []);

  const onToggle = async () => {
    if (pbo) {
      if (isPlaying) {
        await pbo.pauseAsync();
      } else {
        await pbo.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View style={styles.item}>
      <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        NPO Radio 2
      </Text>
      <Button
        onPress={onToggle}
        title={`${isPlaying ? "Pause" : "Play"} NPO Radio 2`}
      />
    </View>
  );
};
