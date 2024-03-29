import { useNavigation } from "@react-navigation/native";
import React, { FC, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, SectionList } from "react-native";
import { PlayContext } from "../context/play-context";
import { ListItemButton } from "../StationButton/ListItemButton";
import { Text } from "../Themed";
import { getPlaylist, hasValidSettings } from "./getSubsonic";
import { SongsInPlaylistItem } from "./SongsInPlaylistItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lastPlayedItemStoreKey } from "../../constants/StorageKeys";

export const SongsInPlaylist: FC = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(PlayContext);
  const navigation = useNavigation();

  const init = async () => {
    context.setQueue([]);
    setIsLoading(true);

    const pid = context.playlist?.id;
    if (pid) {
      context.setQueue(await getPlaylist(pid));
    } else {
      console.warn(
        "On the playlist page, the playlist ID was null, so redirecting back to playlists overview"
      );
      navigation.navigate("Home");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!hasValidSettings()) {
      setError("Settings not complete");
    }
    init();
  }, []);

  const handlePlaySong = (id: string) => async () => {
    const lastPlayedItemJson = await AsyncStorage.getItem(
      lastPlayedItemStoreKey
    );
    const lastPlayedItem = lastPlayedItemJson && JSON.parse(lastPlayedItemJson);

    await AsyncStorage.setItem(
      lastPlayedItemStoreKey,
      JSON.stringify({ ...lastPlayedItem, songId: id })
    );

    context.setStartSongId(id);
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
      {context.queue && context.queue.length > 0 && (
        <SafeAreaView
          // TODO not allowed on Android: style={{ height: "calc(100vh - 150px)" }}
          style={{ flex: 1, width: "100%" }}
        >
          <SectionList
            sections={[{ title: "", data: context.queue }]}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={({ item }) => (
              <SongsInPlaylistItem
                onClick={handlePlaySong}
                activeId={context.song?.id}
                {...item}
              />
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
