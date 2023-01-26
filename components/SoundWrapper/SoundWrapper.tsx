import React, { FC, useContext, useEffect, useState } from "react";
import { PlayContext } from "../context/play-context";
import {
  getAPI,
  getCurrentRemotePlayingId,
  getNowPlaying,
  hasValidSettings,
} from "../Subsonic/getSubsonic";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Text, View } from "react-native";
import { useGetNextSong } from "./useGetNextSong";

const fallbackUrl = "https://icecast.omroep.nl/radio2-bb-mp3";

// TODO clean up this file
export const SoundWrapper: FC = () => {
  const context = useContext(PlayContext);
  const { getNextSong } = useGetNextSong();
  const [error, setError] = useState<string>();

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log("error");
      }
      return;
    } else {
      if (playbackStatus.isPlaying) {
        context.setProgress(playbackStatus.positionMillis);
        // const nextSong = getNextSong();
        // console.log("next:", nextSong);
      }
      if (playbackStatus.didJustFinish) {
        // console.log("finished song");
        const nextSong = getNextSong();
        if (nextSong) {
          // console.log("next:", nextSong);
          context.setStartSongId(nextSong.id);
        }
        // playNext();
      }
    }
  };

  const init = async () => {
    context.setIsLoading(true);
    const id = await getCurrentRemotePlayingId();

    // createAsync must initialize with a valid uri!
    const uri = id ? getAPI("stream", `&id=${id}`) : fallbackUrl;

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });

    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false, progressUpdateIntervalMillis: 800 }
    );
    // playbackObject.setProgressUpdateIntervalAsync();
    playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    context.setPbo(playbackObject);
    // const pid = context.playlist?.id;
    // if (pid) {
    //   setSongs(await getPlaylist(pid));
    // }
    context.setIsLoading(false);
  };

  useEffect(() => {
    // Rebind with new values for context.queue
    context.pbo?.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }, [context.queue, context.startSongId]);

  useEffect(() => {
    if (!hasValidSettings()) {
      setError("Settings not complete");
    }
    init();
  }, []);

  // const playNext = () => {
  //   console.log("start play next");
  //   if (context.queue) {
  //     const nextIndex =
  //       (context.queue?.findIndex(
  //         (queueItem) => queueItem.id === context.startSongId
  //       ) ?? -1) + 1;
  //     const nextSong =
  //       context.queue.length > nextIndex + 1
  //         ? context.queue[nextIndex]
  //         : context.queue[0];
  //     console.log("next song:", nextSong);
  //     context.setStartSongId(nextSong.id);
  //   }
  // };

  const handlePlaySong = async () => {
    if (context.pbo && context.startSongId) {
      context.setIsRadioPlaying(false);
      //   if (context.isPlaying) {
      //     // console.log("pause!");
      //     await context.pbo.pauseAsync();
      //   } else {
      // console.log("play!");
      await context.pbo.unloadAsync();
      await context.pbo.loadAsync({
        uri: getAPI("stream", `&id=${context.startSongId}`),
      });
      await context.pbo.playAsync();
      //   }
      context.setIsPlaying(!context.isPlaying);
      setTimeout(async () => {
        const newMeta = await getNowPlaying({ remote: false });
        if (newMeta && newMeta.id) {
          context.setIsPlaying(true);
          context.setSong({
            id: newMeta.id,
            artist: newMeta.artist,
            title: newMeta.title,
            album: newMeta.album,
            duration: newMeta.duration,
          });
        }
      }, 500);
    }
  };

  useEffect(() => {
    // console.log(context);
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
