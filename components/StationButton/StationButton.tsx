import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { ListItemButton } from "./ListItemButton";
// @ts-expect-error
import MediaMeta from "react-native-media-meta";

const channelUrl = `https://icecast.omroep.nl/radio2-bb-mp3`;

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

const getMediaMeta = async (): Promise<string> => {
  try {
    const metadata = await MediaMeta.get(channelUrl);
    // console.log(metadata);
    return metadata;
  } catch (err) {
    // console.error(err);
    return "No metadata";
  }
  // .then((metadata: any) => console.log(metadata))
  // .catch((err: any) => console.error(err));
};

// TODO extract channelUrl and label to props
export const StationButton = () => {
  const [meta, setMeta] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);

  const init = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: channelUrl },
      { shouldPlay: false }
    );
    setPbo(playbackObject);
    const newMeta = await getMediaMeta();
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
      text={`NPO Radio 2${meta && `: ${meta}`}`}
      title={isPlaying ? "pause" : "play"}
      onClick={onToggle}
    />
  );
};
