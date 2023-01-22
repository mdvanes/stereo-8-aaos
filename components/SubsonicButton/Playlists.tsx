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
    <Pressable style={styles.item_pressable} onPress={onClick({ id, name })}>
      <Text style={styles.line}>{name}</Text>
    </Pressable>
  </View>
);

export const Playlists: FC = () => {
  const [error, setError] = useState<string>();
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const context = useContext(PlayContext);

  const init = async () => {
    setIsLoading(true);
    setPlaylists(await getPlaylists());
    setIsLoading(false);
  };

 

  useEffect(() => {
    if (!hasValidSettings()) {
      setError("Settings not complete");
    }
    init();
  }, []);

  const handleOpenPlaylist = (p: IPlaylist) => async () => {
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
          // style={{ height: 600 }}
          style={{ flex: 1, width: "100%" }}
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
