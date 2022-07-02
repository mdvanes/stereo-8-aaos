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
  getPlaylists1,
  hasValidSettings,
  SubsonicNowPlaying,
} from "./getSubsonic";

export const SubsonicButton: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);
  const [meta, setMeta] = useState<SubsonicNowPlaying | null>(null);
  const [error, setError] = useState<string>();
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);

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
    setPlaylists(await getPlaylists1());
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

      <ul style={{ color: "white" }}>
        {playlists.map((playlist: any) => (
          <li>
            <View>
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
          </li>
        ))}
      </ul>

      <ul style={{ color: "white" }}>
        {songs.map((song: any) => (
          <li>
            <View>
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
                  {song.title}
                </Text>
              </Pressable>
            </View>
          </li>
        ))}
      </ul>

      <ListItemButton
        text={`Playlist Subsonic: ${
          meta ? `${meta.artist} - ${meta.title}` : "Nothing playing"
        }`}
        title={isPlaying ? "pause" : "play"}
        onClick={onTogglePlaylist}
      />
    </>
  );
};
