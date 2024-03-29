import React, { useState } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { MusicDirectorySong } from "../../types";
import { styles } from "../item.styles";
import { Text } from "../Themed";
import { DownloadModal } from "./Download/DownloadModal";

// const getStylenames = (
//   tuples: Array<[StyleProp<ViewStyle>, boolean]>
// ): StyleProp<ViewStyle> =>
//   tuples
//     .filter(([k, v]) => Boolean(v))
//     .map(([k, v]) => k) as StyleProp<ViewStyle>;

export const SongsInPlaylistItem = ({
  id,
  artist,
  title,
  onClick,
  activeId,
}: MusicDirectorySong & {
  onClick: (id: string) => () => void;
  activeId?: string;
}) => {
  const [isOffline, setIsOffline] = useState(id === "2921");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View
      style={[
        styles.item,
        isLoading ? styles.item__loading : undefined,
        activeId === id ? styles.item__active : undefined,
        isOffline ? styles.item__offline : undefined,
      ]}
    >
      <DownloadModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setIsOffline={setIsOffline}
        artist={artist}
        title={title}
      />

      <Pressable
        style={styles.item_pressable}
        onPress={() => {
          setIsLoading(true);
          onClick(id)();
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }}
        onLongPress={() => {
          setModalVisible(true);
          // confirm("open modal/popover with choice to (re)download or delete");
        }}
      >
        <Text style={styles.line}>
          {artist} - {title}
        </Text>
      </Pressable>
    </View>
  );
};
