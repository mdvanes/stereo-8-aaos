import React, { FC, useContext, useEffect, useState } from "react";
import { PlayContext } from "../context/play-context";
import {
  getAPI,
  getCoverArtUrl,
  getCurrentRemotePlayingId,
  getNowPlaying,
  hasValidSettings,
} from "../Subsonic/getSubsonic";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Text, View } from "react-native";
import { useGetNextSong } from "./useGetNextSong";
import { ProgressContext } from "../context/progress-context";
import { useDispatch } from "react-redux";
import { setIsRadioPlaying } from "../StationButton/radioSlice";

const fallbackUrl = "https://icecast.omroep.nl/radio2-bb-mp3";

export const SoundWrapper: FC = () => {
  const context = useContext(PlayContext);
  const progressContext = useContext(ProgressContext);
  const { getNextSong } = useGetNextSong();
  const [error, setError] = useState<string>();
  const dispatch = useDispatch();

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log("error");
      }
      return;
    } else {
      if (playbackStatus.isPlaying) {
        progressContext.setProgress(playbackStatus.positionMillis);
      }
      if (playbackStatus.didJustFinish) {
        const nextSong = getNextSong();
        if (nextSong) {
          context.setStartSongId(nextSong.id);
        }
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
    playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    context.setPbo(playbackObject);
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

  const handlePlaySong = async () => {
    if (context.pbo && context.startSongId) {
      dispatch(setIsRadioPlaying(false));
      await context.pbo.unloadAsync();
      await context.pbo.loadAsync({
        uri: getAPI("stream", `&id=${context.startSongId}`),
      });
      await context.pbo.playAsync();

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
            img: newMeta.coverArt
              ? getCoverArtUrl({ id: newMeta.coverArt })
              : undefined,
            isDir: false,
          });
        }
      }, 500);
    }
  };

  useEffect(() => {
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
