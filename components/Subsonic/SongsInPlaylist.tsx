import { useNavigation } from "@react-navigation/native";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  SectionList,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { MusicDirectorySong } from "../../types";
import { PlayContext } from "../context/play-context";
import { styles } from "../item.styles";
import { ListItemButton } from "../StationButton/ListItemButton";
import { Text } from "../Themed";
import { getPlaylist, hasValidSettings } from "./getSubsonic";

const getStylenames = (
  tuples: Array<[StyleProp<ViewStyle>, boolean]>
): StyleProp<ViewStyle> =>
  tuples
    .filter(([k, v]) => Boolean(v))
    .map(([k, v]) => k) as StyleProp<ViewStyle>;

const Item = ({
  id,
  artist,
  title,
  onClick,
  activeId,
}: MusicDirectorySong & {
  onClick: (id: string) => () => void;
  activeId?: string;
}) => {
  const stylenames = getStylenames([
    [styles.item, true],
    [styles.item__active, activeId === id],
    [styles.item__offline, "9272" === id],
  ]);

  return (
    <View style={stylenames}>
      <Pressable style={styles.item_pressable} onPress={onClick(id)}>
        <Text style={styles.line}>
          {artist} - {title}
        </Text>
      </Pressable>
    </View>
  );
};

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
              <Item
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
