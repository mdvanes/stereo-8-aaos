import { useNavigation } from "@react-navigation/native";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  SectionList,
  View,
} from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { ConditionalImageBackground } from "../ConditionalImageBackground";
import { PlayContext } from "../context/play-context";
import { styles } from "../item.styles";
import { ListItemButton } from "../StationButton/ListItemButton";
import { Text } from "../Themed";
import {
  getPlaylists,
  hasValidSettings,
  IPlaylist,
  testConnection,
} from "./getSubsonic";

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
      return;
    }

    const run = async () => {
      try {
        await testConnection();
      } catch (err) {
        setError("Settings invalid");
        return;
      }
      init();
    };

    run();
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
          <ConditionalImageBackground img={context.song?.img}>
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
          </ConditionalImageBackground>
        </SafeAreaView>
      )}
    </>
  );
};
