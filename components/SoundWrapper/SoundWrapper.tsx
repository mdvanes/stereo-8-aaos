import React, { FC, useContext, useEffect, useState } from "react";
import { PlayContext } from "../context/play-context";
import {
  getAPI,
  getCurrentRemotePlayingId,
  getNowPlaying,
  hasValidSettings,
} from "../SubsonicButton/getSubsonic";
import { Audio } from "expo-av";
import { Text, View } from "react-native";

export const SoundWrapper: FC = () => {
  const context = useContext(PlayContext);
//   const [pbo, setPbo] = useState<Audio.Sound | null>(null);
  const [error, setError] = useState<string>();

  const init = async () => {
    context.setIsLoading(true);
    const id = await getCurrentRemotePlayingId();
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: getAPI("stream", `&id=${id}`) },
      { shouldPlay: false }
    );
    context.setPbo(playbackObject);
    // const pid = context.playlist?.id;
    // if (pid) {
    //   setSongs(await getPlaylist(pid));
    // }
    context.setIsLoading(false);
  };

  useEffect(() => {
    if (!hasValidSettings()) {
      setError("Settings not complete");
    }
    init();
  }, []);

  const handlePlaySong = async () => {
    if (context.pbo && context.startSongId) {
      if (context.isPlaying) {
        console.log("pause!");
        await context.pbo.pauseAsync();
      } else {
        console.log("play!");
        await context.pbo.unloadAsync();
        await context.pbo.loadAsync({
          uri: getAPI("stream", `&id=${context.startSongId}`),
        });
        await context.pbo.playAsync();
      }
      context.setIsPlaying(!context.isPlaying);
      setTimeout(async () => {
        const newMeta = await getNowPlaying({ remote: false });
        // setMeta(newMeta);
        if (newMeta && newMeta.id && newMeta.artist && newMeta.title) {
          context.setIsPlaying(true);
          context.setSong({
            id: newMeta.id,
            artist: newMeta.artist,
            title: newMeta.title,
            album: newMeta.album,
          });
        }
      }, 500);
    }
  };

  useEffect(() => {
    console.log(context);
    handlePlaySong();
  }, [context.startSongId]);

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return <></>;
};
