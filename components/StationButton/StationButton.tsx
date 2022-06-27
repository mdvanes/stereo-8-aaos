import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-native";
import { Audio } from "expo-av";
import { Text } from "../Themed";
import { getSubsonic } from "./getSubsonic";
import { MyList } from "./MyList";

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
  const audioRef = useRef<HTMLAudioElement>(null);
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
    getSubsonic();
  }, []);

  const onToggle = async () => {
    if (pbo) {
      if (isPlaying) {
        await pbo.pauseAsync();
      } else {
        //   elem.src = `${channelUrl}?${Date.now()}`;
        await pbo.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <Button onPress={onToggle} title="Play NPO Radio 2" />
      <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        {isPlaying ? "PLAYING" : "STOPPED"}
      </Text>
      <MyList />
    </>
  );
};
