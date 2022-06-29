import React, { FC, useEffect, useState } from "react";
import { Audio } from "expo-av";
import { ListItemButton } from "./ListItemButton";
import MediaMeta from "react-native-media-meta";

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
    const metadata = await MediaMeta.get(channelURL);
    // console.log(metadata);
    return JSON.stringify(metadata);
  } catch (err) {
    console.error(err);
    return "No metadata";
  }
};

interface IStationButtonProps {
  channelURL: string;
  channelName: string;
}

export const StationButton: FC<IStationButtonProps> = ({channelName, channelURL}) => {
  const [meta, setMeta] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);

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
    }
  };

  return (
    <ListItemButton
      text={`${channelName}${meta && `: ${meta}`}`}
      title={isPlaying ? "pause" : "play"}
      onClick={onToggle}
    />
  );
};
