import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useContext, useState } from "react";
import { Pressable, Text } from "react-native";
import { lastPlayedItemStoreKey } from "../../../constants/StorageKeys";
import {
  Artist,
  LibraryItemType,
  MusicDirectoryAlbum,
  MusicDirectorySong,
} from "../../../types";
import { PlayContext } from "../../context/play-context";
import { styles as itemStyles } from "../../item.styles";
import { getMusicDir } from "../getSubsonic";
import { styles } from "./Library.styles";
import { getLabel, isAlbum, isArtist, isSong } from "./getLabel";

const LibraryDirItem: FC<{
  item: Artist | MusicDirectoryAlbum;
  isFavoritesContext: boolean;
}> = ({ item, isFavoritesContext = false }) => {
  const context = useContext(PlayContext);
  const label = getLabel(item, isFavoritesContext);
  const navigation = useNavigation();

  return (
    <Pressable
      style={itemStyles.item_pressable}
      onPress={async () => {
        const dirs = await getMusicDir(item.id ?? "");

        if (isAlbum(item)) {
          // TODO update this on play song (also for playlist)
          await AsyncStorage.setItem(
            lastPlayedItemStoreKey,
            JSON.stringify({
              id: item.id,
              name: item.album,
              type: "musicdir",
              songId: null,
            })
          );
        }

        if (isFavoritesContext) {
          context.setFavoritesDirItems(dirs);
          navigation.navigate("Favorite");
        } else {
          context.setLibraryBreadcrumb((prev: LibraryItemType[]) => [
            ...prev,
            item,
          ]);
          context.setLibraryItems(dirs);
        }
      }}
    >
      <Text style={[styles.libraryItem, itemStyles.line]}>
        <FontAwesome name="folder" size={20} style={{ marginRight: 15 }} />{" "}
        {label}
      </Text>
    </Pressable>
  );
};

const LibrarySongItem: FC<{
  item: MusicDirectorySong;
  items?: MusicDirectorySong[];
  isActive: boolean;
}> = ({ item, items, isActive }) => {
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(PlayContext);

  const track = item.track ? `${item.track?.toString().padStart(2, "0")}.` : "";

  return (
    <Pressable
      style={itemStyles.item_pressable}
      onPress={async () => {
        setIsLoading(true);
        context.setQueue(items ?? []);
        context.setStartSongId(item.id);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }}
    >
      <Text
        style={[
          styles.libraryItem,
          itemStyles.line,
          isLoading ? itemStyles.item__loading : undefined,
          isActive ? itemStyles.item__active : undefined,
        ]}
      >
        {track} {item.title}
      </Text>
    </Pressable>
  );
};

const AddFavoriteWarning: FC = () => {
  return (
    <Text style={[styles.libraryItem, itemStyles.line]}>
      Mark favorites in library and pull to refresh
    </Text>
  );
};

export const LibraryItem: FC<{
  item: LibraryItemType;
  items?: LibraryItemType[];
  isFavoritesContext?: boolean;
  isActive: boolean;
}> = ({ item, items, isActive = false, isFavoritesContext = false }) => {
  if (item.id === "-1") {
    return <AddFavoriteWarning />;
  }
  if (isArtist(item) || isAlbum(item)) {
    return (
      <LibraryDirItem item={item} isFavoritesContext={isFavoritesContext} />
    );
  }
  return (
    <LibrarySongItem
      item={item}
      items={items ? items.filter(isSong) : []}
      isActive={isActive}
    />
  );
};
