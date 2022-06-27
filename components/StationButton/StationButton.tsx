import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { ListItemButton } from "./ListItemButton";

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
    <ListItemButton
      text="NPO Radio 2"
      title={isPlaying ? "pause" : "play"}
      onClick={onToggle}
    />
  );
};
