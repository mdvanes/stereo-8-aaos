import { Audio } from "expo-av";
import React, { FC, useEffect, useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  SafeAreaView,
  SectionList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
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
import useColorScheme from "../../hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const Item = ({
  id,
  artist,
  title,
  onClick,
}: ISong & { onClick: (id: string) => () => void }) => (
  <View style={styles.item}>
    <Pressable onPress={onClick(id)}>
      <Text style={styles.line}>
        {artist} - {title}
      </Text>
    </Pressable>
  </View>
);

export const SubsonicButton: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);
  const [meta, setMeta] = useState<SubsonicNowPlaying | null>(null);
  const [error, setError] = useState<string>();
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [songs, setSongs] = useState<ISong[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();

  const init = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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

      <View>
        {isLoading && <ActivityIndicator size="large" />}
        {playlists.map((playlist) => (
          <View key={playlist.id} style={{ padding: 10 }}>
            <Pressable
              onPress={handleOpenPlaylist(playlist.id)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Text
                // style={styles.col}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                {playlist.name}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>

      {songs.length > 0 && (
        <SafeAreaView>
          <SectionList
            sections={[{ title: "Playlist Name TODO", data: songs }]}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => (
              <Item onClick={handlePlaySong} {...item} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text
              // style={styles.header}
              >
                {title}
              </Text>
            )}
          />
        </SafeAreaView>
        // <View
        //   style={{
        //     // maxHeight: "200px",
        //     // maxHeight: "60vh", // TODO expo go crashes? needs plugin
        //     // overflowY: "scroll" -> https://stackoverflow.com/questions/41912313/element-overflow-hidden-in-react-native-android
        //     overflow: "scroll",
        //   }}
        // >
        //   {songs.map((song) => (
        //     <View key={song.id} style={{ padding: 10 }}>
        //       <Pressable
        //         onPress={handlePlaySong(song.id)}
        //         style={({ pressed }) => ({
        //           opacity: pressed ? 0.5 : 1,
        //         })}
        //       >
        //         <Text
        //           // style={styles.col}
        //           lightColor="rgba(0,0,0,0.8)"
        //           darkColor="rgba(255,255,255,0.8)"
        //         >
        //           {song.artist} - {song.title}
        //         </Text>
        //       </Pressable>
        //     </View>
        //   ))}
        // </View>
      )}

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
