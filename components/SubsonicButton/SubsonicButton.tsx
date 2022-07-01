import React, { FC, useEffect, useState } from "react";
import { Audio } from "expo-av";
import { ListItemButton } from "../StationButton/ListItemButton";
import {
  getAPI,
  getCurrentRemotePlayingId,
  getNowPlaying,
  getPlaylists,
  hasValidSettings,
  SubsonicNowPlaying,
} from "./getSubsonic";

export const SubsonicButton: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);
  const [meta, setMeta] = useState<SubsonicNowPlaying | null>(null);
  const [error, setError] = useState<string>();

  const init = async () => {
    const id = await getCurrentRemotePlayingId();
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: getAPI("stream", `&id=${id}`) },
      { shouldPlay: false }
    );
    setPbo(playbackObject);
  };

  useEffect(() => {
    if (!hasValidSettings()) {
      setError("Settings not complete");
    }
    init();
  }, []);

  const onToggle = async () => {
    if (pbo) {
      if (isPlaying) {
        await pbo.pauseAsync();
      } else {
        await pbo.unloadAsync();
        const id = await getCurrentRemotePlayingId();
        await pbo.loadAsync({ uri: getAPI("stream", `&id=${id}`) });
        await pbo.playAsync();
      }
      setIsPlaying(!isPlaying);
      setTimeout(async () => {
        const newMeta = await getNowPlaying({ remote: false });
        setMeta(newMeta);
      }, 500);
    }
  };

  const onTogglePlaylist = async () => {
    if (pbo) {
      if (isPlaying) {
        await pbo.pauseAsync();
      } else {
        await pbo.unloadAsync();
        const id = await getPlaylists();
        await pbo.loadAsync({ uri: getAPI("stream", `&id=${id}`) });
        await pbo.playAsync();
      }
      setIsPlaying(!isPlaying);
      setTimeout(async () => {
        const newMeta = await getNowPlaying({ remote: false });
        setMeta(newMeta);
      }, 500);
    }
  };

  if (error) {
    return (
      <ListItemButton
        text={`ERROR: ${error}`}
        title={"bug"}
        onClick={() => {}}
      />
    );
  }

  return (
    <>
      <ListItemButton
        text={`Playlist Subsonic: ${
          meta ? `${meta.artist} - ${meta.title}` : "Nothing playing"
        }`}
        title={isPlaying ? "pause" : "play"}
        onClick={onTogglePlaylist}
      />
      <ListItemButton
        text={`Random Subsonic: ${
          meta ? `${meta.artist} - ${meta.title}` : "Nothing playing"
        }`}
        title={isPlaying ? "pause" : "play"}
        onClick={onToggle}
      />
    </>
  );
};
