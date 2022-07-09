import { Audio } from "expo-av";
import React, { FC, useContext, useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { PlayContext } from "../context/play-context";

const PlaylistItem = ({
  id,
  name,
  onClick,
}: IPlaylist & { onClick: (p: IPlaylist) => () => void }) => (
  <View style={styles.item}>
    <Pressable onPress={onClick({ id, name })}>
      <Text style={styles.line}>{name}</Text>
    </Pressable>
  </View>
);

// const Item = ({
//   id,
//   artist,
//   title,
//   onClick,
// }: ISong & { onClick: (id: string) => () => void }) => (
//   <View style={styles.item}>
//     <Pressable onPress={onClick(id)}>
//       <Text style={styles.line}>
//         {artist} - {title}
//       </Text>
//     </Pressable>
//   </View>
// );

export const Playlists: FC = () => {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [pbo, setPbo] = useState<Audio.Sound | null>(null);
  // const [meta, setMeta] = useState<SubsonicNowPlaying | null>(null);
  const [error, setError] = useState<string>();
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  // const [songs, setSongs] = useState<ISong[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const context = useContext(PlayContext);

  const init = async () => {
    setIsLoading(true);
    // const id = await getCurrentRemotePlayingId();
    // await Audio.setAudioModeAsync({
    //   playsInSilentModeIOS: true,
    //   staysActiveInBackground: true,
    // });
    // const { sound: playbackObject } = await Audio.Sound.createAsync(
    //   { uri: getAPI("stream", `&id=${id}`) },
    //   { shouldPlay: false }
    // );
    // setPbo(playbackObject);
    setPlaylists(await getPlaylists());
    setIsLoading(false);
  };

  useEffect(() => {
    if (!hasValidSettings()) {
      setError("Settings not complete");
    }
    init();
  }, []);

  // const onToggle = async () => {
  //   if (pbo) {
  //     if (isPlaying) {
  //       await pbo.pauseAsync();
  //     } else {
  //       await pbo.unloadAsync();
  //       const id = await getCurrentRemotePlayingId();
  //       await pbo.loadAsync({ uri: getAPI("stream", `&id=${id}`) });
  //       await pbo.playAsync();
  //     }
  //     setIsPlaying(!isPlaying);
  //     setTimeout(async () => {
  //       const newMeta = await getNowPlaying({ remote: false });
  //       setMeta(newMeta);
  //     }, 500);
  //   }
  // };

  // const handlePlaySong = (id: string) => async () => {
  //   if (pbo) {
  //     if (isPlaying) {
  //       await pbo.pauseAsync();
  //     } else {
  //       await pbo.unloadAsync();
  //       // const id = await getCurrentRemotePlayingId();
  //       await pbo.loadAsync({ uri: getAPI("stream", `&id=${id}`) });
  //       await pbo.playAsync();
  //     }
  //     setIsPlaying(!isPlaying);
  //     setTimeout(async () => {
  //       const newMeta = await getNowPlaying({ remote: false });
  //       setMeta(newMeta);
  //     }, 500);
  //   }
  // };

  const handleOpenPlaylist = (p: IPlaylist) => async () => {
    // setPlaylists([]);
    // setSongs([]);
    // setSongs(await getPlaylist(id));
    context.setPlaylist(p);
    navigation.navigate("Playlist");
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
      {isLoading && (
        <ActivityIndicator size="large" style={{ height: 300, width: 300 }} />
      )}
      {playlists.length > 0 && (
        <SafeAreaView
          // TODO not allowed on Android:  style={{ height: "calc(100vh - 150px)" }}
          style={{ height: 500 }}
        >
          <SectionList
            sections={[{ title: "", data: playlists }]}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={({ item }) => (
              <PlaylistItem onClick={handleOpenPlaylist} {...item} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text>{title}</Text>
            )}
          />
        </SafeAreaView>
      )}
    </>
  );
};
