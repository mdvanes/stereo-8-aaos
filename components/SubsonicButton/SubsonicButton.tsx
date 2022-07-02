import { Audio } from "expo-av";
import React, { FC, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { styles } from "../item.styles";
import { ListItemButton } from "../StationButton/ListItemButton";
import { Text } from "../Themed";
import {
  getAPI,
  getCurrentRemotePlayingId,
  getNowPlaying,
  getPlaylist,
  getPlaylists,
  hasValidSettings,
  IPlaylist,
  ISong,
  SubsonicNowPlaying,
} from "./getSubsonic";

export const SubsonicButton: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);
  const [meta, setMeta] = useState<SubsonicNowPlaying | null>(null);
  const [error, setError] = useState<string>();
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [songs, setSongs] = useState<ISong[]>([]);

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
    setPlaylists(await getPlaylists());
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

  const handlePlaySong = (id: string) => async () => {
    if (pbo) {
      if (isPlaying) {
        await pbo.pauseAsync();
      } else {
        await pbo.unloadAsync();
        // const id = await getCurrentRemotePlayingId();
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

  const handleOpenPlaylist = (id: string) => async () => {
    setPlaylists([]);
    setSongs([]);
    setSongs(await getPlaylist(id));
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
        text={`Random Subsonic: ${
          meta ? `${meta.artist} - ${meta.title}` : "Nothing playing"
        }`}
        title={isPlaying ? "pause" : "play"}
        onClick={onToggle}
      />

      <div>
        {playlists.map((playlist) => (
          <View style={{ padding: 10 }}>
            <Pressable
              onPress={handleOpenPlaylist(playlist.id)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Text
                style={styles.col}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                {playlist.name}
              </Text>
            </Pressable>
          </View>
        ))}
      </div>

      <div style={{ maxHeight: "60vh", overflowY: "scroll" }}>
        {songs.map((song) => (
          <View style={{ padding: 10 }}>
            <Pressable
              onPress={handlePlaySong(song.id)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Text
                style={styles.col}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                {song.artist} - {song.title}
              </Text>
            </Pressable>
          </View>
        ))}
      </div>

      {/* <ListItemButton
        text={`Playlist Subsonic: ${
          meta ? `${meta.artist} - ${meta.title}` : "Nothing playing"
        }`}
        title={isPlaying ? "pause" : "play"}
        onClick={onTogglePlaylist}
      /> */}
    </>
  );
};
